import { useCallback, useState } from 'react';
import { Player } from '../../hooks/useMemoryGame';

const playerColors = [
	'orange',
	'lightgreen',
	'lightblue',
	'pink',
	'red',
	'peru',
	'yellow',
	'aquamarine',
];

const playerSuggestions = [
	'Chris',
	'Icia',
	'Liah',
	'Nela',
	'Nils',
	'Clara',
	'Jakob',
	'Ann Kathrin',
	'Tobi',
	'Andi',
	'Miriam',
	'Thomas',
	'Anja',
	'Oma',
	'Opa',
];
export const PlayerSelection = ({
	begin,
}: {
	begin: (x: Player[]) => void;
}): JSX.Element => {
	const [newPlayers, setNewPlayers] = useState<Player[]>([]);
	const [newPlayerInput, setNewPlayerInput] = useState<string>('');

	const addPlayer = useCallback(() => {
		if (newPlayerInput) {
			setNewPlayers([
				...newPlayers,
				{
					name: newPlayerInput,
					id: newPlayerInput,
					active: newPlayers.length === 0,
					score: 0,
					color: playerColors[newPlayers.length],
				},
			]);
		}
		setNewPlayerInput('');
	}, [newPlayerInput, newPlayers]);

	return (
		<div className="selectionScreen">
			<h1>Wer spielt mit?</h1>

			<div className="suggestions">
				{playerSuggestions.map((p) => {
					const existingPlayer = newPlayers.find((np) => np.name === p);

					if (existingPlayer) {
						return (
							<button
								key={p}
								onClick={() => {
									setNewPlayers([
										...newPlayers.filter((np) => np.id !== existingPlayer.id),
									]);
								}}
								style={{
									color: existingPlayer.color,
									borderColor: existingPlayer.color,
								}}
							>
								{p}
							</button>
						);
					}
					return (
						<button
							key={p}
							disabled={newPlayers.length >= playerColors.length}
							onClick={() => {
								setNewPlayers([
									...newPlayers,
									{
										name: p,
										id: p,
										active: newPlayers.length === 0,
										score: 0,
										color: playerColors[newPlayers.length],
									},
								]);
							}}
						>
							{p}
						</button>
					);
				})}
			</div>
			<div className="suggestions">
				{newPlayers
					.filter((np) => !playerSuggestions.includes(np.name))
					.map((p) => {
						return (
							<button
								key={p.id}
								onClick={() => {
									setNewPlayers([...newPlayers.filter((np) => np.id !== p.id)]);
								}}
								style={{
									color: p.color,
									borderColor: p.color,
								}}
							>
								{p.name}
							</button>
						);
					})}
			</div>
			<div className="inputAndConfirm">
				<input
					value={newPlayerInput}
					onChange={(e) => setNewPlayerInput(e.target.value)}
					placeholder="anderer Spieler"
				/>
				<button
					disabled={!newPlayerInput || newPlayers.length >= playerColors.length}
					onClick={addPlayer}
				>
					Spielt mit
				</button>
			</div>

			<button
				disabled={newPlayers.length < 2}
				onClick={() => begin(newPlayers)}
			>
				Los Gehts!
			</button>
		</div>
	);
};
