import { Aggregate } from "@jokio/datastore/dist";

export class OperationsAggregate extends Aggregate<OperationsState> {

	defaultState = {
		count: 0
	}

	add() {
		this.state.count++;
	}
}



// Types
export interface OperationsState {
	count: number
}
