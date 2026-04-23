import { User } from './user.model';

export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  creatorId: string | Pick<User, '_id' | 'name' | 'email'>;
}
