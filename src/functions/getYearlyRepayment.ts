export const getYearlyRepayment = (
	loanAmount: number,
	interestRate: number,
	monthlyRate: number
) => {
	const yearlyAmount = monthlyRate * 12;
	const firstYearInterest = interestRate * (loanAmount / 100);

	const firstYearRepayment = yearlyAmount - firstYearInterest;

	return (firstYearRepayment / loanAmount) * 100;
};
