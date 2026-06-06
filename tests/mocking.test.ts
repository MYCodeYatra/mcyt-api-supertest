import request from 'supertest';
import express from 'express';
import axios from 'axios';

// 1. Tell Jest to intercept all calls to the 'axios' module
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// 2. Build a dummy Express app that acts as an API Gateway making external HTTP calls
const app = express();
app.get('/api/weather', async (req, res) => {
    try {
        // In reality, this would hit a live third-party service
        const response = await axios.get('https://api.weather.com/v1/current');
        res.json({ source: 'WeatherAPI', data: response.data });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather' });
    }
});

describe('Mocking Axios / Fetch Requests', () => {

    beforeEach(() => {
        // Clear mock counters before every test
        jest.clearAllMocks();
    });

    it('1. Mock a successful Axios GET request', async () => {
        // Provide the fake response data that Axios will return when called
        const fakeWeatherResponse = { data: { temperature: 72, condition: 'Sunny' } };
        mockedAxios.get.mockResolvedValueOnce(fakeWeatherResponse);

        // Run SuperTest against our app (which triggers the mocked Axios call)
        const response = await request(app).get('/api/weather');

        expect(response.status).toBe(200);
        expect(response.body.data.temperature).toBe(72);
        expect(response.body.data.condition).toBe('Sunny');
        
        // Assert that the app actually attempted to call the correct external URL
        expect(mockedAxios.get).toHaveBeenCalledWith('https://api.weather.com/v1/current');
        expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });

    it('2. Mock an Axios network failure (500 Server Error)', async () => {
        // Force Axios to throw a network error to simulate the third-party API being down
        mockedAxios.get.mockRejectedValueOnce(new Error('Network Timeout'));

        const response = await request(app).get('/api/weather');

        // Assert our Express app handled the failure gracefully
        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Failed to fetch weather');
    });
});
