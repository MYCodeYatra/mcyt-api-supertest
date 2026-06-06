import request from 'supertest';

describe('Authentication & Authorization', () => {
    const API_URL = 'http://localhost:8080';
    let jwtToken: string;

    it('1. Basic Authentication', async () => {
        // SuperTest has built-in support for Basic Auth
        const response = await request(API_URL)
            .get('/api/auth/basic')
            .auth('admin', 'admin'); // Pass username and password

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Basic Auth successful');
    });

    it('2. Generate JWT Token (Login)', async () => {
        const payload = {
            email: 'admin@mycodeyatra.com',
            password: 'password123'
        };

        const response = await request(API_URL)
            .post('/api/auth/login')
            .send(payload);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        
        // Save the Bearer Token for the next test
        jwtToken = response.body.token;
    });

    it('3. Access Protected Route with Bearer Token', async () => {
        const response = await request(API_URL)
            .get('/api/auth/profile')
            .set('Authorization', `Bearer ${jwtToken}`); // Manually set header

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Welcome to your protected profile!');
        expect(response.body.user.email).toBe('admin@mycodeyatra.com');
    });

    it('4. Fail accessing Protected Route without Token', async () => {
        const response = await request(API_URL).get('/api/auth/profile');
        
        expect(response.status).toBe(401);
        expect(response.body.error).toBe('Missing token');
    });
});
