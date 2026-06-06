import request from 'supertest';

describe('Setting up Global Setup & Teardown Hooks', () => {
    const API_URL = 'http://localhost:8080';
    let dbConnectionId: string;

    // 1. beforeAll: Runs EXACTLY ONCE before any tests in this file execute.
    // Perfect for: Database connections, generating global auth tokens.
    beforeAll(async () => {
        // Simulate an expensive database connection or auth login
        dbConnectionId = 'mock_db_12345';
        console.log(`[Hooks] beforeAll: Connected to DB (${dbConnectionId})`);
    });

    // 2. beforeEach: Runs BEFORE EVERY SINGLE test execution.
    // Perfect for: Resetting state, clearing caches, or generating fresh test data.
    beforeEach(() => {
        console.log('[Hooks] beforeEach: Resetting mock cache for the next test...');
    });

    it('1. Execute Test A', async () => {
        console.log('[Hooks] Executing Test A');
        const response = await request(API_URL).get('/api/health');
        expect(response.status).toBe(200);
        expect(dbConnectionId).toBe('mock_db_12345'); // Assert state inherited from beforeAll
    });

    it('2. Execute Test B', async () => {
        console.log('[Hooks] Executing Test B');
        const response = await request(API_URL).get('/api/health');
        expect(response.status).toBe(200);
    });

    // 3. afterEach: Runs AFTER EVERY SINGLE test execution.
    // Perfect for: Deleting specific artifacts created by a specific test.
    afterEach(() => {
        console.log('[Hooks] afterEach: Cleaning up test-specific data...');
    });

    // 4. afterAll: Runs EXACTLY ONCE after all tests in this file have finished.
    // Perfect for: Closing database connections, destroying WebSockets, killing processes.
    afterAll(() => {
        dbConnectionId = '';
        console.log('[Hooks] afterAll: Disconnected from DB. Teardown complete.');
    });
});
