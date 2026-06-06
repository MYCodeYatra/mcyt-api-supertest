import request from 'supertest';

describe('Testing GraphQL APIs with SuperTest', () => {
    const API_URL = 'http://localhost:8080';

    it('1. Execute a GraphQL Query', async () => {
        // A GraphQL Query is just a POST request where the payload contains a "query" string
        const graphqlPayload = {
            query: `
                query {
                    users {
                        id
                        name
                        role
                    }
                }
            `
        };

        const response = await request(API_URL)
            .post('/graphql')
            .send(graphqlPayload);

        expect(response.status).toBe(200);
        // GraphQL always encapsulates the response inside a 'data' object
        expect(response.body).toHaveProperty('data');
        expect(response.body.data.users).toBeInstanceOf(Array);
        expect(response.body.data.users[0]).toHaveProperty('name');
    });

    it('2. Execute a GraphQL Mutation', async () => {
        // Mutations are used to modify data
        const mutationPayload = {
            query: `
                mutation {
                    createUser(name: "GraphQL User", email: "gql@mycodeyatra.com", role: "admin") {
                        id
                        name
                        email
                    }
                }
            `
        };

        const response = await request(API_URL)
            .post('/graphql')
            .send(mutationPayload);

        expect(response.status).toBe(200);
        expect(response.body.data.createUser.name).toBe('GraphQL User');
        expect(response.body.data.createUser.email).toBe('gql@mycodeyatra.com');
    });
});
