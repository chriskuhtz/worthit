import { CalculationTable } from '../../App';
import { InvestmentResultListItem } from './InvestmentResultListItem';
import { PurchaseResultListItem } from './PurchaseResultListItem';

export const ResultListItem = ({
	calcTable,
}: {
	calcTable: CalculationTable;
}) => {
	if (calcTable.type === 'borrow') {
		return <PurchaseResultListItem calcTable={calcTable} />;
	}

	if (calcTable.type === 'invest') {
		return <InvestmentResultListItem calcTable={calcTable} />;
	}
};
