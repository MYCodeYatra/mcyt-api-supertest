import request from 'supertest';
import { app } from '../src/api';

describe('Generating Test Coverage Reports', () => {
    it('1. Test the status endpoint', async () => {
        const response = await request(app).get('/status');
        expect(response.status).toBe(200);
    });

    it('2. Test the calculate endpoint (Happy Path)', async () => {
        const response = await request(app)
            .post('/calculate')
            .send({ a: 10, b: 5 });
            
        expect(response.status).toBe(200);
        expect(response.body.result).toBe(15);
    });

    // Notice how we DO NOT write a test for the 400 Error (Missing parameters)
    // Jest will flag that line as uncovered in the report!
});
