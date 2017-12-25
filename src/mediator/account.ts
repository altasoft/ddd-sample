import { AccountAggregate, CustomerAggregate } from "../domain";
import { domain } from '../context';


AccountAggregate.Events.Registered.attachSync(async x => {
	const customer = domain.get(CustomerAggregate, x.transaction)

	await customer.load(x.data.customerId);
	await customer.updateAccountsCount({ operationType: 'add' });
})
