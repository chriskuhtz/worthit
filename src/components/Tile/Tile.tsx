import { Tile } from '../../hooks/useMemoryGame';

export const TileDisplay = ({
	tile,
	isSelected,
	select,
}: {
	tile: Tile;
	isSelected: boolean;
	select: (x: Tile) => void;
}) => {
	return (
		<div
			className="tile"
			style={{
				backgroundColor:
					isSelected || tile.ownerName ? tile.source : 'lightgray',
			}}
			onClick={() => {
				if (!tile.ownerName) select(tile);
			}}
			role="button"
		>
			{tile.ownerName}
		</div>
	);
};
