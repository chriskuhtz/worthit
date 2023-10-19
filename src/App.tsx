import { TileDisplay } from './components/Tile/Tile';
import { mockOptions, useMemoryGame } from './hooks/useMemoryGame';

function App() {
	const { tiles, randomlyFillTiles, selectedTiles, select } = useMemoryGame();

	return (
		<div>
			<button onClick={() => randomlyFillTiles(mockOptions)}>Begin</button>
			<div className="board">
				{tiles.map((t) => (
					<TileDisplay
						tile={t}
						isSelected={selectedTiles.some((s) => s.index === t.index)}
						select={select}
					/>
				))}
			</div>
		</div>
	);
}

export default App;
