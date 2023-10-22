import { CalcTables } from './components/CalculationTables/CalculationTables';
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
	years: number;
}

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
				<CalcTables
					calculationTables={calculationTables}
					resetCalculationTables={() => setCalculationTables(undefined)}
				/>
			)}
		</div>
	);
}

export default App;
