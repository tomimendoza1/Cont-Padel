type CourtCardProps = {
  name: string;
  status: string;
  teamA?: string;
  teamB?: string;
  onStart?: () => void;
  onPointA?: () => void;
  onPointB?: () => void;
  onFinish?: () => void;
};

export function CourtCard({
  name,
  status,
  teamA,
  teamB,
  onStart,
  onPointA,
  onPointB,
  onFinish
}: CourtCardProps) {
  return (
    <section
      style={{
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 16,
        padding: 16,
        background: "#111827"
      }}
    >
      <h2 style={{ marginTop: 0 }}>{name}</h2>
      <p>Estado: {status}</p>

      {teamA && teamB ? (
        <>
          <p>
            {teamA} vs {teamB}
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button onClick={onPointA}>+ Punto A</button>
            <button onClick={onPointB}>+ Punto B</button>
            <button onClick={onFinish}>Finalizar</button>
          </div>
        </>
      ) : (
        <button onClick={onStart}>Iniciar partido demo</button>
      )}
    </section>
  );
}
