import { app } from '../configuration/express.configuration';
import type { Request, Response, NextFunction } from 'express';
import type { ArchimonstreService } from '../services/archimonstre.service';

export const setupArchimonstreController = (archimonstreService: ArchimonstreService) => {
  app.get('/archimonstre', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const archimonstres = await archimonstreService.getArchimonstres();
      res.status(200).json(archimonstres);
    } catch (error) {
      console.error(error);
    }
  });

  app.get('/archimonstre/scrap', async (req: Request, res: Response, next: NextFunction) => {
    try {
      await archimonstreService.startArchimonstreScrap();
      res.status(200).send('Scrap done');
    } catch (error) {
      console.error(error);
    }
  });

  app.get('/archimonstre/total', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const totalPrices = await archimonstreService.getCurrentTotalPrices();
      res.status(200).json({ totalPrices });
    } catch (error) {
      console.error(error);
    }
  });
};
