import express from 'express';

export const app = express();
app.use(express.json());

app.get('/status', (req, res) => {
    res.json({ up: true });
});

app.post('/calculate', (req, res) => {
    const { a, b } = req.body;
    if (a !== undefined && b !== undefined) {
        return res.json({ result: a + b });
    }
    // If a test doesn't omit 'a' or 'b', this line will show up as uncovered!
    return res.status(400).json({ error: 'Missing parameters' });
});
