import { Game } from 'model';

export abstract class GameRepository {
    public abstract saveGameResults(userId: number, score: number, question: number, createdAt: Date): Promise<boolean>;
    public abstract getLastGame(userId: number): Promise<Game>;
    public abstract updateGameSession(updatedAt: Date, userId: number): Promise<boolean>;
}
