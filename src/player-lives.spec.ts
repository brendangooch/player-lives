/**
 * 
 */

import * as EXPECT from '@brendangooch/jest-expect';
import { PlayerLives } from './player-lives.js';

let lives: PlayerLives;
beforeEach(() => {
    lives = new PlayerLives();
});

testAll();
function testAll(): void {
    describe('PlayerLives', () => {

        testDoesNotContainAnyLivesDataUntilStartMethodCalled();
        testCallingStartResetsObject();
        testAllPlayersRemainOnStart();
        testReturnsCorrectRemainingPlayersAndNumberOfRemainingPlayers();
        testNoPlayersEliminatedOnStart();
        testReturnsCorrectEliminatedPlayersAndNumberOfEliminatedPlayers();
        testAllPlayersInTheLeadAfterStart();
        testReturnsCorrectLeaders();
        testHighestNumberOfLivesIsNumLivesParamPassedOnStart();
        testReturnsTheCorrectHighestNumberOfLives();
        testHighestNumLivesIs0IfAllPlayersEliminated();
        testValidLoadReturnsTrue();
        testInvalidLoadReturnsFalse();
        testMethodsOutputTheSameDataAfterLoadThenSave();
        testEachPlayerHasFullLivesOnStart();
        testReturnsTheCorrectNumberOfLivesRemainingForEachPlayer();
        testLowestLivesRemainingIs0CannotBeNegative();
        testNoPlayerEliminatedOnStart();
        testKnowsWhenAPlayerHasBeenEliminated();
        testRemovesLifeFromCorrectPlayer();
        testRemovesMultipleLivesFromCorrectPlayer();
        testCorrectlyIdentifiesWhenTheGameIsOver();
        testCorrectlyIdentifiesTheWinner();

    });
}

function testDoesNotContainAnyLivesDataUntilStartMethodCalled(): void {
    test('does not contain any lives data until start() method called', () => {
        EXPECT.toBe(lives.numRemaining, 0);
        EXPECT.toBe(lives.numEliminated, 0);
        EXPECT.toBe(lives.highestNumLives, 0);
        EXPECT.toBe(lives.livesRemaining(1), 0);
        EXPECT.toBeSameArray<number>(lives.remaining, []);
        EXPECT.toBeSameArray<number>(lives.eliminated, []);
        EXPECT.toBeSameArray<number>(lives.leaders, []);
    });
}

function testCallingStartResetsObject(): void {
    test('calling start() resets object', () => {
        lives.start(6, 3);
        lives.loseLives(1, 1);
        lives.loseLives(2, 2);
        lives.loseLives(3, 3);
        EXPECT.toBe(lives.livesRemaining(1), 2);
        EXPECT.toBe(lives.livesRemaining(2), 1);
        EXPECT.toBe(lives.livesRemaining(3), 0);
        lives.start(6, 3);
        EXPECT.toBe(lives.livesRemaining(1), 3);
        EXPECT.toBe(lives.livesRemaining(2), 3);
        EXPECT.toBe(lives.livesRemaining(3), 3);
    });
}

function testAllPlayersRemainOnStart(): void {
    test('all players remain on start', () => {
        lives.start(6, 3);
        EXPECT.toBe(lives.numRemaining, 6);
    });
}

function testReturnsCorrectRemainingPlayersAndNumberOfRemainingPlayers(): void {
    test('returns correct remaining players and number of remaining players', () => {
        lives.start(6, 3);
        EXPECT.toBeSameArray<number>(lives.remaining, [1, 2, 3, 4, 5, 6]);
        EXPECT.toBe(lives.numRemaining, 6);
        lives.loseLives(6, 3);
        EXPECT.toBeSameArray<number>(lives.remaining, [1, 2, 3, 4, 5]);
        EXPECT.toBe(lives.numRemaining, 5);
        lives.loseLives(5, 3);
        EXPECT.toBeSameArray<number>(lives.remaining, [1, 2, 3, 4]);
        EXPECT.toBe(lives.numRemaining, 4);
        lives.loseLives(4, 3);
        EXPECT.toBeSameArray<number>(lives.remaining, [1, 2, 3]);
        EXPECT.toBe(lives.numRemaining, 3);
        lives.loseLives(3, 3);
        EXPECT.toBeSameArray<number>(lives.remaining, [1, 2]);
        EXPECT.toBe(lives.numRemaining, 2);
        lives.loseLives(2, 3);
        EXPECT.toBeSameArray<number>(lives.remaining, [1]);
        EXPECT.toBe(lives.numRemaining, 1);
        lives.loseLives(1, 3);
        EXPECT.toBeSameArray<number>(lives.remaining, []);
        EXPECT.toBe(lives.numRemaining, 0);
    });
}

function testNoPlayersEliminatedOnStart(): void {
    test('no players eliminated on start', () => {
        lives.start(3, 2);
        EXPECT.toBeSameArray(lives.eliminated, []);
        EXPECT.toBe(lives.numEliminated, 0);
    });
}

function testReturnsCorrectEliminatedPlayersAndNumberOfEliminatedPlayers(): void {
    test('returns correct eliminated players and number of eliminated players', () => {
        lives.start(5, 1);
        EXPECT.toBeSameArray(lives.eliminated, []);
        EXPECT.toBe(lives.numEliminated, 0);
        lives.loseLife(1);
        EXPECT.toBeSameArray(lives.eliminated, [1]);
        EXPECT.toBe(lives.numEliminated, 1);
        lives.loseLife(2);
        EXPECT.toBeSameArray(lives.eliminated, [1, 2]);
        EXPECT.toBe(lives.numEliminated, 2);
        lives.loseLife(3);
        EXPECT.toBeSameArray(lives.eliminated, [1, 2, 3]);
        EXPECT.toBe(lives.numEliminated, 3);
        lives.loseLife(4);
        EXPECT.toBeSameArray(lives.eliminated, [1, 2, 3, 4]);
        EXPECT.toBe(lives.numEliminated, 4);
        lives.loseLife(5);
        EXPECT.toBeSameArray(lives.eliminated, [1, 2, 3, 4, 5]);
        EXPECT.toBe(lives.numEliminated, 5);
    });
}

function testAllPlayersInTheLeadAfterStart(): void {
    test('all players in the lead after start', () => {
        lives.start(3, 3);
        EXPECT.toBeSameArray(lives.leaders, [1, 2, 3]);
    });
}

function testReturnsCorrectLeaders(): void {
    test('returns correct leaders', () => {
        lives.start(6, 10);
        EXPECT.toBeSameArray(lives.leaders, [1, 2, 3, 4, 5, 6]);
        lives.loseLife(6);
        EXPECT.toBeSameArray(lives.leaders, [1, 2, 3, 4, 5]);
        lives.loseLife(5);
        EXPECT.toBeSameArray(lives.leaders, [1, 2, 3, 4]);
        lives.loseLife(4);
        EXPECT.toBeSameArray(lives.leaders, [1, 2, 3]);
        lives.loseLife(3);
        EXPECT.toBeSameArray(lives.leaders, [1, 2]);
        lives.loseLife(2);
        EXPECT.toBeSameArray(lives.leaders, [1]);
        lives.loseLife(1);
        EXPECT.toBeSameArray(lives.leaders, [1, 2, 3, 4, 5, 6]);


    });
}

function testHighestNumberOfLivesIsNumLivesParamPassedOnStart(): void {
    test('highest number of lives is numLives param passed on start', () => {
        for (let i = 1; i <= 10; i++) {
            lives.start(6, i);
            EXPECT.toBe(lives.highestNumLives, i);
        }
    });
}

function testReturnsTheCorrectHighestNumberOfLives(): void {
    test('returns the correct highest number of lives', () => {
        lives.start(3, 3);
        lives.loseLife(1);
        lives.loseLife(2);
        EXPECT.toBe(lives.highestNumLives, 3);
        lives.loseLife(1);
        lives.loseLife(2);
        lives.loseLife(3);
        EXPECT.toBe(lives.highestNumLives, 2);
        lives.loseLife(1);
        lives.loseLife(2);
        lives.loseLife(3);
        EXPECT.toBe(lives.highestNumLives, 1);
    });
}

function testHighestNumLivesIs0IfAllPlayersEliminated(): void {
    test('highest number of lives is 0 if all players eliminated', () => {
        lives.start(3, 3);
        lives.loseLives(1, 3);
        lives.loseLives(2, 3);
        lives.loseLives(3, 3);
        EXPECT.toBe(lives.highestNumLives, 0);
    });
}

function testValidLoadReturnsTrue(): void {
    test('valid load returns true', () => {
        EXPECT.truthy(
            lives.load(
                JSON.stringify({
                    lives: [
                        { id: 1, lives: 3 },
                        { id: 2, lives: 3 },
                        { id: 3, lives: 2 }
                    ]
                })
            )
        )
    });
}

function testInvalidLoadReturnsFalse(): void {
    test('invalid load returns false (if missing lives property)', () => {
        EXPECT.falsy(
            lives.load(
                JSON.stringify({
                    foo: {}
                })
            )
        )
    });
}

function testMethodsOutputTheSameDataAfterLoadThenSave(): void {
    test('methods output the same data after load then save', () => {
        lives.start(3, 3);
        lives.load(lives.save()); // <--
        EXPECT.toBeSameArray(lives.remaining, [1, 2, 3]);
        EXPECT.toBeSameArray(lives.eliminated, []);
        lives.loseLives(3, 3);
        lives.load(lives.save()); // <--
        EXPECT.toBeSameArray(lives.remaining, [1, 2]);
        EXPECT.toBeSameArray(lives.eliminated, [3]);
        lives.loseLives(2, 3);
        lives.load(lives.save()); // <--
        EXPECT.toBeSameArray(lives.remaining, [1]);
        EXPECT.toBeSameArray(lives.eliminated, [2, 3]);
        EXPECT.toBe(lives.livesRemaining(1), 3);
        lives.loseLife(1);
        lives.load(lives.save()); // <--
        EXPECT.toBe(lives.livesRemaining(1), 2);
        lives.loseLife(1);
        lives.load(lives.save()); // <--
        EXPECT.toBe(lives.livesRemaining(1), 1);
        lives.loseLife(1);
        lives.load(lives.save()); // <--
        EXPECT.toBe(lives.livesRemaining(1), 0);
        EXPECT.toBeSameArray(lives.remaining, []);
        EXPECT.toBeSameArray(lives.eliminated, [1, 2, 3]);
    });
}

function testEachPlayerHasFullLivesOnStart(): void {
    test('each player has full amount of lives on start', () => {
        for (let i = 1; i <= 5; i++) {
            for (let j = 1; j <= 6; j++) {
                lives.start(6, i);
                EXPECT.toBe(lives.livesRemaining(j), i);
            }
        }
    });
}

function testReturnsTheCorrectNumberOfLivesRemainingForEachPlayer(): void {
    test('returns the correct number of lives remaining for each player', () => {

        lives.start(6, 3);

        EXPECT.toBe(lives.livesRemaining(1), 3);
        EXPECT.toBe(lives.livesRemaining(2), 3);
        EXPECT.toBe(lives.livesRemaining(3), 3);
        EXPECT.toBe(lives.livesRemaining(4), 3);
        EXPECT.toBe(lives.livesRemaining(5), 3);
        EXPECT.toBe(lives.livesRemaining(6), 3);

        lives.loseLife(1);
        EXPECT.toBe(lives.livesRemaining(1), 2);
        EXPECT.toBe(lives.livesRemaining(2), 3);
        EXPECT.toBe(lives.livesRemaining(3), 3);
        EXPECT.toBe(lives.livesRemaining(4), 3);
        EXPECT.toBe(lives.livesRemaining(5), 3);
        EXPECT.toBe(lives.livesRemaining(6), 3);
        lives.loseLife(2);
        EXPECT.toBe(lives.livesRemaining(1), 2);
        EXPECT.toBe(lives.livesRemaining(2), 2);
        EXPECT.toBe(lives.livesRemaining(3), 3);
        EXPECT.toBe(lives.livesRemaining(4), 3);
        EXPECT.toBe(lives.livesRemaining(5), 3);
        EXPECT.toBe(lives.livesRemaining(6), 3);
        lives.loseLife(3);
        EXPECT.toBe(lives.livesRemaining(1), 2);
        EXPECT.toBe(lives.livesRemaining(2), 2);
        EXPECT.toBe(lives.livesRemaining(3), 2);
        EXPECT.toBe(lives.livesRemaining(4), 3);
        EXPECT.toBe(lives.livesRemaining(5), 3);
        EXPECT.toBe(lives.livesRemaining(6), 3);
        lives.loseLife(4);
        EXPECT.toBe(lives.livesRemaining(1), 2);
        EXPECT.toBe(lives.livesRemaining(2), 2);
        EXPECT.toBe(lives.livesRemaining(3), 2);
        EXPECT.toBe(lives.livesRemaining(4), 2);
        EXPECT.toBe(lives.livesRemaining(5), 3);
        EXPECT.toBe(lives.livesRemaining(6), 3);
        lives.loseLife(5);
        EXPECT.toBe(lives.livesRemaining(1), 2);
        EXPECT.toBe(lives.livesRemaining(2), 2);
        EXPECT.toBe(lives.livesRemaining(3), 2);
        EXPECT.toBe(lives.livesRemaining(4), 2);
        EXPECT.toBe(lives.livesRemaining(5), 2);
        EXPECT.toBe(lives.livesRemaining(6), 3);
        lives.loseLife(6);
        EXPECT.toBe(lives.livesRemaining(1), 2);
        EXPECT.toBe(lives.livesRemaining(2), 2);
        EXPECT.toBe(lives.livesRemaining(3), 2);
        EXPECT.toBe(lives.livesRemaining(4), 2);
        EXPECT.toBe(lives.livesRemaining(5), 2);
        EXPECT.toBe(lives.livesRemaining(6), 2);

        lives.loseLife(1);
        EXPECT.toBe(lives.livesRemaining(1), 1);
        EXPECT.toBe(lives.livesRemaining(2), 2);
        EXPECT.toBe(lives.livesRemaining(3), 2);
        EXPECT.toBe(lives.livesRemaining(4), 2);
        EXPECT.toBe(lives.livesRemaining(5), 2);
        EXPECT.toBe(lives.livesRemaining(6), 2);
        lives.loseLife(2);
        EXPECT.toBe(lives.livesRemaining(1), 1);
        EXPECT.toBe(lives.livesRemaining(2), 1);
        EXPECT.toBe(lives.livesRemaining(3), 2);
        EXPECT.toBe(lives.livesRemaining(4), 2);
        EXPECT.toBe(lives.livesRemaining(5), 2);
        EXPECT.toBe(lives.livesRemaining(6), 2);
        lives.loseLife(3);
        EXPECT.toBe(lives.livesRemaining(1), 1);
        EXPECT.toBe(lives.livesRemaining(2), 1);
        EXPECT.toBe(lives.livesRemaining(3), 1);
        EXPECT.toBe(lives.livesRemaining(4), 2);
        EXPECT.toBe(lives.livesRemaining(5), 2);
        EXPECT.toBe(lives.livesRemaining(6), 2);
        lives.loseLife(4);
        EXPECT.toBe(lives.livesRemaining(1), 1);
        EXPECT.toBe(lives.livesRemaining(2), 1);
        EXPECT.toBe(lives.livesRemaining(3), 1);
        EXPECT.toBe(lives.livesRemaining(4), 1);
        EXPECT.toBe(lives.livesRemaining(5), 2);
        EXPECT.toBe(lives.livesRemaining(6), 2);
        lives.loseLife(5);
        EXPECT.toBe(lives.livesRemaining(1), 1);
        EXPECT.toBe(lives.livesRemaining(2), 1);
        EXPECT.toBe(lives.livesRemaining(3), 1);
        EXPECT.toBe(lives.livesRemaining(4), 1);
        EXPECT.toBe(lives.livesRemaining(5), 1);
        EXPECT.toBe(lives.livesRemaining(6), 2);
        lives.loseLife(6);
        EXPECT.toBe(lives.livesRemaining(1), 1);
        EXPECT.toBe(lives.livesRemaining(2), 1);
        EXPECT.toBe(lives.livesRemaining(3), 1);
        EXPECT.toBe(lives.livesRemaining(4), 1);
        EXPECT.toBe(lives.livesRemaining(5), 1);
        EXPECT.toBe(lives.livesRemaining(6), 1);

        lives.loseLife(1);
        EXPECT.toBe(lives.livesRemaining(1), 0);
        EXPECT.toBe(lives.livesRemaining(2), 1);
        EXPECT.toBe(lives.livesRemaining(3), 1);
        EXPECT.toBe(lives.livesRemaining(4), 1);
        EXPECT.toBe(lives.livesRemaining(5), 1);
        EXPECT.toBe(lives.livesRemaining(6), 1);
        lives.loseLife(2);
        EXPECT.toBe(lives.livesRemaining(1), 0);
        EXPECT.toBe(lives.livesRemaining(2), 0);
        EXPECT.toBe(lives.livesRemaining(3), 1);
        EXPECT.toBe(lives.livesRemaining(4), 1);
        EXPECT.toBe(lives.livesRemaining(5), 1);
        EXPECT.toBe(lives.livesRemaining(6), 1);
        lives.loseLife(3);
        EXPECT.toBe(lives.livesRemaining(1), 0);
        EXPECT.toBe(lives.livesRemaining(2), 0);
        EXPECT.toBe(lives.livesRemaining(3), 0);
        EXPECT.toBe(lives.livesRemaining(4), 1);
        EXPECT.toBe(lives.livesRemaining(5), 1);
        EXPECT.toBe(lives.livesRemaining(6), 1);
        lives.loseLife(4);
        EXPECT.toBe(lives.livesRemaining(1), 0);
        EXPECT.toBe(lives.livesRemaining(2), 0);
        EXPECT.toBe(lives.livesRemaining(3), 0);
        EXPECT.toBe(lives.livesRemaining(4), 0);
        EXPECT.toBe(lives.livesRemaining(5), 1);
        EXPECT.toBe(lives.livesRemaining(6), 1);
        lives.loseLife(5);
        EXPECT.toBe(lives.livesRemaining(1), 0);
        EXPECT.toBe(lives.livesRemaining(2), 0);
        EXPECT.toBe(lives.livesRemaining(3), 0);
        EXPECT.toBe(lives.livesRemaining(4), 0);
        EXPECT.toBe(lives.livesRemaining(5), 0);
        EXPECT.toBe(lives.livesRemaining(6), 1);
        lives.loseLife(6);
        EXPECT.toBe(lives.livesRemaining(1), 0);
        EXPECT.toBe(lives.livesRemaining(2), 0);
        EXPECT.toBe(lives.livesRemaining(3), 0);
        EXPECT.toBe(lives.livesRemaining(4), 0);
        EXPECT.toBe(lives.livesRemaining(5), 0);
        EXPECT.toBe(lives.livesRemaining(6), 0);

    });
}

function testLowestLivesRemainingIs0CannotBeNegative(): void {
    test('lowest lives remaining is 0, cannot be negative', () => {
        lives.start(3, 1);
        lives.loseLives(1, 2);
        EXPECT.toBe(lives.livesRemaining(1), 0);
        lives.loseLives(2, 3);
        EXPECT.toBe(lives.livesRemaining(2), 0);
        lives.loseLives(3, 10);
        EXPECT.toBe(lives.livesRemaining(3), 0);
    });
}

function testNoPlayerEliminatedOnStart(): void {
    test('no player is eliminated on start', () => {
        lives.start(6, 3);
        EXPECT.toBe(lives.numEliminated, 0);
        EXPECT.toBeSameArray(lives.eliminated, []);
    });
}

function testKnowsWhenAPlayerHasBeenEliminated(): void {
    test('knows when a player has been eliminated', () => {
        lives.start(6, 5);
        lives.loseLives(1, 5);
        EXPECT.toBeSameArray(lives.eliminated, [1]);
        lives.loseLives(2, 5);
        EXPECT.toBeSameArray(lives.eliminated, [1, 2]);
        lives.loseLives(3, 5);
        EXPECT.toBeSameArray(lives.eliminated, [1, 2, 3]);
        lives.loseLives(4, 5);
        EXPECT.toBeSameArray(lives.eliminated, [1, 2, 3, 4]);
        lives.loseLives(5, 5);
        EXPECT.toBeSameArray(lives.eliminated, [1, 2, 3, 4, 5]);
        lives.loseLives(6, 5);
        EXPECT.toBeSameArray(lives.eliminated, [1, 2, 3, 4, 5, 6]);
    });
}

function testRemovesLifeFromCorrectPlayer(): void {
    test('removes a life from correct player', () => {
        lives.start(3, 3);

        EXPECT.toBe(lives.livesRemaining(1), 3);
        EXPECT.toBe(lives.livesRemaining(2), 3);
        EXPECT.toBe(lives.livesRemaining(3), 3);

        lives.loseLife(1);
        EXPECT.toBe(lives.livesRemaining(1), 2);
        EXPECT.toBe(lives.livesRemaining(2), 3);
        EXPECT.toBe(lives.livesRemaining(3), 3);

        lives.loseLife(1);
        EXPECT.toBe(lives.livesRemaining(1), 1);
        EXPECT.toBe(lives.livesRemaining(2), 3);
        EXPECT.toBe(lives.livesRemaining(3), 3);

        lives.loseLife(1);
        EXPECT.toBe(lives.livesRemaining(1), 0);
        EXPECT.toBe(lives.livesRemaining(2), 3);
        EXPECT.toBe(lives.livesRemaining(3), 3);

        lives.loseLife(2);
        EXPECT.toBe(lives.livesRemaining(1), 0);
        EXPECT.toBe(lives.livesRemaining(2), 2);
        EXPECT.toBe(lives.livesRemaining(3), 3);

        lives.loseLife(2);
        EXPECT.toBe(lives.livesRemaining(1), 0);
        EXPECT.toBe(lives.livesRemaining(2), 1);
        EXPECT.toBe(lives.livesRemaining(3), 3);

        lives.loseLife(2);
        EXPECT.toBe(lives.livesRemaining(1), 0);
        EXPECT.toBe(lives.livesRemaining(2), 0);
        EXPECT.toBe(lives.livesRemaining(3), 3);

        lives.loseLife(3);
        EXPECT.toBe(lives.livesRemaining(1), 0);
        EXPECT.toBe(lives.livesRemaining(2), 0);
        EXPECT.toBe(lives.livesRemaining(3), 2);

        lives.loseLife(3);
        EXPECT.toBe(lives.livesRemaining(1), 0);
        EXPECT.toBe(lives.livesRemaining(2), 0);
        EXPECT.toBe(lives.livesRemaining(3), 1);

        lives.loseLife(3);
        EXPECT.toBe(lives.livesRemaining(1), 0);
        EXPECT.toBe(lives.livesRemaining(2), 0);
        EXPECT.toBe(lives.livesRemaining(3), 0);

    });
}

function testRemovesMultipleLivesFromCorrectPlayer(): void {
    test('removes multiple lives from correct player', () => {

        lives.start(3, 3);

        EXPECT.toBe(lives.livesRemaining(1), 3);
        EXPECT.toBe(lives.livesRemaining(2), 3);
        EXPECT.toBe(lives.livesRemaining(3), 3);

        lives.loseLives(1, 3);
        EXPECT.toBe(lives.livesRemaining(1), 0);
        EXPECT.toBe(lives.livesRemaining(2), 3);
        EXPECT.toBe(lives.livesRemaining(3), 3);

        lives.loseLives(2, 3);
        EXPECT.toBe(lives.livesRemaining(1), 0);
        EXPECT.toBe(lives.livesRemaining(2), 0);
        EXPECT.toBe(lives.livesRemaining(3), 3);

        lives.loseLives(3, 3);
        EXPECT.toBe(lives.livesRemaining(1), 0);
        EXPECT.toBe(lives.livesRemaining(2), 0);
        EXPECT.toBe(lives.livesRemaining(3), 0);

    });
}

function testCorrectlyIdentifiesWhenTheGameIsOver(): void {
    test('correctly identifies when the game is over', () => {

        lives.start(6, 3);

        EXPECT.falsy(lives.isGameOver);

        lives.loseLives(6, 3);
        EXPECT.falsy(lives.isGameOver);

        lives.loseLives(5, 3);
        EXPECT.falsy(lives.isGameOver);

        lives.loseLives(4, 3);
        EXPECT.falsy(lives.isGameOver);

        lives.loseLives(3, 3);
        EXPECT.falsy(lives.isGameOver);

        lives.loseLives(2, 3);
        EXPECT.truthy(lives.isGameOver); // <--

    });
}

function testCorrectlyIdentifiesTheWinner(): void {
    test('correctly identifies the winner', () => {

        lives.start(6, 3);

        EXPECT.toBeNull(lives.winner);

        lives.loseLives(6, 3);
        EXPECT.toBeNull(lives.winner);

        lives.loseLives(5, 3);
        EXPECT.toBeNull(lives.winner);

        lives.loseLives(4, 3);
        EXPECT.toBeNull(lives.winner);

        lives.loseLives(3, 3);
        EXPECT.toBeNull(lives.winner);

        lives.loseLives(2, 3);
        EXPECT.toBe(lives.winner!, 1); // <--

    });
}