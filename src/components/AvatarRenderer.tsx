export default function AvatarRenderer(props: any) {
  const nome = props.value || "";
  const iniciais = nome
    .split(" ")
    .map((p: string) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <div
        style={{
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          background: "#2e6b50",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          fontWeight: "bold",
        }}
      >
        {iniciais}
      </div>

      <span>{nome}</span>
    </div>
  );
}
