import { Aggregate, Entity, DomainEvent } from "@jokio/datastore";


export class CustomerAggregate extends Aggregate<CustomerState> {

	static Events = {
		Registered: new DomainEvent<RegisteredEvent>(),
		AccountsCountUpdated: new DomainEvent<AccountsCountUpdatedEvent>(),
	}


	constructor(datastore, parentTransaction) {
		super('Customers', datastore, parentTransaction)
	}


	async register(props: RegisterProps) {

		const defaultProps = {
			id: Date.now().toString(),
			accountsCount: 0,
		}

		this.state = {
			...defaultProps,
			...props,
		}

		const eventData = {
			id: this.state.id,
			name: this.state.name,
			accountsCount: this.state.accountsCount,
		}

		const isSuccess = await this.save(CustomerAggregate.Events.Registered, eventData)
		if (!isSuccess)
			throw new Error('Operation Failed');

		return this.state;
	}

	async updateAccountsCount(props: UpdateAccountsCountProps) {

		switch (props.operationType) {
			case 'add':
				this.state.accountsCount++;
				break;

			case 'remove':
				this.state.accountsCount--;
				break;
		}

		const eventData = {
			customerId: this.state.id,
			totalCount: this.state.accountsCount,
		}

		const isSuccess = await this.save(CustomerAggregate.Events.AccountsCountUpdated, eventData);
		if (!isSuccess)
			throw new Error('Operation Failed');

		return this.state;
	}
}


// State
interface CustomerState extends Entity {
	name: string
	accountsCount: number
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
