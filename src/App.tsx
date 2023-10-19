import { PlayerSelection } from './components/PlayerSelection/PlayerSelection';
import { PlayerTile } from './components/PlayerTile/PlayerTile';
import { TileDisplay } from './components/Tile/Tile';
import { WinnerScreen } from './components/WinnerScreen/WinnerScreen';
import { mockOptions, useMemoryGame } from './hooks/useMemoryGame';

function App() {
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

	console.log(players, tiles);

	if (players.length === 0) {
		return (
			<PlayerSelection
				begin={(newPlayers) => {
					setPlayers(newPlayers);
					randomlyFillTiles(mockOptions);
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
					randomlyFillTiles(mockOptions);
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
