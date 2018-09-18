import { Game } from '../../model';

export abstract class GameRepository {
    public abstract saveGameResults(userId: number, score: number, question: number): Promise<boolean>;
    public abstract getLastGame(userId: number): Promise<Game>;
}
