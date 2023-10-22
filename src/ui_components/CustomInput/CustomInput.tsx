import { useState } from 'react';
import { Modal } from '../Modal/Modal';

import './customInput.css';

export const CustomInput = ({
	value,
	onChange,
	label,

	explanation,
	type,
	placeholder,
	disabled,
}: {
	value: string;
	onChange: (x: string) => void;
	errorMessage?: string;
	explanation?: string;
	type: 'string' | 'number';
	placeholder?: string;
	label?: string;
	disabled?: boolean;
}): JSX.Element => {
	const [showExplanation, setShowExplanation] = useState<boolean>(false);

	return (
		<div className="customInput">
			{label && <strong>{label}:</strong>}
			<input
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
				type={type}
				disabled={disabled}
			/>
			{explanation && (
				<div
					onClick={() => setShowExplanation(!showExplanation)}
					className="iconButton"
				>
					?
				</div>
			)}
			<Modal
				open={showExplanation}
				modalContent={
					<div className="explanationModal">
						{explanation}
						<div
							onClick={() => setShowExplanation(false)}
							className="iconButton"
						>
							X
						</div>
					</div>
				}
			/>
		</div>
	);
};
