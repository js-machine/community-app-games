export abstract class GameRepository {
    public abstract saveGameResults(userId: number, score: number, question: number): Promise<boolean>;
}
