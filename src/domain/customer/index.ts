import { AggregateRoot, Entity, DomainEvent, Aggregate } from "@jokio/datastore";
import { OperationsAggregate, OperationsState } from "./operations";


export class CustomerAggregateRoot extends AggregateRoot<CustomerState> {

	static Events = {
		Registered: new DomainEvent<RegisteredEvent>(),
		AccountsCountUpdated: new DomainEvent<AccountsCountUpdatedEvent>(),
	}

	protected aggregates = {
		operations: new OperationsAggregate()
	}


	constructor(datastore, parentTransaction) {
		super('Customers', datastore, parentTransaction)
	}


	register(props: RegisterProps) {

		const { operations } = this.aggregates;

		const defaultState = {
			id: Date.now().toString(),
			accountsCount: 0,
			operations: operations.defaultState,
		}

		this.state = {
			...defaultState,
			...props,
		}

		operations.add();

		return this.save(CustomerAggregateRoot.Events.Registered, {
			id: this.state.id,
			name: this.state.name,
			accountsCount: this.state.accountsCount,
		})
	}

	updateAccountsCount(props: UpdateAccountsCountProps) {

		const { operations } = this.aggregates;

		switch (props.operationType) {
			case 'add':
				this.state.accountsCount++;
				break;

			case 'remove':
				this.state.accountsCount--;
				break;
		}

		operations.add();

		return this.save(CustomerAggregateRoot.Events.AccountsCountUpdated, {
			customerId: this.state.id,
			totalCount: this.state.accountsCount,
		});
	}
}





// State
interface CustomerState extends Entity {
	name: string
	accountsCount: number
	operations: OperationsState
}


// Props
interface RegisterProps {
	name: string
}


interface UpdateAccountsCountProps {
	operationType: 'add' | 'remove'
}


// Event
interface RegisteredEvent {
	id: string
	name: string
	accountsCount: number
}

interface AccountsCountUpdatedEvent {
	customerId: string
	totalCount: number
}
