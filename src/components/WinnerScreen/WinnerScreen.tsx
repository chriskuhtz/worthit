import { Player } from '../../hooks/useMemoryGame';

export const WinnerScreen = ({
	winners,
	playAgain,
	removePlayers,
	removeTheme,
}: {
	winners: Player[];
	playAgain: () => void;
	removeTheme: () => void;
	removePlayers: () => void;
}): JSX.Element => {
	const winnerMessage =
		winners.length > 1
			? `	Gleichstand zwischen ${winners
					.map((w) => w.name)
					.join(' und ')} mit{' '}
	${winners[0].score} Punkten`
			: `${winners[0].name} hat mit ${winners[0].score} Punkten gewonnen!`;

	if (winners.length >= 1) {
		return (
			<div className="selectionScreen">
				<h1>{winnerMessage}</h1>
				<button onClick={playAgain}>
					Nochmal mit gleichen Bildern und Spielern?
				</button>
			</div>
		);
	}
	console.error('no winners', winners);
	return <></>;
};
