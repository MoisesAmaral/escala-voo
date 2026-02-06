import { useEffect, useRef, useState } from "react";
import "./DataGrid.css";

export interface Column<T> {
  id: string;
  header: string | React.ReactNode;
  width?: number;
  minWidth?: number;
  render?: (value: any, row: T, rowIndex: number) => React.ReactNode;
  editable?: boolean;
  editor?: "select" | "text" | "custom";
  options?: string[];
  getStyle?: (value: any, row: T) => React.CSSProperties;
  getValue?: (row: T) => any;
  setValue?: (row: T, value: any) => void;
  onDoubleClick?: (
    row: T,
    rowIndex: number,
    column: Column<T>,
    event: React.MouseEvent,
  ) => void;
  pinned?: "left" | "right";
  getTooltip?: (row: T) => string | null;
}

export interface ChangeInfo {
  rowIndex?: number;
  columnId?: string;
  oldValue?: any;
  newValue?: any;
  isMultiple?: boolean;
}

export interface DataGridProps<T> {
  columns: Column<T>[];
  data: T[];
  onDataChange?: (data: T[], changeInfo?: ChangeInfo) => void;
  rowHeight?: number;
  enableFillHandle?: boolean;
  enableRowDrag?: boolean;
  className?: string;
}

export function DataGrid<T>({
  columns,
  data,
  onDataChange,
  rowHeight = 45,
  enableFillHandle = true,
  enableRowDrag = false,
  className = "",
}: DataGridProps<T>) {
  const [localData, setLocalData] = useState<T[]>(data);
  const [selectedCell, setSelectedCell] = useState<{
    rowIndex: number;
    colId: string;
  } | null>(null);

  const [fillHandleActive, setFillHandleActive] = useState(false);
  const [fillStartCell, setFillStartCell] = useState<{
    rowIndex: number;
    colId: string;
  } | null>(null);
  const [fillEndCell, setFillEndCell] = useState<{
    rowIndex: number;
    colId: string;
  } | null>(null);

  const [editingCell, setEditingCell] = useState<{
    rowIndex: number;
    colId: string;
  } | null>(null);

  const [draggedRowIndex, setDraggedRowIndex] = useState<number | null>(null);
  const [dragOverRowIndex, setDragOverRowIndex] = useState<number | null>(null);

  const [tooltip, setTooltip] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);

  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  const updateData = (newData: T[], changeInfo?: ChangeInfo) => {
    setLocalData(newData);
    onDataChange?.(newData, changeInfo);
  };

  const showTooltip = (text: string, x: number, y: number) => {
    setTooltip({ text, x, y });
  };

  const hideTooltip = () => {
    setTooltip(null);
  };

  const handleCellMouseEnter = (rowIndex: number, colId: string, row: T) => {
    if (fillHandleActive && fillStartCell) {
      setFillEndCell({ rowIndex, colId });
    } else {
      const column = columns.find((col) => col.id === colId);
      if (column?.getTooltip) {
        const tooltipText = column.getTooltip(row);
        if (tooltipText) {
          const cell = document.querySelector(
            `[data-row="${rowIndex}"][data-col="${colId}"]`,
          ) as HTMLElement;
          if (cell) {
            const rect = cell.getBoundingClientRect();
            showTooltip(tooltipText, rect.left + rect.width / 2, rect.top - 10);
          }
        }
      }
    }
  };

  const handleFillHandleMouseDown = (e: React.MouseEvent) => {
    if (!selectedCell || !enableFillHandle) return;
    e.preventDefault();
    setFillHandleActive(true);
    setFillStartCell(selectedCell);
    setFillEndCell(selectedCell);
  };

  const handleCellMouseLeave = () => {
    if (!fillHandleActive) {
      hideTooltip();
    }
  };

  const handleMouseUp = () => {
    if (fillHandleActive && fillStartCell && fillEndCell) {
      applyFillHandle();
    }
    setFillHandleActive(false);
    setFillStartCell(null);
    setFillEndCell(null);
  };

  useEffect(() => {
    if (fillHandleActive) {
      document.addEventListener("mouseup", handleMouseUp);
      return () => document.removeEventListener("mouseup", handleMouseUp);
    }
  }, [fillHandleActive, fillStartCell, fillEndCell, localData]);

  const applyFillHandle = () => {
    if (!fillStartCell || !fillEndCell) return;

    const startCol = columns.findIndex((col) => col.id === fillStartCell.colId);
    const endCol = columns.findIndex((col) => col.id === fillEndCell.colId);
    const startRow = Math.min(fillStartCell.rowIndex, fillEndCell.rowIndex);
    const endRow = Math.max(fillStartCell.rowIndex, fillEndCell.rowIndex);

    const sourceColumn = columns[startCol];
    const sourceValue = sourceColumn.getValue?.(
      localData[fillStartCell.rowIndex],
    );

    const newData = [...localData];

    for (let row = startRow; row <= endRow; row++) {
      for (
        let col = Math.min(startCol, endCol);
        col <= Math.max(startCol, endCol);
        col++
      ) {
        const column = columns[col];
        if (column.setValue && column.editable) {
          column.setValue(newData[row], sourceValue);
        }
      }
    }

    // ✅ MÚLTIPLAS CÉLULAS
    updateData(newData, { isMultiple: true });
  };

  const handleRowDragStart = (e: React.DragEvent, rowIndex: number) => {
    if (!enableRowDrag) return;
    setDraggedRowIndex(rowIndex);
    e.dataTransfer.effectAllowed = "move";

    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = "0.5";
    }
  };

  const handleRowDragEnd = (e: React.DragEvent) => {
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = "1";
    }
    setDraggedRowIndex(null);
    setDragOverRowIndex(null);
  };

  const handleRowDragOver = (e: React.DragEvent, rowIndex: number) => {
    if (!enableRowDrag || draggedRowIndex === null) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

    if (rowIndex !== draggedRowIndex) {
      setDragOverRowIndex(rowIndex);
    }
  };

  const handleRowDragLeave = () => {
    setDragOverRowIndex(null);
  };

  const handleRowDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();

    if (draggedRowIndex === null || draggedRowIndex === dropIndex) {
      setDraggedRowIndex(null);
      setDragOverRowIndex(null);
      return;
    }

    const newData = [...localData];
    const [draggedRow] = newData.splice(draggedRowIndex, 1);
    newData.splice(dropIndex, 0, draggedRow);

    // ✅ DRAG É MÚLTIPLO
    updateData(newData, { isMultiple: true });
    setDraggedRowIndex(null);
    setDragOverRowIndex(null);
  };

  const handleCellClick = (rowIndex: number, colId: string) => {
    if (editingCell) return;
    setSelectedCell({ rowIndex, colId });
  };

  const handleCellDoubleClick = (
    e: React.MouseEvent,
    rowIndex: number,
    colId: string,
  ) => {
    const column = columns.find((col) => col.id === colId);
    if (!column) return;

    if (column.onDoubleClick) {
      column.onDoubleClick(localData[rowIndex], rowIndex, column, e);
    } else if (column.editable && column.editor !== "select") {
      setEditingCell({ rowIndex, colId });
    }
  };

  const handleCellClickForSelect = (rowIndex: number, colId: string) => {
    const column = columns.find((col) => col.id === colId);
    if (column?.editable && column.editor === "select") {
      setEditingCell({ rowIndex, colId });
    }
  };

  const handleEditChange = (value: any) => {
    if (!editingCell) return;

    const column = columns.find((col) => col.id === editingCell.colId);
    if (!column?.setValue) return;

    const newData = [...localData];
    const oldValue = column.getValue?.(newData[editingCell.rowIndex]);
    column.setValue(newData[editingCell.rowIndex], value);

    // ✅ MUDANÇA INDIVIDUAL
    updateData(newData, {
      rowIndex: editingCell.rowIndex,
      columnId: editingCell.colId,
      oldValue,
      newValue: value,
      isMultiple: false,
    });

    setEditingCell(null);
  };

  const isCellInFillRange = (rowIndex: number, colId: string) => {
    if (!fillHandleActive || !fillStartCell || !fillEndCell) return false;

    const colIndex = columns.findIndex((col) => col.id === colId);
    const startColIndex = columns.findIndex(
      (col) => col.id === fillStartCell.colId,
    );
    const endColIndex = columns.findIndex(
      (col) => col.id === fillEndCell.colId,
    );

    const minRow = Math.min(fillStartCell.rowIndex, fillEndCell.rowIndex);
    const maxRow = Math.max(fillStartCell.rowIndex, fillEndCell.rowIndex);
    const minCol = Math.min(startColIndex, endColIndex);
    const maxCol = Math.max(startColIndex, endColIndex);

    return (
      rowIndex >= minRow &&
      rowIndex <= maxRow &&
      colIndex >= minCol &&
      colIndex <= maxCol
    );
  };

  return (
    <div className={`data-grid-container ${className}`} ref={gridRef}>
      <div className="data-grid-wrapper">
        <table className="data-grid">
          <thead>
            <tr>
              {enableRowDrag && (
                <th
                  className="drag-handle-header"
                  style={{ width: 40, minWidth: 40 }}
                >
                  ⋮⋮
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.id}
                  style={{
                    width: col.width,
                    minWidth: col.minWidth || col.width,
                  }}
                  className={col.pinned ? `pinned-${col.pinned}` : ""}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {localData.map((row, rowIndex) => {
              // ✅ KEY ÚNICA baseada no ID da linha + índice
              const rowData = row as any;
              const uniqueKey = rowData.id
                ? `row-${rowData.id}`
                : `row-${rowIndex}-${Date.now()}`;

              return (
                <tr
                  key={uniqueKey} // ← KEY ÚNICA
                  style={{ height: rowHeight }}
                  draggable={enableRowDrag}
                  onDragStart={(e) => handleRowDragStart(e, rowIndex)}
                  onDragEnd={handleRowDragEnd}
                  onDragOver={(e) => handleRowDragOver(e, rowIndex)}
                  onDragLeave={handleRowDragLeave}
                  onDrop={(e) => handleRowDrop(e, rowIndex)}
                  className={`
          ${draggedRowIndex === rowIndex ? "dragging" : ""}
          ${dragOverRowIndex === rowIndex ? "drag-over" : ""}
        `}
                >
                  {enableRowDrag && (
                    <td className="drag-handle-cell">
                      <div className="drag-handle-icon">⋮⋮</div>
                    </td>
                  )}
                  {columns.map((col) => {
                    const value = col.getValue?.(row);
                    const isSelected =
                      selectedCell?.rowIndex === rowIndex &&
                      selectedCell?.colId === col.id;
                    const isEditing =
                      editingCell?.rowIndex === rowIndex &&
                      editingCell?.colId === col.id;
                    const isInFillRange = isCellInFillRange(rowIndex, col.id);

                    return (
                      <td
                        key={col.id}
                        data-row={rowIndex}
                        data-col={col.id}
                        className={`
                ${isSelected ? "selected" : ""}
                ${isInFillRange ? "fill-range" : ""}
                ${col.editable ? "editable" : ""}
                ${col.pinned ? `pinned-${col.pinned}` : ""}
              `}
                        style={col.getStyle?.(value, row)}
                        onClick={() => {
                          handleCellClick(rowIndex, col.id);
                          handleCellClickForSelect(rowIndex, col.id);
                        }}
                        onDoubleClick={(e) =>
                          handleCellDoubleClick(e, rowIndex, col.id)
                        }
                        onMouseEnter={() =>
                          handleCellMouseEnter(rowIndex, col.id, row)
                        }
                        onMouseLeave={handleCellMouseLeave}
                      >
                        {isEditing && col.editor === "select" && col.options ? (
                          <select
                            autoFocus
                            value={value}
                            onChange={(e) => handleEditChange(e.target.value)}
                            onBlur={() => setEditingCell(null)}
                            className="cell-editor-select"
                          >
                            {col.options.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        ) : isEditing && col.editor === "text" ? (
                          <input
                            autoFocus
                            type="text"
                            value={value}
                            onChange={(e) => handleEditChange(e.target.value)}
                            onBlur={() => setEditingCell(null)}
                            className="cell-editor-input"
                          />
                        ) : col.render ? (
                          col.render(value, row, rowIndex)
                        ) : (
                          value
                        )}

                        {isSelected && enableFillHandle && col.editable && (
                          <div
                            className="fill-handle"
                            onMouseDown={handleFillHandleMouseDown}
                          />
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {tooltip && (
        <div
          className="custom-tooltip"
          style={{
            position: "fixed",
            left: tooltip.x,
            top: tooltip.y,
            transform: "translate(-50%, -100%)",
            zIndex: 9999,
          }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
}
