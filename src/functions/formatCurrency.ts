export const formatCurrency = (amount: number): string => {
	const formattedAmount = [...amount.toFixed(0)]
		.map((x, i) => {
			const length = amount.toFixed(0).length;
			if (i !== 0 && (length - i) % 3 === 0) {
				return `.${x}`;
			}
			return x;
		})
		.join('');
	return `${formattedAmount}$`;
};
