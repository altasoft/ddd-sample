import { Resolvers } from '@jokio/graphql';
import { AppContext } from '../context/app';

export const typeDefs = `
	extend type Query {
		customers: [Customer]
	}

	extend type Mutation {
		addCustomerAccount(): Account
	}

	type Customer {
		id: ID!
		name: String!
	}

	type Account {
		id: ID!
		name: String!
		currency: String!
		amount: Float!
	}
`

export const resolvers: Resolvers<AppContext> = {
	Query: {
		customers: (_, __, { domain }) => domain.get(CustomerAggregate)
	}
}
