import { run } from '@jokio/graphql';
import { AggregateResolver } from '@jokio/datastore';
import localSchemas from './schemas';

run({
	localSchemas,
	contextObject: {
		domain: AggregateResolver
	}
})
