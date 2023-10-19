import { Player } from '../../hooks/useMemoryGame';

export const WinnerScreen = ({
	winners,
	playAgain,
}: {
	winners: Player[];
	playAgain: () => void;
}): JSX.Element => {
	if (winners.length > 1) {
		return (
			<div>
				<h1>
					Gleichstand zwischen {winners.map((w) => w.name).join(' und ')} mit{' '}
					{winners[0].score}!
				</h1>
				<button onClick={playAgain}>Nochmal spielen?</button>
			</div>
		);
	}
	if (winners.length === 1) {
		const winner = winners[0];
		return (
			<div>
				<h1>
					{winner.name} hat mit {winner.score} gewonnen!
				</h1>
				<button onClick={playAgain}>Nochmal spielen?</button>
			</div>
		);
	}
	console.error('no winners', winners);
	return <></>;
};
