import { useEffect } from "react";
import "./Toast.css";

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  onClose,
  duration = 4000,
}: ToastProps) {
  // ← 4 SEGUNDOS
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="toast-notification">
      <span className="toast-icon">✓</span>
      <span className="toast-message">{message}</span>
    </div>
  );
}
