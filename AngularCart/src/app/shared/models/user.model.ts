export interface User {
  id?: any;
  profileImage?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  verified?: boolean;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
