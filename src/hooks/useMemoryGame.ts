import { useCallback, useEffect, useState } from 'react';

export interface Player {
	name: string;
	score: number;
	id: string;
	active: boolean;
}

export interface Tile {
	source: string;
	index: number;
	ownerName?: string;
}

export const mockPlayers: Player[] = [
	{ id: 'BEAR', name: 'bear', score: 0, active: true },
	{ id: 'ICIA', name: 'icia', score: 0, active: false },
];
export const mockOptions: string[] = [
	'red',
	'blue',
	'yellow',
	'green',
	'brown',
	'orange',
];

export const useMemoryGame = () => {
	const [players, setPlayers] = useState<Player[]>(mockPlayers);
	const [tiles, setTiles] = useState<Tile[]>([]);
	const [selectedTiles, setSelectedTiles] = useState<Tile[]>([]);
	const [winners, setWinners] = useState<Player[] | undefined>();

	useEffect(() => {
		if (tiles.every((t) => t.ownerName) && !winners) {
			const highScore = players.sort((a, b) => b.score - a.score)[0].score;
			setWinners([...players].filter((p) => p.score === highScore));
		}
	}, [players, tiles, winners]);

	const resetScores = useCallback(() => {
		setWinners(undefined);
		setPlayers(
			[...players].map((p, i) => {
				return { ...p, score: 0, active: i === 0 };
			})
		);
	}, [players]);

	const randomlyFillTiles = useCallback((options: string[]) => {
		const copiedOptions = [...options];
		const res: Tile[] = [];

		const numberOfTiles = options.length * 2;

		while (res.length < numberOfTiles) {
			const randomIndex1 = Math.round(Math.random() * numberOfTiles);
			const randomIndex2 = Math.round(Math.random() * numberOfTiles);

			if (
				!res.some(
					(t) => t.index === randomIndex1 || t.index === randomIndex2
				) &&
				randomIndex1 !== randomIndex2
			) {
				res.push({ source: copiedOptions[0], index: randomIndex1 });
				res.push({ source: copiedOptions[0], index: randomIndex2 });
				copiedOptions.splice(0, 1);
			}
		}
		console.log(res);
		setTiles(res.sort((a, b) => a.index - b.index));
	}, []);

	const setNextPlayerActive = useCallback(() => {
		const updatedPlayers = [...players];
		const activePlayerIndex = players.findIndex((p) => p.active);

		if (activePlayerIndex === -1) {
			console.error('no active player');
			return;
		}

		const nextPlayerIndex =
			activePlayerIndex === players.length - 1 ? 0 : activePlayerIndex + 1;

		updatedPlayers.splice(activePlayerIndex, 1, {
			...updatedPlayers[activePlayerIndex],
			active: false,
		});
		updatedPlayers.splice(nextPlayerIndex, 1, {
			...updatedPlayers[nextPlayerIndex],
			active: true,
		});

		setPlayers([...updatedPlayers]);
	}, [players]);

	const awardPointToPlayer = useCallback(() => {
		const updatedPlayers = [...players];
		const activePlayerIndex = players.findIndex((p) => p.active);

		if (activePlayerIndex === -1) {
			console.error('no active player');
			return;
		}

		updatedPlayers.splice(activePlayerIndex, 1, {
			...updatedPlayers[activePlayerIndex],
			score: updatedPlayers[activePlayerIndex].score + 1,
		});

		setPlayers([...updatedPlayers]);
	}, [players]);

	const select = useCallback(
		(tile: Tile) => {
			if (selectedTiles.some((t) => t.index === tile.index)) {
				console.error('cant select Tile twice');
				return;
			}
			if (selectedTiles.length > 1) {
				console.error('can only select two tiles');
				return;
			}
			setSelectedTiles([...selectedTiles, tile]);
		},
		[selectedTiles]
	);

	const markSelectedTilesAsOwned = useCallback(() => {
		const activePlayer = players.find((p) => p.active);

		if (!activePlayer) {
			console.error('no active player');
			return;
		}
		const updatedTiles = [...tiles].map((t) => {
			if (selectedTiles.some((s) => s.index === t.index)) {
				return { ...t, ownerName: activePlayer.name };
			}
			return t;
		});

		setTiles(updatedTiles);
	}, [players, selectedTiles, tiles]);

	useEffect(() => {
		if (selectedTiles.length === 2) {
			const matchingTiles = selectedTiles[0].source === selectedTiles[1].source;

			setTimeout(() => {
				const updatedPlayers = [...players];
				const activePlayerIndex = updatedPlayers.findIndex((p) => p.active);
				if (activePlayerIndex === -1) {
					console.error('no active player');
					return;
				}
				if (matchingTiles) {
					awardPointToPlayer();
					markSelectedTilesAsOwned();
				}
				if (!matchingTiles) {
					setNextPlayerActive();
				}

				setSelectedTiles([]);
			}, 1000);

			//nextPlayersTurn
		}
	}, [
		awardPointToPlayer,
		markSelectedTilesAsOwned,
		players,
		selectedTiles,
		setNextPlayerActive,
	]);

	return {
		select,
		players,
		tiles,
		selectedTiles,
		randomlyFillTiles,
		winners,
		setSelectedTiles,
		resetScores,
	};
};
