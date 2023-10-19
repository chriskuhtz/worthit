import { useCallback, useState } from 'react';

export interface Player {
	name: string;
	score: 0;
	id: string;
}

export interface Tile {
	source: string;
	index: number;
	ownerId?: string;
}

export const mockPlayers: Player[] = [
	{ id: 'BEAR', name: 'bear', score: 0 },
	{ id: 'ICIA', name: 'icia', score: 0 },
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
	const [players, setPlayers] = useState<Player[]>([]);
	const [tiles, setTiles] = useState<Tile[]>([]);
	const [selectedTiles, setSelectedTiles] = useState<Tile[]>([]);

	const randomlyFillTiles = useCallback((options: string[]) => {
		const copiedOptions = [...options];
		const res: Tile[] = [];

		const numberOfTiles = options.length * 2;

		while (res.length < numberOfTiles) {
			const randomIndex1 = Math.round(Math.random() * numberOfTiles);
			const randomIndex2 = Math.round(Math.random() * numberOfTiles);
			if (
				!res.some((t) => t.index === randomIndex1 || t.index === randomIndex2)
			) {
				res.push({ source: copiedOptions[0], index: randomIndex1 });
				res.push({ source: copiedOptions[0], index: randomIndex2 });
				copiedOptions.splice(0, 1);
			}
		}
		console.log(res);
		setTiles(res.sort((a, b) => a.index - b.index));
	}, []);

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

	return {
		select,
		players,
		tiles,
		selectedTiles,
		randomlyFillTiles,

		setSelectedTiles,
	};
};
