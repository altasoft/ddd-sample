import { Aggregate, Entity, DomainEvent } from "@jokio/datastore";



export class AccountAggregateRoot extends Aggregate<AccountState> {

	static Events = {
		Registered: new DomainEvent<RegisteredEvent>()
	}


	constructor(datastore, parentTransaction) {
		super('Accounts', datastore, parentTransaction)
	}


	async register(props: RegisterProps) {

		const defaultProps = {
			id: Date.now().toString(),
			amount: 0
		}

		this.state = {
			...defaultProps,
			...props,
		}

		const eventData = {
			customerId: this.state.customerId,
			accountId: this.state.id,
		}

		const isSuccess = await this.save(AccountAggregateRoot.Events.Registered, eventData);
		if (!isSuccess)
			throw new Error('Operation Failed');

		return this.state;
	}
}



// State
interface AccountState extends Entity {
	customerId: string
	currency: string
	amount: number
}


// Props
interface RegisterProps {
	customerId: string
	currency: string
}


// Events
interface RegisteredEvent {
	customerId: string
	accountId: string
}
