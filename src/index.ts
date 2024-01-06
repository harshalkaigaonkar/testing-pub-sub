import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createClient } from 'redis';

dotenv.config();

const redis_url = "redis://default:tnvrtGiMb1tvm8Pj7ML7SV2W3kEu5Ue3@redis-14001.c325.us-east-1-4.ec2.cloud.redislabs.com:14001"

const app : Express = express();
const port = 3001;
const client = createClient({
  url: redis_url
})
client.connect();

app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.post('/subscribe', async (req: Request, res: Response) => {
  await client.subscribe("channel", (message, channel) => {
    console.log('subscribed to channel', message, channel)
  })
  res.send("done")
})
app.post('/publish', async (req: Request, res: Response) => {
const publisher = client.duplicate();
await publisher.connect();
  await publisher.publish("channel", "{Hello}");
  res.send("done")
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});