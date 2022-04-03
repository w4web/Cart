export interface User {
  id?: any;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  activated?: boolean;
  authorities?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
