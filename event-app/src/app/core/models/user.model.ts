export interface User {
  _id: string;
  firstName?: string;
  lastName?: string;
  name: string;
  email: string;
  profession?: string;
  role: 'user' | 'admin';
}
