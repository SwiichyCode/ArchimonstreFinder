import { app, APPLICATION_PORT, configMiddleware, startExpressServer } from './configuration/express.configuration';
import { ArchimonstreService } from './services/archimonstre.service';
import { setupArchimonstreController } from './controllers/archimonstre.controller';
import { ScrapArchimonstre } from './use-cases/scrap-archimonstre';
import { setupBrowserInstance } from './configuration/puppeteer.configuration';

const setupApplication = async () => {
  const scrapArchimonstre = new ScrapArchimonstre(setupBrowserInstance());

  const archimonstreService = new ArchimonstreService(scrapArchimonstre);

  setupArchimonstreController(archimonstreService);

  await configMiddleware();
  await startExpressServer(APPLICATION_PORT);
};

setupApplication().then(() => {
  app.get('/', async (_, res) => {
    res.send(`Server running on port ${APPLICATION_PORT}`);
  });
});
