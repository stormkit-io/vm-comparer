export interface VmSpec {
  name: string;
  vcpus: number;
  memory: string;
  storage: string;
  bandwidth: string;
  pricePerMonth: number;
  pricePerHour?: number;
}

export interface ProviderPricing {
  provider: string;
  lastUpdated: Date;
  plans: VmSpec[];
}
