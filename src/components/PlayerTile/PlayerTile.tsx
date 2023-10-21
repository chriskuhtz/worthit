import { Player } from '../../hooks/useMemoryGame';
import { Pill } from '../../ui_components/Pill/Pill';

export const PlayerTile = ({ player }: { player: Player }): JSX.Element => {
	return (
		<Pill
			leftSide={
				player.active ? <div style={{ color: player.color }}>Am Zug</div> : ''
			}
			center={<div style={{ color: player.color }}>{player.name}</div>}
			rightSide={<div style={{ color: player.color }}>{player.score}</div>}
		/>
	);
};
