import puppeteer from 'puppeteer-extra';
import createPuppeteerStealth from 'puppeteer-extra-plugin-stealth';

puppeteer.use(createPuppeteerStealth());

export const setupBrowserInstance = async () => {
  const browserSetup = await puppeteer.launch({
    headless: false,
    targetFilter: (target) => target.type() !== 'other',
  });

  return (await browserSetup.pages())[0];
};
