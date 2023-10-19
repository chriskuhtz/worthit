import { useState } from 'react';
import { PlayerSelection } from './components/PlayerSelection/PlayerSelection';
import { PlayerTile } from './components/PlayerTile/PlayerTile';
import { ThemeSelection } from './components/ThemeSelection/ThemeSelection';
import { TileDisplay } from './components/Tile/Tile';
import { WinnerScreen } from './components/WinnerScreen/WinnerScreen';
import { useMemoryGame } from './hooks/useMemoryGame';
import { useOptions } from './hooks/useOptions';
import { Modal } from './ui_components/Modal/Modal';

function App() {
	const [theme, setTheme] = useState<string>('');
	const options = useOptions(theme);

	const {
		tiles,
		randomlyFillTiles,
		selectedTiles,
		select,
		players,
		winners,
		resetScores,
		setPlayers,
		focusTile,
	} = useMemoryGame();

	if (theme === '') {
		return <ThemeSelection setTheme={setTheme} />;
	}

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
			<Modal
				open={!!focusTile}
				modalContent={<img src={focusTile?.source} height={600} width={600} />}
			/>
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
						disabled={
							!!(t.ownerName || selectedTiles.length === 2 || focusTile)
						}
					/>
				))}
			</div>
		</div>
	);
}

export default App;
