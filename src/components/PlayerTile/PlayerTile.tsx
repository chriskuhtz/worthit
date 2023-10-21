import { Player } from '../../hooks/useMemoryGame';

export const PlayerTile = ({ player }: { player: Player }): JSX.Element => {
	return (
		<div
			className="playerTile"
			style={
				player.active
					? { backgroundColor: player.color, color: 'black' }
					: { color: player.color }
			}
		>
			<div>{player.name}</div>
			<div>{player.score}</div>
		</div>
	);
};
