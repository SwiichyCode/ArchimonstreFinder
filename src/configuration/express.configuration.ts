import express from 'express';

export const app = express();
export const APPLICATION_PORT = 8080;

export const configMiddleware = async () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};

export const startExpressServer = (port: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    const server = app
      .listen(port, () => {
        resolve();
      })
      .on('error', (err: Error) => {
        reject(err);
      });
  });
};
