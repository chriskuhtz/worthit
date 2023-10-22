import { CalcTables } from './components/CalculationTables/CalculationTables';
import { Form } from './components/Form/Form';
import { useCalculation } from './hooks/useCalculation';

export interface CalculationTableRow {
	year: number;
	remainingDebt: number;
}

export interface BaseCalculationTable {
	rows: CalculationTableRow[];
	type: 'borrow' | 'invest';
	headline: string;
	interestRate: number;
	monthlyRate: number;
	years: number;
}

export interface LoanCalculationTable extends BaseCalculationTable {
	type: 'borrow';
	errorReason?: 'rate' | 'duration';
	totalInterestPayed?: number;
	loanAmount: number;
}
export interface InvestmentCalculationTable extends BaseCalculationTable {
	type: 'invest';
	totalInterestGained: number;
	totalInvested: number;
	startingCapital: number;
	valueAtRetirement: number;
}
export type CalculationTable =
	| LoanCalculationTable
	| InvestmentCalculationTable;

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
		ownCapital,
		setOwnCapital,
		yearsUntilRetirement,
		setYearsUntilRetirement,
	} = useCalculation();
	return (
		<div className="container" style={{ alignItems: 'center' }}>
			{!calculationTables && (
				<Form
					loanAmount={loanAmount}
					setLoanAmount={setLoanAmount}
					setInterestRate={setInterestRate}
					setMonthlyRate={setMonthlyRate}
					interestRate={interestRate}
					monthlyRate={monthlyRate}
					calculationPossible={calculationPossible}
					calculate={calculate}
					ownCapital={ownCapital}
					setOwnCapital={setOwnCapital}
					yearsUntilRetirement={yearsUntilRetirement}
					setYearsUntilRetirement={setYearsUntilRetirement}
				/>
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
