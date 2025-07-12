import type { IncomingMessage } from "node:http";
import { PricingService } from "./_utils/services/pricing-service";

const pricingService = new PricingService();

export default async (req: IncomingMessage) => {
  try {
    const pricing = await pricingService.getAllProviderPricing();
    return {
      body: { pricing },
      status: 200,
    };
  } catch (error) {
    return {
      body: { error: "Failed to fetch pricing data" },
      status: 500,
    };
  }
};
