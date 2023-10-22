import { CalculationTable } from '../../App';
import { formatCurrency } from '../../functions/formatCurrency';
import { getYearlyRepayment } from '../../functions/getYearlyRepayment';

export const ResultListItem = ({
	calcTable,
}: {
	calcTable: CalculationTable;
}) => {
	if (calcTable.type === 'borrow') {
		return (
			<div
				className={`explanation ${calcTable.errorReason ? 'error' : 'success'}`}
			>
				<h3>{calcTable.headline}:</h3>

				{calcTable.errorReason === 'duration' && (
					<div>
						Unfortunately you cannot repay this loan before your planned
						retirement.
					</div>
				)}

				{calcTable.errorReason === 'rate' && (
					<div>
						Unfortunately the monthly rate is too low to repay this loan.
					</div>
				)}
				<div className="inputExplanation">
					<p>LoanAmount: {formatCurrency(calcTable.loanAmount)}</p>

					<p>Duration: {calcTable.years} Years</p>

					<p>Interest Rate: {calcTable.interestRate}%</p>
					<p>Monthly Rate: {formatCurrency(calcTable.monthlyRate)}</p>
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
							Total Interest Payed:{' '}
							{formatCurrency(calcTable.totalInterestPayed)} or{' '}
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
					<p>Monthly Rate: {formatCurrency(calcTable.monthlyRate)}</p>
					<p>Starting Capital: {formatCurrency(calcTable.startingCapital)}</p>
					<p>Invested: {formatCurrency(calcTable.totalInvested)}</p>
					<p>
						Interest Gained: {formatCurrency(calcTable.totalInterestGained)}
					</p>
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
	}
};
