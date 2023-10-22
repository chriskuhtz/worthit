import { CustomInput } from '../../ui_components/CustomInput/CustomInput';

export const Form = ({
	loanAmount,
	setLoanAmount,
	interestRate,
	setInterestRate,
	setMonthlyRate,
	monthlyRate,
	calculationPossible,
	calculate,
	ownCapital,
	setOwnCapital,
	yearsUntilRetirement,
	setYearsUntilRetirement,
}: {
	loanAmount: number;
	setLoanAmount: (x: number) => void;
	setInterestRate: (x: number) => void;
	setMonthlyRate: (x: number) => void;
	interestRate: number;
	monthlyRate: number;
	calculationPossible: boolean;
	calculate: () => void;
	setOwnCapital: (x: number) => void;
	ownCapital: number;
	setYearsUntilRetirement: (x: number) => void;
	yearsUntilRetirement: number;
}): JSX.Element => {
	return (
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
			<CustomInput
				value={ownCapital.toString()}
				onChange={(x) => setOwnCapital(parseInt(x))}
				errorMessage={''}
				type={'number'}
				placeholder={'Own Capital'}
				label={'Own Capital ($)'}
				explanation="Loan approval requires own capital, typically at least 10%. You could also invest this money and gain interest"
			/>
			<CustomInput
				value={yearsUntilRetirement.toString()}
				onChange={(x) => setYearsUntilRetirement(parseInt(x))}
				errorMessage={''}
				type={'number'}
				placeholder={'Years until Retirement'}
				label={'Years until Retirement'}
				explanation="You probably want to pay off your house before you retire"
			/>
			<h3>upcoming Features</h3>
			<p>consider current rent</p>
			<p>consider increased utility and upkeep costs (property size)</p>
			<p>consider future rent increases</p>
			<button disabled={!calculationPossible} onClick={calculate}>
				Calculate
			</button>
		</div>
	);
};
