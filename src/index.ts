import { run } from '@jokio/graphql';

import { localSchemas } from './schemas';
import { domain } from './context';
import './mediator';


run({
	localSchemas,
	contextObject: { domain }
})
