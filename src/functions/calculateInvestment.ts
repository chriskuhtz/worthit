import { CalculationTableRow, InvestmentCalculationTable } from '../App';

const getTotal = (
	ownCapital: number,
	years: number,
	monthlyRate: number,
	interestRate: number
): number => {
	let total = ownCapital;

	let i = years;

	while (i > 0) {
		total += monthlyRate * 12;
		total += (total / 100) * interestRate;
		i -= 1;
	}

	return total;
};
export const calculateInvestment = (
	interestRate: number,
	monthlyRate: number,
	years: number,
	ownCapital: number,
	yearsUntilRetirement: number,
	headline: string
): InvestmentCalculationTable => {
	console.log(years, monthlyRate);
	const rows: CalculationTableRow[] = [];

	const total = getTotal(ownCapital, years, monthlyRate, interestRate);
	const valueAtRetirement = getTotal(
		ownCapital,
		yearsUntilRetirement,
		monthlyRate,
		interestRate
	);

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
		valueAtRetirement,
	};
};
