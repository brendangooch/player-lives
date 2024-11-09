/**
 * stores and manages the number of lives of each player in a game
 */

type tLivesObject = { id: number; lives: number };

export class PlayerLives {

    private lives: tLivesObject[] = [];

    public get numRemaining(): number {
        return this.remaining.length;
    }

    public get numEliminated(): number {
        return this.eliminated.length;
    }

    public get remaining(): number[] {
        return this.lives.filter(obj => obj.lives > 0).map(obj => obj.id);
    }

    public get eliminated(): number[] {
        return this.lives.filter(obj => obj.lives <= 0).map(obj => obj.id);
    }

    public get leaders(): number[] {
        return this.lives.filter(obj => obj.lives === this.highestNumLives).map(obj => obj.id);
    }

    public get highestNumLives(): number {
        return (this.lives.length === 0 || this.numEliminated === this.lives.length) ? 0 : Math.max(...this.lives.map(obj => obj.lives));
    }

    public start(numPlayers: number, numLives: number): void {
        this.lives.length = 0;
        for (let id = 1; id <= numPlayers; id++) {
            this.lives.push({ id: id, lives: numLives });
        }
    }

    public save(): string {
        return JSON.stringify({
            lives: this.lives
        });
    }

    public load(json: string): boolean {
        const state = JSON.parse(json);
        if (state.lives === undefined) return false;
        this.lives = state.lives;
        return true;
    }

    public livesRemaining(id: number): number {
        const obj = this.getObjByPlayerID(id);
        if (!obj || obj.lives <= 0) return 0;
        return obj.lives;
    }

    public playerEliminated(id: number): boolean {
        return this.livesRemaining(id) === 0;
    }

    public loseLife(id: number): void {
        const obj = this.getObjByPlayerID(id);
        if (obj) obj.lives--;
    }

    public loseLives(id: number, numLives: number): void {
        for (let i = 0; i < numLives; i++) {
            this.loseLife(id);
        }
    }


    private getObjByPlayerID(id: number): tLivesObject | null {
        const obj = this.lives.find(obj => obj.id === id);
        return (obj) ? obj : null;
    }

}