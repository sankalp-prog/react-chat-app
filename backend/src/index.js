import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import db from './lib/db.js';
import messageRoutes from './routes/message.route.js';
import testRoutes from './routes/test.route.js';

dotenv.config();
const app = express();
db.connect();

console.log('index.js ' + process.env.PORT);

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);
// Testing route: pgAdmin keeps bugging out so need to see the db in another way
app.use('/api/test', testRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
