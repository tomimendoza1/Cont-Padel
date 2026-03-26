import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ padding: 32 }}>
      <h1>Padel Club System</h1>
      <p>Panel central para administrar canchas y marcador en vivo.</p>

      <div style={{ display: "flex", gap: 16 }}>
        <Link href="/admin" style={{ color: "#38bdf8" }}>
          Ir al panel admin
        </Link>
        <Link href="/court/1" style={{ color: "#38bdf8" }}>
          Ver cancha 1
        </Link>
      </div>
    </main>
  );
}
