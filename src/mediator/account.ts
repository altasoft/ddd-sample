import { AccountAggregateRoot, CustomerAggregateRoot } from "../domain";
import { domain } from '../context';


AccountAggregateRoot.Events.Registered.attach(async x => {
	const customer = domain.get(CustomerAggregateRoot, x.transaction);

	await customer.load(x.data.customerId);
	await customer.updateAccountsCount({ operationType: 'add' });
	console.log('done')
})
