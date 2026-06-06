import WebSocket from 'ws';

describe('Testing WebSocket Connections', () => {
    const WS_URL = 'ws://localhost:8080/ws/chat';
    let ws: WebSocket;

    beforeEach((done) => {
        ws = new WebSocket(WS_URL);
        ws.on('open', done);
    });

    afterEach((done) => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.close();
        }
        done();
    });

    it('1. Connect to WebSocket and receive welcome message', (done) => {
        ws.on('message', (data) => {
            const parsed = JSON.parse(data.toString());
            expect(parsed.type).toBe('welcome');
            expect(parsed.message).toBe('Connected to Mock Chat Server!');
            done();
        });
    });

    it('2. Send Message and receive Echo', (done) => {
        // We expect the server to send the 'welcome' message first,
        // so we ignore the first message and assert on the second.
        let messageCount = 0;

        ws.on('message', (data) => {
            messageCount++;
            if (messageCount === 2) {
                const parsed = JSON.parse(data.toString());
                expect(parsed.type).toBe('echo');
                expect(parsed).toHaveProperty('timestamp');
                expect(JSON.parse(parsed.data).action).toBe('ping');
                done();
            }
        });

        // Send the ping
        ws.send(JSON.stringify({ action: 'ping' }));
    });
});
