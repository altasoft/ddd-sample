import { run } from '@jokio/graphql';
import { AggregateResolver, Datastore } from '@jokio/datastore';

import { localSchemas } from './schemas';
import { domain } from './context';
import './mediator';

run({
	localSchemas,
	contextObject: { domain }
})
