import { useCallback, useEffect, useMemo, useState } from 'react';
import { CalculationTable } from '../App';
import { calculatePurchase } from '../functions/calculatePurchase';

export const useCalculation = () => {
	const [loanAmount, setLoanAmount] = useState<number>(0);
	const [interestRate, setInterestRate] = useState<number>(0);
	const [monthlyRate, setMonthlyRate] = useState<number>(0);

	const onePercentRate = useMemo(() => {
		const firstYearInterest = (loanAmount / 100) * interestRate;

		return Math.floor((firstYearInterest + loanAmount / 100) / 12) + 1;
	}, [interestRate, loanAmount]);
	const twoPercentRate = useMemo(() => {
		const firstYearInterest = (loanAmount / 100) * interestRate;

		return Math.floor((firstYearInterest + (loanAmount / 100) * 2) / 12) + 1;
	}, [interestRate, loanAmount]);

	const [calculationTables, setCalculationTables] = useState<
		CalculationTable[] | undefined
	>();

	useEffect(() => {
		setCalculationTables(undefined);
	}, [loanAmount, interestRate, monthlyRate]);

	const calculationPossible = useMemo(
		() => loanAmount && interestRate && monthlyRate && !calculationTables,
		[calculationTables, interestRate, loanAmount, monthlyRate]
	);

	const calculate = useCallback(() => {
		const chosenVersion = calculatePurchase(
			loanAmount,
			interestRate,
			monthlyRate,
			onePercentRate,
			'Your Version'
		);
		const onePercentRateVersion = calculatePurchase(
			loanAmount,
			interestRate,
			onePercentRate,
			onePercentRate,
			'Alternative: 1% Repayment'
		);
		const twoPercentRateVersion = calculatePurchase(
			loanAmount,
			interestRate,
			twoPercentRate,
			onePercentRate,
			'Alternative: 2% Repayment'
		);
		setCalculationTables([
			chosenVersion,
			onePercentRateVersion,
			twoPercentRateVersion,
		]);
	}, [loanAmount, interestRate, monthlyRate, onePercentRate, twoPercentRate]);

	return {
		loanAmount,
		setCalculationTables,
		setInterestRate,
		setLoanAmount,
		setMonthlyRate,
		calculate,
		calculationPossible,
		interestRate,
		monthlyRate,
		calculationTables,
	};
};
