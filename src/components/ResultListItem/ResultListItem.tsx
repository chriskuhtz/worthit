import { CalculationTable } from '../../App';
import { getYearlyRepayment } from '../../functions/getYearlyRepayment';

export const ResultListItem = ({
	calcTable,
}: {
	calcTable: CalculationTable;
}) => {
	return (
		<div
			className={`explanation ${calcTable.isPossible ? 'success' : 'error'}`}
		>
			<h3>{calcTable.headline}:</h3>

			<div className="inputExplanation">
				<p>LoanAmount: {calcTable.inputs.loanAmount}$</p>
				<p>Interest Rate: {calcTable.inputs.interestRate}%</p>
				<p>Monthly Rate: {calcTable.inputs.monthlyRate}$</p>
				<p>
					Yearly Repayment: {getYearlyRepayment(calcTable.inputs).toFixed(2)}%
				</p>
			</div>
			<p>{calcTable.explanation}</p>
		</div>
	);
};
