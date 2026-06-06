import request from 'supertest';

describe('Introduction to SuperTest', () => {
    // The base URL of our local Mock Server
    const API_URL = 'http://localhost:8080';

    it('should fetch the health status of the API', async () => {
        const response = await request(API_URL).get('/api/health');

        // Assert the HTTP Status Code
        expect(response.status).toBe(200);

        // Assert the Response Body
        expect(response.body).toHaveProperty('status', 'OK');
        expect(response.body).toHaveProperty('uptime');
    });

    it('should fail when accessing an invalid endpoint', async () => {
        const response = await request(API_URL).get('/api/invalid-endpoint');

        // Assert that we get a 404 Not Found
        expect(response.status).toBe(404);
    });
});
