import { Context } from "@jokio/graphql";
import { AggregateResolver } from "@jokio/datastore";

export interface AppContext extends Context {
	domain: AggregateResolver
}
