import { prisma } from "@padel/db";

export default async function TestDbPage() {
	let status = "OK";
	let detail = "Import de Prisma correcto";

	try {
		if (!prisma) {
			status = "ERROR";
			detail = "Prisma no existe";
		}
	} catch (e) {
		status = "ERROR";
		detail = e instanceof Error ? e.message : "Error desconocido";
	}

	return (
		<main style={{ padding: 24, fontFamily: "sans-serif" }}>
			<h1>Test DB</h1>
			<p>Estado: {status}</p>
			<pre>{detail}</pre>
		</main>
	);
}