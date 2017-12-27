import { Context } from "@jokio/graphql";
import { AggregateRootResolver } from "@jokio/datastore";

export interface AppContext extends Context {
	domain: AggregateRootResolver
}
