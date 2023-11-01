import { InvestmentCalculationTable } from '../../App';
import { formatCurrency } from '../../functions/formatCurrency';

export const InvestmentResultListItem = ({
	calcTable,
}: {
	calcTable: InvestmentCalculationTable;
}): JSX.Element => {
	return (
		<div className={`explanation success`}>
			<h3>{calcTable.headline}:</h3>

			<div className="inputExplanation">
				<p>Interest Rate: {calcTable.interestRate}%</p>
				<p>Monthly Rate: {formatCurrency(calcTable.monthlyRate)}</p>
				<p>Starting Capital: {formatCurrency(calcTable.startingCapital)}</p>
				<p>Invested: {formatCurrency(calcTable.totalInvested)}</p>
				<p>Interest Gained: {formatCurrency(calcTable.totalInterestGained)}</p>
			</div>
			<p>
				Value at loan payback:{' '}
				{formatCurrency(
					calcTable.totalInterestGained + calcTable.totalInvested
				)}
			</p>
			<p>
				Value at retirement age: {formatCurrency(calcTable.valueAtRetirement)}
			</p>
		</div>
	);
};
