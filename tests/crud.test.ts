import request from 'supertest';

describe('CRUD Operations with SuperTest', () => {
    const API_URL = 'http://localhost:8080';
    let userId: string;

    it('1. CREATE (POST) a new user', async () => {
        const payload = {
            name: 'Pankaj Kumar',
            email: 'pankaj@mycodeyatra.com',
            role: 'Admin'
        };

        const response = await request(API_URL)
            .post('/api/users')
            .send(payload)
            .set('Accept', 'application/json');

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe(payload.name);
        
        // Save ID for next tests
        userId = response.body.id;
    });

    it('2. READ (GET) the created user', async () => {
        const response = await request(API_URL)
            .get(`/api/users/${userId}`)
            .set('Accept', 'application/json');

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(userId);
        expect(response.body.name).toBe('Pankaj Kumar');
    });

    it('3. UPDATE (PUT) the user', async () => {
        const updatedPayload = {
            name: 'Pankaj (Updated)',
            email: 'pankaj@mycodeyatra.com',
            role: 'SuperAdmin'
        };

        const response = await request(API_URL)
            .put(`/api/users/${userId}`)
            .send(updatedPayload)
            .set('Accept', 'application/json');

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Pankaj (Updated)');
        expect(response.body.role).toBe('SuperAdmin');
    });

    it('4. DELETE the user', async () => {
        const response = await request(API_URL)
            .delete(`/api/users/${userId}`);

        expect(response.status).toBe(200); // Mock Server returns 200
    });

    it('5. Verify user is DELETED (GET)', async () => {
        const response = await request(API_URL)
            .get(`/api/users/${userId}`);

        expect(response.status).toBe(404);
    });
});
