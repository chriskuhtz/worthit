import {
	CalculationTable,
	CalculationTableInputs,
	CalculationTableRow,
} from '../App';

export const calculateInvestment = (
	interestRate: number,
	monthlyRate: number,
	years: number,
	headline: string
): CalculationTable => {
	const inputs: CalculationTableInputs = {
		loanAmount: 0,
		interestRate,
		monthlyRate,
		type: 'invest',
	};

	const rows: CalculationTableRow[] = [];
	let total = 0;

	let i = years;

	while (i > 0) {
		total += monthlyRate * 12;
		total += (total / 100) * interestRate;
		i -= 1;
	}

	return {
		rows,
		explanation: `Investing ${monthlyRate}$ per month at ${interestRate}% per year will yield ${Math.floor(
			total
		)}$ after ${years} years.`,
		isPossible: true,
		years,
		headline,
		inputs,
	};
};
