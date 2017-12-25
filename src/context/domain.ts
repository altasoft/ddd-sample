import { Datastore, AggregateResolver } from "@jokio/datastore";


const {
	DATASTORE_CONFIG: datastoreConfig
} = process.env;


const credentials = datastoreConfig ? JSON.parse(datastoreConfig) : undefined;
const db = new Datastore({ credentials });

export const domain = new AggregateResolver(db);

export const test = Date.now()
