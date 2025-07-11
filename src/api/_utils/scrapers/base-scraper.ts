import { Browser, Page, chromium } from "playwright-core";

export abstract class BaseScraper {
  protected browser: Browser | null = null;

  protected async initBrowser(): Promise<Browser> {
    if (!this.browser) {
      const ws = process.env.PLAYWRIGHT_WS_ENDPOINT;

      if (!ws) {
        console.error("Missing PLAYWRIGHT_WS_ENDPOINT environment variable.");
        process.exit(-1);
      }

      // Connect to an existing browser instance via WebSocket
      this.browser = await chromium.connect(ws);
    }

    return this.browser;
  }

  protected async createPage(): Promise<Page> {
    const browser = await this.initBrowser();
    const page = await browser.newPage();

    // Set viewport and user agent
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.setExtraHTTPHeaders({
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    });

    return page;
  }

  protected async closeBrowser(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  protected extractPrice(priceText: string): number {
    const match = priceText.match(/\$?(\d+(?:\.\d{2})?)/);
    return match ? parseFloat(match[1]) : 0;
  }

  protected extractNumber(text: string): number {
    const match = text.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  }
}
