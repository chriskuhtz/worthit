import { CalculationTable } from '../../App';

export const ResultListItem = ({
	calcTable,
}: {
	calcTable: CalculationTable;
}) => {
	if (calcTable.type === 'borrow') {
		return (
			<div
				className={`explanation ${calcTable.isPossible ? 'success' : 'error'}`}
			>
				<h3>{calcTable.headline}:</h3>

				<div className="inputExplanation">
					<p>LoanAmount: {calcTable.loanAmount}$</p>

					<p>Duration: {calcTable.years} Years</p>

					<p>Interest Rate: {calcTable.interestRate}%</p>
					<p>Monthly Rate: {calcTable.monthlyRate}$</p>

					{calcTable.totalInterestPayed && (
						<p>
							Total Interest Payed: {calcTable.totalInterestPayed?.toFixed(0)}$
							or{' '}
							{(
								(calcTable.totalInterestPayed / calcTable.loanAmount) *
								100
							).toFixed(0)}
							%
						</p>
					)}
				</div>
			</div>
		);
	}

	if (calcTable.type === 'invest') {
		return (
			<div className={`explanation success`}>
				<h3>{calcTable.headline}:</h3>

				<div className="inputExplanation">
					<p>Interest Rate: {calcTable.interestRate}%</p>
					<p>Monthly Rate: {calcTable.monthlyRate}$</p>
				</div>
			</div>
		);
	}
};
