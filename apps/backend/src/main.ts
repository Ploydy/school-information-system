import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import courseRoute from './routes/Course';



const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3001;

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

// support parsing of application/json post data
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.use('/course', courseRoute)

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
