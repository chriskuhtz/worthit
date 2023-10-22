import { CalculationTable } from '../../App';
import { ResultListItem } from '../ResultListItem/ResultListItem';

export const CalcTables = ({
	calculationTables,
	resetCalculationTables,
}: {
	calculationTables: CalculationTable[];
	resetCalculationTables: () => void;
}): JSX.Element => {
	return (
		<>
			<button onClick={resetCalculationTables}>Change Data</button>
			<div className="comparison">
				<div>
					<h1>Buying:</h1>
					<div className="resultList">
						{calculationTables
							?.filter((c) => c.type === 'borrow')
							.map((c) => (
								<ResultListItem calcTable={c} />
							))}
					</div>
				</div>
				<div>
					<h1>Investing:</h1>
					<div className="resultList">
						{calculationTables
							?.filter((c) => c.type === 'invest')
							.map((c) => (
								<ResultListItem calcTable={c} />
							))}
					</div>
				</div>
			</div>
		</>
	);
};
