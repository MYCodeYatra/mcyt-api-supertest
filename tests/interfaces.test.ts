import request from 'supertest';

// Define the TypeScript Interface for our Payload
interface UserPayload {
    name: string;
    email: string;
    role: 'Admin' | 'User' | 'SuperAdmin'; // Strict literal types
    age?: number; // Optional field
}

describe('TypeScript Interfaces for Payloads', () => {
    const API_URL = 'http://localhost:8080';

    it('should strongly type the request payload', async () => {
        // TypeScript enforces the structure of this payload!
        const newAdmin: UserPayload = {
            name: 'John Doe',
            email: 'john@example.com',
            role: 'Admin'
        };

        const response = await request(API_URL)
            .post('/api/users')
            .send(newAdmin);

        expect(response.status).toBe(201);
        expect(response.body.name).toBe(newAdmin.name);
    });
});
