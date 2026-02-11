// system.model.ts
export interface SystemStats {
  uptime: string;
  loadAvg: [number, number, number]; //
  zombieCount: number;
  cpuUsage: number;
  memory: {
    total: number;
    used: number;
    free: number;
    cached: number;
  };
}
