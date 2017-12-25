import { Resolvers } from '@jokio/graphql';
import { AppContext } from '../context/app';
import { CustomerAggregate, AccountAggregate } from '../domain';


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
		customerId: ID!
		customer: Customer
	}
`


// Query
const queryResolvers: Resolvers<AppContext> = {
	Query: {
		customers: (obj, props, { domain }) =>
			domain.get(CustomerAggregate).query(),

		customer: (obj, { id }, { domain }) =>
			domain.get(CustomerAggregate).load(id),

		accounts: (obj, props, { domain }) =>
			domain.get(AccountAggregate).query(),
	},

	Customer: {
		accounts: (obj, props, { domain }) =>
			domain.get(AccountAggregate).query(x => x.filter('customerId', obj.id)),
	},

	Account: {
		customer: (obj, props, { domain }) =>
			domain.get(CustomerAggregate).load(obj.customerId),
	},
}


// Mutation
const mutationResolvers: Resolvers<AppContext> = {
	Mutation: {
		addCustomer: (obj, props, { domain }) =>
			domain.get(CustomerAggregate).register(props),

		addCustomerAccount: (obj, props, { domain }) =>
			domain.get(AccountAggregate).register(props)
	}
}


export const resolvers = {
	...queryResolvers,
	...mutationResolvers,
}
