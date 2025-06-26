import type { IncomingMessage } from "node:http";
import { PricingService } from "./_utils/services/pricing-service";

const pricingService = new PricingService();

export default async (req: IncomingMessage) => {
  const url = new URL(req.url || "", `http://${req.headers.host}`);
  const path = url.pathname;

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

  // Get specific provider pricing
  if (path.startsWith("/api/pricing/") && req.method === "GET") {
    const provider = path.split("/")[3];
    try {
      const pricing = await pricingService.getProviderPricing(provider);
      if (!pricing) {
        return {
          body: { error: "Provider not found or failed to fetch data" },
          status: 404,
        };
      }
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
  }

  // 404 for unmatched routes
  return {
    body: { error: "Not found" },
    status: 404,
  };
};
