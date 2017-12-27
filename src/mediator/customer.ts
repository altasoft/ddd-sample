import { CustomerAggregateRoot } from "../domain";


CustomerAggregateRoot.Events.Registered.attach(async x => {
	console.log('CustomerAggr', 'Registered', x.data);
})

CustomerAggregateRoot.Events.AccountsCountUpdated.attach(async x => {
	console.log('CustomerAggr', 'AccountsCountUpdated', x.data);
})
