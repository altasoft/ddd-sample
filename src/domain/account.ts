import { AggregateRoot, Entity, DomainEvent } from "@jokio/datastore";



export class AccountAggregateRoot extends AggregateRoot<AccountState> {

	static Events = {
		Registered: new DomainEvent<RegisteredEvent>()
	}


	constructor(datastore, parentTransaction) {
		super('Accounts', datastore, parentTransaction)
	}


	register(props: RegisterProps) {

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

		return this.save(AccountAggregateRoot.Events.Registered, eventData);
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
