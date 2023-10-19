import { Player } from '../../hooks/useMemoryGame';
import { Pill } from '../../ui_components/Pill/Pill';

export const PlayerTile = ({ player }: { player: Player }): JSX.Element => {
	return (
		<Pill
			leftSide={player.active ? 'Am Zug' : ''}
			center={player.name}
			rightSide={player.score}
		/>
	);
};
