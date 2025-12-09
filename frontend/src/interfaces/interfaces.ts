export interface UserInterface {
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  id: number;
}

export interface UserLoginInterface {
  email: string;
  password: string;
}

export interface UserWithPasswordInterface extends UserInterface {
  password: string;
}

export interface UserScoreInterface extends UserInterface {
  scores: ScoreInterface[];
}

export interface GameInterface {
  title: string;
  description: string;
  id: number;
}

export interface ScoreInterface {
  id: number;
  gameId: number;
  userId: number;
  durationMinutes: number;
  startedAt: string;
  stoppedAt: string;
  createdAt: string;
  game: GameInterface;
}
