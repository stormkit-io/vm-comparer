import { DigitalOceanScraper } from "../scrapers/digitalocean";
import type { ProviderPricing } from "../types/pricing";

export class PricingService {
  private digitalOceanScraper = new DigitalOceanScraper();

  async getAllProviderPricing(): Promise<ProviderPricing[]> {
    const results: ProviderPricing[] = [];
    const scrapers = [
      {
        name: "DigitalOcean",
        scraper: () => this.digitalOceanScraper.scrapeDropletPricing(),
      },
    ];

    await Promise.allSettled(
      scrapers.map(async ({ name, scraper }) => {
        try {
          const pricing = await scraper();
          results.push(pricing);
        } catch (error) {
          console.error(`Failed to get ${name} pricing:`, error);
        }
      })
    );

    return results;
  }

  async getProviderPricing(provider: string): Promise<ProviderPricing | null> {
    switch (provider.toLowerCase()) {
      case "digitalocean":
        try {
          return await this.digitalOceanScraper.scrapeDropletPricing();
        } catch (error) {
          console.error("Failed to get DigitalOcean pricing:", error);
          return null;
        }
      default:
        throw new Error(`Provider ${provider} not supported`);
    }
  }
}
