import { Event } from './event.model';
import { User } from './user.model';

export type ParticipationStatus = 'confirmed' | 'pending' | 'cancelled';

export interface Participation {
  _id: string;
  eventId: string | Event;
  userId: string | Pick<User, '_id' | 'name' | 'email'>;
  status: ParticipationStatus;
}
