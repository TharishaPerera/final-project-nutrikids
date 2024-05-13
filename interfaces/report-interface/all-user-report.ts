
/**
 * All user report Interface
 */
export interface AllUserReportInterface {
    name: string | null | undefined;
    email: string | null | undefined;
    telephone?: string | null | undefined;
    isTwoFactorEnabled?: boolean;
    subscription?: any;
    userRole?: { role: string };
    emailVerified?: Date | null | undefined;
    createdAt: Date;
  }
  