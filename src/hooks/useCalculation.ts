import { useCallback, useEffect, useMemo, useState } from 'react';
import { CalculationTable } from '../App';
import { calculateInvestment } from '../functions/calculateInvestment';
import { calculatePurchase } from '../functions/calculatePurchase';

export const annualSP500 = 10;

export const useCalculation = () => {
	const [loanAmount, setLoanAmount] = useState<number>(0);
	const [interestRate, setInterestRate] = useState<number>(0);
	const [monthlyRate, setMonthlyRate] = useState<number>(0);
	const [ownCapital, setOwnCapital] = useState<number>(0);

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

	const calculationPossible: boolean = useMemo(
		() =>
			!!(
				loanAmount &&
				interestRate &&
				monthlyRate &&
				ownCapital &&
				!calculationTables
			),
		[calculationTables, interestRate, loanAmount, monthlyRate, ownCapital]
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

		const investmentData = chosenVersion.isPossible
			? chosenVersion
			: onePercentRateVersion;
		const investment = calculateInvestment(
			annualSP500,
			investmentData.monthlyRate,
			investmentData.years,
			ownCapital,
			`Your Version invested with average S&P 500 returns for ${investmentData.years} Years`
		);
		const pessimisticInvestment = calculateInvestment(
			annualSP500 / 2,
			investmentData.monthlyRate,
			investmentData.years,
			ownCapital,
			`Your Version invested with half the average S&P 500 returns for ${investmentData.years} Years`
		);
		setCalculationTables([
			chosenVersion,
			onePercentRateVersion,
			twoPercentRateVersion,
			investment,
			pessimisticInvestment,
		]);
	}, [
		loanAmount,
		interestRate,
		monthlyRate,
		onePercentRate,
		twoPercentRate,
		ownCapital,
	]);

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
		ownCapital,
		setOwnCapital,
	};
};
