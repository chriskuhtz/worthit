import { Tile } from '../../hooks/useMemoryGame';

export const TileDisplay = ({
	tile,
	isSelected,
	select,
	disabled,
}: {
	tile: Tile;
	isSelected: boolean;
	select: (x: Tile) => void;
	disabled: boolean;
}) => {
	if (isSelected) {
		return <img src={tile.source} height={100} width={100} />;
	}
	if (tile.ownerName && tile.ownerColor) {
		return (
			<div>
				<img src={tile.source} height={100} width={100} />
				<div
					className="ownerBackground"
					style={{ backgroundColor: tile.ownerColor }}
				>
					<div className="ownerName">{tile.ownerName}</div>
				</div>
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
				if (!disabled) select(tile);
			}}
			role="button"
		></div>
	);
};
