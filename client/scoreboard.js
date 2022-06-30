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
    let header = document.createElement('div');
    header.innerText = 'Top Word Scores: ';
    element.appendChild(header);
    let sortedWords = this.words.sort((a, b) => a.score > b.score ? 1 : -1);
    let sortedGames = this.game.sort((a, b) => a.score > b.score ? 1 : -1);
    for(let i = 0; i < Math.min(5, this.words.length); ++i){
      const div = document.createElement('div');
      div.innerText = this.words[i];
      element.appendChild(div);
    }
    header = document.createElement('div');
    header.innerText = 'Top Game Scores: ';
    element.appendChild(header);
    for(let i = 0; i < Math.min(5, this.game.length); ++i){
      const div = document.createElement('div');
      div.innerText = this.game[i];
      element.appendChild(div);
    }
  }
}

export const wordScoreBoard = new WordScoreBoard();
export const gameScoreBoard = new GameScoreBoard();
export const topWordAndGameScoreBoard = new TopWordAndGameScoreBoard();
