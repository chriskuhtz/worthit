import { CalculationTableRow, LoanCalculationTable } from '../App';

export const calculatePurchase = (
	loanAmount: number,
	interestRate: number,
	monthlyRate: number,
	minRate: number,
	headline: string
): LoanCalculationTable => {
	if (minRate > monthlyRate) {
		return {
			rows: [],
			headline,
			type: 'borrow',
			isPossible: false,
			years: 0,
			loanAmount,
			interestRate,
			monthlyRate,
		};
	}
	const rows: CalculationTableRow[] = [];
	let remainingAmount = loanAmount;

	let i = 0;
	let totalInterestPayed: number = 0;

	while (remainingAmount > 0 && i < 100) {
		const interest = (remainingAmount / 100) * interestRate;
		remainingAmount = remainingAmount - monthlyRate * 12 + interest;
		i += 1;
		totalInterestPayed += interest;
		rows.push({ year: i, remainingDebt: remainingAmount });
	}

	return {
		rows,
		isPossible: true,
		years: i,
		totalInterestPayed: totalInterestPayed,
		headline,
		type: 'borrow',
		loanAmount,
		interestRate,
		monthlyRate,
	};
};
