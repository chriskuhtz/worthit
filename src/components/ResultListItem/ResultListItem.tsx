import { CalculationTable } from '../../App';
import { getYearlyRepayment } from '../../functions/getYearlyRepayment';

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
					<p>
						Yearly Repayment:{' '}
						{getYearlyRepayment(
							calcTable.loanAmount,
							calcTable.interestRate,
							calcTable.monthlyRate
						).toFixed(3)}
						%
					</p>
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
				{calcTable.totalInterestPayed && (
					<p>Total Value: 1 Property that is {calcTable.years} years older</p>
				)}
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
					<p>Starting Capital: {calcTable.startingCapital}$</p>
					<p>Invested: {calcTable.totalInvested.toFixed(0)}$</p>
					<p>Interest Gained: {calcTable.totalInterestGained.toFixed(0)}$</p>

					<p>
						Total Value:{' '}
						{(calcTable.totalInterestGained + calcTable.totalInvested).toFixed(
							0
						)}
						$
					</p>
				</div>
			</div>
		);
	}
};
