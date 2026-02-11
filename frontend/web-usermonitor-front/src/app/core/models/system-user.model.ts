export interface SystemUser {
  uid: number;
  username: string;
  connection: string; // tty1 ou IP
  procCount: number;
  loginTime: string;
  status: 'active' | 'idle';
  isExpanded?: boolean; 
}