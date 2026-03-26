import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Padel Club System",
  description: "Marcador y control de canchas de pádel"
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          fontFamily: "Arial, sans-serif",
          background: "#0f172a",
          color: "#fff"
        }}
      >
        {children}
      </body>
    </html>
  );
}
