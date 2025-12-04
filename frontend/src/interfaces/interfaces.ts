export interface UserInterface {
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
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
}

export interface ScoreInterface {
  gameId: number;
  userId: number;
  durationMinutes: number;
}
