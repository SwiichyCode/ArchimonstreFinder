import { Page } from 'puppeteer';

interface IScrapInteraction {
  interactWithButton(selector: string): void;
}

export class ScrapInteraction implements IScrapInteraction {
  selector: string;
  defaultPage: Page;

  constructor(selector: string, defaultPage: Page) {
    this.selector = selector;
    this.defaultPage = defaultPage;
  }

  async interactWithButton() {
    try {
      const button = await this.defaultPage.waitForSelector(this.selector, { timeout: 0 });

      await this.defaultPage.evaluate(() => {
        const button = document.querySelector(this.selector);
        button?.scrollIntoView();
      });

      await button?.evaluate((btn: Element) => (btn as HTMLElement).click());
    } catch (error) {
      console.error('Failed to click the next button:', error);
    }
  }
}
