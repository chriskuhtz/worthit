import { PlayerSelection } from './components/PlayerSelection/PlayerSelection';
import { PlayerTile } from './components/PlayerTile/PlayerTile';
import { TileDisplay } from './components/Tile/Tile';
import { WinnerScreen } from './components/WinnerScreen/WinnerScreen';
import { mockOptions, useMemoryGame } from './hooks/useMemoryGame';
import { useOptions } from './hooks/useOptions';

function App() {
	const options = useOptions();

	const {
		tiles,
		randomlyFillTiles,
		selectedTiles,
		select,
		players,
		winners,
		resetScores,
		setPlayers,
	} = useMemoryGame();

	if (players.length === 0) {
		return (
			<PlayerSelection
				begin={(newPlayers) => {
					setPlayers(newPlayers);
					randomlyFillTiles(options);
				}}
			/>
		);
	}
	if (winners) {
		return (
			<WinnerScreen
				winners={winners}
				playAgain={() => {
					resetScores();
					randomlyFillTiles(options);
				}}
			/>
		);
	}
	return (
		<div>
			<button onClick={() => randomlyFillTiles(mockOptions)}>Begin</button>
			<div className="playerArea">
				{players.map((p) => (
					<PlayerTile player={p} key={p.id} />
				))}
			</div>
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
