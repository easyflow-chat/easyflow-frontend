export type UserType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  name: string;
  bio?: string;
  publicKey: string;
  privateKey: string;
  iv: string;
  salt: string;
};
