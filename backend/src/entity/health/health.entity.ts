export interface HealthResponse {
  status: "UP" | "DOWN";
  timestamp: string;
  environment: string;
  version: string;
  uptime: number;
  mongodb: {
    status: "UP" | "DOWN";
  };
  memory: {
    rss: string;
    heapTotal: string;
    heapUsed: string;
  };
  system: {
    cpuCount: number;
    totalMemory: string;
    freeMemory: string;
  };
}