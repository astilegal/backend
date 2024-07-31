const express = require('express');
const cors = require('cors');
const { XataClient } = require('@xata.io/client');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Initialize Xata client
const xata = new XataClient({
  databaseURL: process.env.XATA_DATABASE_URL,
  apiKey: process.env.XATA_API_KEY
});

// Endpoint to increment the view count
app.post('/increment', async (req, res) => {
  try {
    const record = await xata.db.views.filter({ id: 1 }).getFirst();
    if (record) {
      const updatedRecord = await xata.db.views.update(record.id, {
        count: record.count + 1
      });
      res.json({ count: updatedRecord.count });
    } else {
      const newRecord = await xata.db.views.create({ id: 1, count: 1 });
      res.json({ count: newRecord.count });
    }
  } catch (error) {
    console.error('Error updating view count:', error);
    res.status(500).send('Server error');
  }
});

// Endpoint to get the current view count
app.get('/count', async (req, res) => {
  try {
    const record = await xata.db.views.filter({ id: 1 }).getFirst();
    if (record) {
      res.json({ count: record.count });
    } else {
      res.json({ count: 0 });
    }
  } catch (error) {
    console.error('Error retrieving view count:', error);
    res.status(500).send('Server error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
