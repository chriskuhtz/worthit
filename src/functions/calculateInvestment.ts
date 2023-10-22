import { CalculationTableRow, InvestmentCalculationTable } from '../App';

export const calculateInvestment = (
	interestRate: number,
	monthlyRate: number,
	years: number,
	ownCapital: number,
	headline: string
): InvestmentCalculationTable => {
	console.log(years, monthlyRate);
	const rows: CalculationTableRow[] = [];
	let total = ownCapital;

	let i = years;

	while (i > 0) {
		total += monthlyRate * 12;
		total += (total / 100) * interestRate;
		i -= 1;
	}

	return {
		rows,
		years,
		headline,
		interestRate,
		type: 'invest',
		monthlyRate,
		startingCapital: ownCapital,
		totalInvested: years * monthlyRate * 12,
		totalInterestGained: total - years * monthlyRate * 12,
	};
};
