import request from 'supertest';
import path from 'path';
import fs from 'fs';

describe('Testing File Uploads & Downloads', () => {
    const API_URL = 'http://localhost:8080';

    it('1. Upload a File (multipart/form-data)', async () => {
        const filePath = path.join(__dirname, 'test-file.txt');
        
        // SuperTest's .attach() method automatically sets Content-Type to multipart/form-data
        const response = await request(API_URL)
            .post('/api/files/upload')
            .attach('file', filePath);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('File uploaded successfully');
        expect(response.body.file).toHaveProperty('originalname', 'test-file.txt');
    });

    it('2. Download a File and verify contents', async () => {
        // When downloading files, we must instruct SuperTest to parse the binary buffer correctly
        const response = await request(API_URL)
            .get('/api/files/download')
            .responseType('blob'); // Ensure it handles binary/text payloads rather than JSON

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toContain('text/csv');
        expect(response.headers['content-disposition']).toContain('attachment; filename="dummy_data.csv"');
        
        // Assert the actual file contents match what we expect
        const fileContents = response.body.toString('utf-8');
        expect(fileContents).toContain('Alice,Admin');
    });
});
