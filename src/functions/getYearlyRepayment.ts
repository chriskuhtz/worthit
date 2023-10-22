import { CalculationTableInputs } from '../App';

export const getYearlyRepayment = ({
	loanAmount,
	interestRate,
	monthlyRate,
}: CalculationTableInputs) => {
	const yearlyAmount = monthlyRate * 12;
	const firstYearInterest = interestRate * (loanAmount / 100);

	const firstYearRepayment = yearlyAmount - firstYearInterest;

	return (firstYearRepayment / loanAmount) * 100;
};
