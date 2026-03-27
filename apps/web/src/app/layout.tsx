import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
	title: "Padel Club System",
	description: "Marcador y control de canchas de pádel"
};

export default function RootLayout({
	children
}: {
	children: ReactNode;
}) {
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