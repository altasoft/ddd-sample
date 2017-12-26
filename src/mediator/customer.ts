import { CustomerAggregateRoot } from "../domain";


CustomerAggregateRoot.Events.Registered.attachAsync(async x => {
	console.log('CustomerAggr', 'Registered', x.data);
})

CustomerAggregateRoot.Events.AccountsCountUpdated.attachAsync(async x => {
	console.log('CustomerAggr', 'AccountsCountUpdated', x.data);
})
