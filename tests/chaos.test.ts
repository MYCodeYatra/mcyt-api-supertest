import request from 'supertest';

describe('Handling Request Timeouts & Chaos Testing', () => {
    const API_URL = 'http://localhost:8080';

    it('1. Simulate a Timeout Exception', async () => {
        // The mock server will delay this response by 3000ms.
        // We instruct SuperTest to abort the connection if it takes longer than 1000ms.
        try {
            await request(API_URL)
                .get('/api/chaos/delay?ms=3000')
                .timeout({
                    response: 1000, // Wait max 1000ms for the server to start sending
                    deadline: 1500  // Wait max 1500ms for the entire connection
                });
                
            // If the code reaches here, the timeout failed!
            throw new Error('Test failed: The timeout did not trigger');
        } catch (error: any) {
            // Assert that SuperTest correctly threw a timeout exception
            expect(error.message).toMatch(/timeout/i);
            expect(error.code).toBe('ECONNABORTED');
        }
    });

    it('2. Asserting against unexpected Content-Types (XML)', async () => {
        // Many APIs accidentally return XML or HTML instead of JSON during server errors (e.g. Nginx 502 pages).
        const response = await request(API_URL).get('/api/chaos/xml');

        expect(response.status).toBe(200);
        
        // Assert that the server sent XML instead of the expected JSON
        expect(response.headers['content-type']).toContain('application/xml');
        
        // SuperTest won't parse XML automatically into response.body
        // We have to parse response.text manually!
        expect(response.text).toContain('<name>Alice</name>');
    });
});
