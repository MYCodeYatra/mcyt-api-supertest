import request from 'supertest';

describe('Handling Async/Await & Promises', () => {
    const API_URL = 'http://localhost:8080';

    it('1. Traditional Promises (The Old Way)', () => {
        // We MUST return the Promise in Jest if we don't use async/await
        return request(API_URL)
            .get('/api/health')
            .then(response => {
                expect(response.status).toBe(200);
            })
            .catch(error => {
                throw error;
            });
    });

    it('2. Modern Async/Await (The New Way)', async () => {
        // Notice the 'async' keyword in the function signature!
        try {
            const response = await request(API_URL).get('/api/health');
            expect(response.status).toBe(200);
        } catch (error) {
            console.error('API Request failed', error);
            throw error;
        }
    });

    it('3. Parallel Requests with Promise.all', async () => {
        // Fire multiple API requests simultaneously
        const request1 = request(API_URL).get('/api/health');
        const request2 = request(API_URL).get('/api/users');
        
        // Wait for both to complete
        const [healthResponse, usersResponse] = await Promise.all([request1, request2]);
        
        expect(healthResponse.status).toBe(200);
        expect(usersResponse.status).toBe(200);
    });
});
