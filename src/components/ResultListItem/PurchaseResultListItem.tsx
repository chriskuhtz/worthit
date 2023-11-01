import { LoanCalculationTable } from '../../App';
import { formatCurrency } from '../../functions/formatCurrency';
import { getYearlyRepayment } from '../../functions/getYearlyRepayment';

export const PurchaseResultListItem = ({
	calcTable,
}: {
	calcTable: LoanCalculationTable;
}): JSX.Element => {
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
				<div>Unfortunately the monthly rate is too low to repay this loan.</div>
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
						Total Interest Payed: {formatCurrency(calcTable.totalInterestPayed)}{' '}
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
				<p>
					Total Payed:{' '}
					{formatCurrency(calcTable.loanAmount + calcTable.totalInterestPayed)}
				</p>
			)}
			{calcTable.totalInterestPayed && (
				<p>
					Total Value: 1 Property that is {calcTable.years} years older and
					might have increased in value
				</p>
			)}
		</div>
	);
};
