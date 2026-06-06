import request from 'supertest';

describe('Jest/SuperTest Setup', () => {
    
    // We can define a dynamic API URL based on Environment Variables
    const API_URL = process.env.API_URL || 'http://localhost:8080';

    beforeAll(() => {
        console.log(`Starting Test Suite against API: ${API_URL}`);
    });

    afterAll(() => {
        console.log('Finished Test Suite.');
    });

    it('should be correctly configured', async () => {
        const response = await request(API_URL).get('/api/health');
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });
});
