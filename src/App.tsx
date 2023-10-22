import { useCalculation } from './hooks/useCalculation';
import { CustomInput } from './ui_components/CustomInput/CustomInput';

export interface CalculationTableRow {
	year: number;
	remainingDebt: number;
}
export interface CalculationTableInputs {
	loanAmount: number;
	interestRate: number;
	monthlyRate: number;
	type: 'borrow' | 'invest';
}
export interface CalculationTable {
	rows: CalculationTableRow[];
	explanation: string;
	inputs: CalculationTableInputs;
	isPossible: boolean;
	totalInterestPayed?: number;
	headline: string;
}

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

function App() {
	const {
		loanAmount,
		setInterestRate,
		setLoanAmount,
		setMonthlyRate,
		calculate,
		calculationPossible,
		interestRate,
		monthlyRate,
		calculationTables,
		setCalculationTables,
	} = useCalculation();
	return (
		<div className="container" style={{ alignItems: 'center' }}>
			{!calculationTables && (
				<>
					<h1> Is it worth it?</h1>
					<h2>
						Should I buy a property or invest in the stock market? A few
						interactive suggestions.
					</h2>
					<div className="form">
						<CustomInput
							value={loanAmount.toString()}
							onChange={(x) => setLoanAmount(parseInt(x))}
							errorMessage={''}
							type={'number'}
							placeholder={'Loan Amount'}
							label={'Loan Amount ($)'}
							explanation="How much money do you need to borrow"
						/>
						<CustomInput
							value={interestRate.toString()}
							onChange={(x) => setInterestRate(parseInt(x))}
							errorMessage={''}
							type={'number'}
							placeholder={'Interest Rate'}
							label={'Interest Rate (%)'}
							explanation="What is your expected interest rate"
						/>
						<CustomInput
							value={monthlyRate.toString()}
							onChange={(x) => setMonthlyRate(parseInt(x))}
							errorMessage={''}
							type={'number'}
							placeholder={'Monthly Rate'}
							label={'Monthly Rate ($)'}
							explanation="How much can you repay each month"
						/>

						<button disabled={!calculationPossible} onClick={calculate}>
							Calculate
						</button>
					</div>
				</>
			)}
			{calculationTables && (
				<>
					<div className="tablesGrid">
						{calculationTables?.map((c) => (
							<div
								className={`explanation ${c.isPossible ? 'success' : 'error'}`}
							>
								<h3>{c.headline}</h3>
								{c.inputs.type === 'borrow' && (
									<div className="inputExplanation">
										<p>LoanAmount: {c.inputs.loanAmount}$</p>
										<p>Interest Rate: {c.inputs.interestRate}%</p>
										<p>Monthly Rate: {c.inputs.monthlyRate}$</p>
										<p>
											Yearly Repayment:{' '}
											{getYearlyRepayment(c.inputs).toFixed(2)}%
										</p>
									</div>
								)}
								<p>{c.explanation}</p>
							</div>
						))}
					</div>
					<button onClick={() => setCalculationTables(undefined)}>
						Change Data
					</button>
				</>
			)}
		</div>
	);
}

export default App;
