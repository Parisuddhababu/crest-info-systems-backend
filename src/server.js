const app = require('./app');
const config = require('./config');
const connectDB = require('./config/db');

const start = async () => {
  try {
    await connectDB();
    app.listen(config.port, () => {
      console.log(`Server running on http://localhost:${config.port}`);
    });
  } catch (err) {
    console.error('Failed to start:', err);
    process.exit(1);
  }
};

start();
