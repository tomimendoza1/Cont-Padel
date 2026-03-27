"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { createSocket } from "../../../lib/socket";
import { Scoreboard } from "../../../components/Scoreboard";

export default function CourtPage() {
	const params = useParams();
	const courtId = Number(params.id);
	const [match, setMatch] = useState<any>(null);

	const socket = useMemo(() => createSocket(), []);

	useEffect(() => {
		if (!courtId || Number.isNaN(courtId)) return;

		socket.emit("join:court", courtId);

		socket.on("score:update", (payload) => {
			if (payload.courtId === courtId) {
				setMatch(payload);
			}
		});

		return () => {
			socket.off("score:update");
			socket.disconnect();
		};
	}, [courtId, socket]);

	return (
		<main
			style={{
				minHeight: "100vh",
				display: "grid",
				placeItems: "center",
				background: "#020617",
				color: "white",
				padding: 24
			}}
		>
			{!match ? (
				<h1>Esperando partido en la cancha {courtId}...</h1>
			) : (
				<Scoreboard
					teamAName={match.teamAName}
					teamBName={match.teamBName}
					pointA={match.pointA}
					pointB={match.pointB}
					gamesA={match.gamesA}
					gamesB={match.gamesB}
					setsA={match.setsA}
					setsB={match.setsB}
					advantageTeam={match.advantageTeam}
				/>
			)}
		</main>
	);
}