import {
	CalculationTable,
	CalculationTableInputs,
	CalculationTableRow,
} from '../App';

export const calculatePurchase = (
	loanAmount: number,
	interestRate: number,
	monthlyRate: number,
	minRate: number,
	headline: string
): CalculationTable => {
	const inputs: CalculationTableInputs = {
		loanAmount,
		interestRate,
		monthlyRate,
		type: 'borrow',
	};
	if (minRate > monthlyRate) {
		return {
			rows: [],
			headline,
			inputs,
			isPossible: false,
			explanation: `Unfortunately, your monthly payment is not high enough to pay back
			this loan. In order to repay 1% of the loan per year your monthly rate needs to be higher than ${minRate}$`,
		};
	}
	const rows: CalculationTableRow[] = [];
	let remainingAmount = loanAmount;

	let i = 1;
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
		explanation: `It will take you ${i} years to repay the loan and cost ${Math.floor(
			totalInterestPayed
		)}$ or  ${Math.floor(
			(totalInterestPayed / loanAmount) * 100
		)}% in total interest.`,
		isPossible: true,
		totalInterestPayed: totalInterestPayed,
		headline,
		inputs,
	};
};
