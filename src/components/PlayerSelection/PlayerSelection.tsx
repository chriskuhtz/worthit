import { useCallback, useState } from 'react';
import { Player } from '../../hooks/useMemoryGame';
import { Pill } from '../../ui_components/Pill/Pill';

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
				},
			]);
		}
		setNewPlayerInput('');
	}, [newPlayerInput, newPlayers]);

	return (
		<div>
			<h1>Wer spielt mit?</h1>
			<input
				value={newPlayerInput}
				onChange={(e) => setNewPlayerInput(e.target.value)}
			/>
			<button disabled={!newPlayerInput} onClick={addPlayer}>
				Spielt mit
			</button>
			{newPlayers.map((p) => (
				<Pill
					center={p.name}
					rightSide={p.active ? <div>Startet</div> : undefined}
				/>
			))}
			<button
				disabled={newPlayers.length < 2}
				onClick={() => begin(newPlayers)}
			>
				Los Gehts!
			</button>
		</div>
	);
};
