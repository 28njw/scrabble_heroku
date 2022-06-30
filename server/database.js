import { readFile, writeFile } from 'fs/promises';
import pg from 'pg';

const { Pool } = pg;
/** A class representing a database to store scores */
class Database {
  constructor()  {
    this.dburl = 'postgres://jvxhkcxjvrnons:de1cac9dce08f81b815548648ed1328becc0317e28e9f767176c3a901bec7688@ec2-3-222-74-92.compute-1.amazonaws.com:5432/d4g3s1qqal5ue7';
  }

  async connect() {
    this.pool = new Pool({
      connectionString: this.dburl,
      ssl: { rejectUnauthorized: false }
    });
    this.client = await this.pool.connect();
    await this.init();
  }
  async init() {
    const queryText = `
      create table if not exists scores (
        name varchar(30),
        score integer,
        word varchar(30)
      );
    `;
    const res = await this.client.query(queryText);
  }

  async close() {
    this.client.release();
    await this.pool.end();
  }

  /**
   * Saves a word score to the database.
   *
   * This method reads the database file as an object, adds the new score to the
   * data, and then writes the data back to the database file.
   *
   * @param {string} name the name of the player
   * @param {string} word the word played
   * @param {number} score the score of the word
   */
  async saveWordScore(name, word, score) {
    const data = await this._read();
    data.word.push({ name, word, score });
    await this._write(data);
  }

  /**
   * Saves a game score to the database.
   *
   * This method reads the database file as an object, adds the new score to the
   * data, and then writes the data back to the database file.
   *
   * @param {string} name the name of the player
   * @param {number} score the score of the game
   */
  async saveGameScore(name, score) {
    const data = await this._read();
    data.game.push({ name, score });
    await this._write(data);
  }

  /**
   * Returns the top 10 word scores.
   *
   * This method reads the database file as an object, sorts the word scores by
   * word score, and returns the top 10.
   *
   * @returns [{name: string, word: string, score: number}] returns the top 10
   * scores
   */
  async top10WordScores() {
    const data = await this._read();
    const sorted = data.word.sort((a, b) => b.score - a.score);
    const top = sorted.slice(0, 10);
    return top;
  }

  /**
   * Returns the top 10 game scores.
   *
   * This method reads the database file as an object, sorts the game scores by
   * game score, and returns the top 10.
   *
   * @returns [{name: string, score: number}] returns the top 10 game scores
   */
  async top10GameScores() {
    const data = await this._read();
    const sorted = data.game.sort((a, b) => b.score - a.score);
    const top = sorted.slice(0, 10);
    return top;
  }

  async _read() {
    try {
      const res = await this.client.query('SELECT * FROM scores');
      data = res.rows;
      return JSON.parse(data);
    } catch (error) {
      return { word: [], game: [] };
    }
  }

  // This is a private methods. The # prefix means that they are private.
  async _write(data) {
    const res = await this.client.query(`INSERT INTO scores (${data.name}, ${data.score}, ${data.word});`);
  }
}

const database = new Database();

export { database };
