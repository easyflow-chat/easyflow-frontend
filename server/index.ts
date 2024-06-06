import cookieParser from 'cookie-parser';
import express from 'express';
import next from 'next';

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';

const bootstrap = async (): Promise<void> => {
  // Setup NextJS
  const app = next({ dev });
  const handler = app.getRequestHandler();
  await app.prepare();

  // Setup express
  const server = express();
  server.use(cookieParser());

  // NextJS
  server.use((req, res) => handler(req, res));

  // Start the server
  server.listen(port, () => {
    console.log('Server Ready');
    console.log(`Listening on port: ${port}`);
  });
};

console.log('Starting bootstrap');
void (async (): Promise<void> => {
  try {
    await bootstrap();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
