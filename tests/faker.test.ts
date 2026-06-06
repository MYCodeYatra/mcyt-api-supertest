import request from 'supertest';
import { faker } from '@faker-js/faker';

describe('Integrating Faker.js for Test Data', () => {
    const API_URL = 'http://localhost:8080';

    it('1. Create a user with dynamically generated data', async () => {
        // Generate completely random data for each test execution!
        const randomPayload = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            role: faker.helpers.arrayElement(['admin', 'user'])
        };

        const response = await request(API_URL)
            .post('/api/users')
            .send(randomPayload);

        expect(response.status).toBe(201);
        
        // We assert that the server successfully saved our dynamically generated values!
        expect(response.body.name).toBe(randomPayload.name);
        expect(response.body.email).toBe(randomPayload.email);
        expect(response.body.role).toBe(randomPayload.role);
    });

    it('2. Run data-driven loops with Faker', async () => {
        // We can instantly seed our mock server with 5 entirely unique users
        const usersToCreate = 5;
        
        for (let i = 0; i < usersToCreate; i++) {
            const payload = {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                role: 'user'
            };

            const response = await request(API_URL)
                .post('/api/users')
                .send(payload);

            expect(response.status).toBe(201);
        }
    });
});
