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
	if (isSelected) {
		return <img src={tile.source} height={100} width={100} />;
	}
	if (tile.ownerName) {
		return (
			<div
				className="tile"
				style={{
					backgroundColor: 'red',
				}}
			>
				{tile.ownerName}
			</div>
		);
	}
	return (
		<div
			className="tile"
			style={{
				backgroundColor: 'lightgray',
			}}
			onClick={() => {
				if (!tile.ownerName) select(tile);
			}}
			role="button"
		></div>
	);
};
