import express  from 'express';
import cors from 'cors';
import Router from './routes/router';
import { errorHandler } from './middleware/error-handler';


function createApplication() {
  
  const app = express();

  app.use(express.json());
  app.use("/api", Router);

  app.use(cors());
  app.use(errorHandler);

  return app;

}

export default createApplication;