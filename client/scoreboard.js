class WordScoreBoard {
  constructor() {
    this.words = [];
  }

  // TODO #8: Save the word score to the server
  async saveWordScore(name, word, score) {
    this.words.push({'name': name, 'word': word, 'score': score});
    fetch(`/wordScore`, {method: 'POST', body: JSON.stringify({'name': name, 'word': word, 'score': score})});
  }

  render(element) {
    let html = '<h1>Word Scores</h1>';
    html += '<table>';
    this.words.forEach((word) => {
      html += `
        <tr>
          <td>${word.name}</td>
          <td>${word.word}</td>
          <td>${word.score}</td>
        </tr>
      `;
    });
    html += '</table>';
    element.innerHTML = html;
  }
}

class GameScoreBoard {
  constructor() {
    this.game = [];
  }

  render(element) {
    let html = '<h1>Game Score</h1>';
    html += '<table>';
    this.game.forEach((word) => {
      html += `
        <tr>
          <td>${word.name}</td>
          <td>${word.score}</td>
        </tr>
      `;
    });
    html += '</table>';
    element.innerHTML = html;
  }

  // TODO #9: Save the game score to the server
  async saveGameScore(name, score) {
    this.game.push({'name': name, 'score': score});
    fetch(`/gameScore`, {method: 'POST', body: JSON.stringify({'name': name, 'score': score})});
  }
}

class TopWordAndGameScoreBoard {
  // TODO #10: Render the top word and game scores
  async render(element) {
    element.innerHTML = '';
    let html = '<h1>Top Word Scores</h1>';
    html += '<table>';
    let sortedWords = wordScoreBoard.words.sort((a, b) => a.score > b.score ? 1 : -1);
    let sortedGames = gameScoreBoard.game.sort((a, b) => a.score > b.score ? 1 : -1);
    for(let i = 0; i < Math.min(5, wordScoreBoard.words.length); ++i){
      html += `
      <tr>
        <td>${wordScoreBoard.words[i].name}</td>
        <td>${wordScoreBoard.words[i].word}</td>
        <td>${wordScoreBoard.words[i].score}</td>
      </tr>
    `;
    }
    html += '</table>';
    html += '<h1>Top Game Scores</h1>';
    html += '<table>';
    for(let i = 0; i < Math.min(5, gameScoreBoard.game.length); ++i){
      html += `
      <tr>
        <td>${gameScoreBoard.game[i].name}</td>
        <td>${gameScoreBoard.game[i].score}</td>
      </tr>
    `;
    }
  }
}

export const wordScoreBoard = new WordScoreBoard();
export const gameScoreBoard = new GameScoreBoard();
export const topWordAndGameScoreBoard = new TopWordAndGameScoreBoard();
