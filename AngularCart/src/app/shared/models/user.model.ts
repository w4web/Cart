export interface User {
  id?: any;
  profileImage?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  activated?: boolean;
  authorities?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
