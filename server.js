import express from 'express';
import { router as indexRouter } from './routes/index';

const app = express();
const port = process.env.PORT || 5000;

app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
