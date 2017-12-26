import { Resolvers, createSubscriptionEvent } from '@jokio/graphql';
import { AppContext } from '../context/app';
import { CustomerAggregateRoot, AccountAggregateRoot } from '../domain';
import { withFilter } from 'graphql-subscriptions';

export const typeDefs = `
	extend type Query {
		customers: [Customer]
		customer(id: ID!): Customer
		accounts: [Account]
	}

	extend type Mutation {
		addCustomer(name: String!): Customer
		addCustomerAccount(customerId: ID!, currency: String!): Account
	}

	extend type Subscription {
		accountCreated: Account
	}

	type Customer {
		id: ID!
		name: String!
		accountsCount: Int!
		accounts: [Account]
	}

	type Account {
		id: ID!
		currency: String!
		amount: Float!
		customer: Customer
	}
`


// Query
const queryResolvers: Resolvers<AppContext> = {
	Query: {
		customers: (obj, props, { domain }) =>
			domain.get(CustomerAggregateRoot).query(),

		customer: (obj, { id }, { domain }) =>
			domain.get(CustomerAggregateRoot).load(id),

		accounts: (obj, props, { domain }) =>
			domain.get(AccountAggregateRoot).query(),
	},

	Customer: {
		accounts: (obj, props, { domain }) =>
			domain.get(AccountAggregateRoot).query(x => x.filter('customerId', obj.id)),
	},

	Account: {
		customer: (obj, props, { domain }) =>
			domain.get(CustomerAggregateRoot).load(obj.customerId),
	},
}


// Mutation
const mutationResolvers: Resolvers<AppContext> = {
	Mutation: {
		addCustomer: (obj, props, { domain }) =>
			domain.get(CustomerAggregateRoot).register(props),

		addCustomerAccount: async (obj, props, { domain, pubsub }) => {
			const account = await domain.get(AccountAggregateRoot).register(props);

			pubsub.publish('ACCOUNT_CREATED', { accountCreated: account })

			return account;
		}
	}
}


// Subscription
const subscriptionResolvers: Resolvers<AppContext> = {
	Subscription: {
		accountCreated: {
			subscribe: (obj, prop, { pubsub }) =>
				pubsub.asyncIterator('ACCOUNT_CREATED')
		}
	}
}



export const resolvers = {
	...queryResolvers,
	...mutationResolvers,
	...subscriptionResolvers,
}
