export interface Process {
    pid: number;
    name: string;
    cpu: number;
    mem: number;
    isZombie: boolean;
}
