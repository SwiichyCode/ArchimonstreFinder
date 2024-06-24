import { Page } from 'puppeteer';
import { processData } from './process.data';
import { prisma } from '../configuration/prisma.configuration';
import type { Archimonstre } from '../models/archimonstre.model';
import { ScrapInteraction } from './scrap-interaction';

//http://localhost:8080/archimonstre/scrap

export class ScrapArchimonstre {
  setupBrowserInstance: Promise<Page>;
  archimonstres: Archimonstre[];
  pageNumber: number;

  constructor(setupBrowserInstance: Promise<Page>) {
    this.setupBrowserInstance = setupBrowserInstance;
    this.archimonstres = [];
    this.pageNumber = 21;
  }

  async execute() {
    const defaultPage = await this.setupBrowserInstance;

    await this.navigateToPage(defaultPage);

    for (let i = 0; i < this.pageNumber; i++) {
      await this.waitForTableToLoad(defaultPage);

      const data = await this.scrapeCurrentPage(defaultPage);

      await this.processAndStoreData(data);

      await this.navigateToNextPage(defaultPage);
    }

    await this.closePage(defaultPage);
  }

  async navigateToPage(page: Page) {
    await page.goto(
      'https://www.vulbis.com/?server=Draconiros&gids=&percent=0&craftableonly=false&select-type=85&sellchoice=false&buyqty=1&sellqty=1&percentsell=0',
    );
  }

  async waitForTableToLoad(page: Page) {
    await page.waitForSelector('#scanTable', { timeout: 0 });
    await page.waitForSelector('#scanTable tbody', { timeout: 0 });
    await page.waitForFunction(
      () => document.querySelector('#scanTable tbody') && document.querySelectorAll('#scanTable tbody tr').length > 2,
      { timeout: 0 },
    );
  }

  async scrapeCurrentPage(page: Page) {
    return await page.$$eval('#scanTable tbody tr', (rows) => {
      return rows.map((row) => {
        const cells = Array.from(row.querySelectorAll('td'));
        return cells.map((cell) => ({
          search: cell.getAttribute('data-search'),
          order: cell.getAttribute('data-order'),
        }));
      });
    });
  }

  async processAndStoreData(data: any[]) {
    const processedData = processData(data);

    processedData.map(
      async (item) =>
        await prisma.archimonstre.create({
          data: {
            search: item.search,
            order: item.order,
          },
        }),
    );
  }

  async navigateToNextPage(page: Page) {
    await new ScrapInteraction('#scanTable_next', page).interactWithButton();
  }

  async closePage(page: Page) {
    await page.close();
  }
}
