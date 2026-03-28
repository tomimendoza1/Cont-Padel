import { prisma } from "@padel/db";


export default async function TestDbPage() {
	let ok = false;
	let error = "";

	try {
		await prisma.$queryRaw`SELECT 1`;
		ok = true;
	} catch (e) {
		error = e instanceof Error ? e.message : "Error desconocido";
	}

	return (
		<main style={{ padding: 24, fontFamily: "sans-serif" }}>
			<h1>Test DB</h1>
			<p>Estado de conexión: {ok ? "OK" : "ERROR"}</p>
			{error ? <pre>{error}</pre> : null}
		</main>
	);
}