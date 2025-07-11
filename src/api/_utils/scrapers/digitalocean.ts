import type { ProviderPricing } from "../types/pricing";
import { BaseScraper } from "./base-scraper";

export class DigitalOceanScraper extends BaseScraper {
  private static readonly BASE_URL =
    "https://www.digitalocean.com/pricing/droplets";

  async scrapeDropletPricing(): Promise<ProviderPricing> {
    let page;

    try {
      page = await this.createPage();

      // Navigate to pricing page
      await page.goto(DigitalOceanScraper.BASE_URL, {
        timeout: 30000,
      });

      // Wait for pricing content to load
      await page.waitForSelector("#basic-droplets", {
        timeout: 10000,
      });

      // Extract pricing data
      const plans = await page.evaluate(() => {
        const basicDroplets = document.querySelectorAll(
          "#basic-droplets tbody tr"
        );

        const results: any[] = [];

        const basicDropletsMap = [
          { selector: "td:first-child", name: "Memory", prop: "memory" },
          { selector: "td:nth-child(2)", name: "vCPU", prop: "vcpu" },
          { selector: "td:nth-child(3)", name: "Bandwidth", prop: "bandwidth" },
          { selector: "td:nth-child(4)", name: "Storage", prop: "storage" },
          {
            selector: "td:nth-child(5)",
            name: "Price per hour",
            prop: "pricePerHour",
          },
          {
            selector: "td:nth-child(6)",
            name: "Price per month",
            prop: "pricePerMonth",
          },
        ];

        basicDroplets.forEach((basicDropletRow) => {
          const row: Record<string, string> = {};

          basicDropletsMap.forEach(({ selector, prop }) => {
            const element = basicDropletRow.querySelector(selector);

            if (element) {
              const text = element.textContent?.trim() || "";
              row[prop] = text;
            }
          });

          results.push(row);
        });

        return results;
      });

      return {
        provider: "DigitalOcean",
        lastUpdated: new Date(),
        plans,
      };
    } catch (error) {
      console.error("Error scraping DigitalOcean:", error);
      throw new Error("Failed to scrape DigitalOcean pricing");
    } finally {
      if (page) {
        await page.close();
      }
      await this.closeBrowser();
    }
  }
}
