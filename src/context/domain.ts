import { Datastore, AggregateRootResolver } from "@jokio/datastore";


const {
	DATASTORE_CONFIG: datastoreConfig
} = process.env;


const credentials = datastoreConfig ? JSON.parse(datastoreConfig) : undefined;
const db = new Datastore({ credentials });


export const domain = new AggregateRootResolver(db);
