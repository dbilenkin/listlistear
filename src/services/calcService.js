const getPlayerByKey = (players, key) => {
  return players.filter(player => player.id === key)[0];
}

const calculateResults = (players, choices, round) => {

  let results = {};
  players.forEach(player => {
    let points = 0;
    let top3answers = player.answers[round].slice(0, 3);
    console.log(top3answers);
    for (const [index, value] of top3answers.entries()) {
      console.log(index, value);
      let choicePoints = 50 - index * 20;
      let choice = choices.filter(e => e.choice === value)[0];
      let choicePlayerKeys = Object.values(choice.playerKeys);
      if (results[choice.choice]) {
        results[choice.choice].points += choicePoints;
      } else {
        results[choice.choice] = {};
        results[choice.choice].points = choicePoints;
      }
      for (const [index, playerKey] of choicePlayerKeys.entries()) {
        let player = players.filter(p => p.id === playerKey)[0];
        choicePoints -= index * 5
        player.points += choicePoints;
        let playerName = getPlayerByKey(players, playerKey).name;
        if (results[choice.choice].players && results[choice.choice].players.indexOf(playerName) === -1) {
          results[choice.choice].players.push(playerName);
        } else {
          results[choice.choice].players = [playerName];
        }
      }
    }
  });

  let resultArray = Object.entries(results);
  resultArray.sort((a, b) => b[1].points - a[1].points);
  players.sort((a, b) => b.points - a.points);
  return { players: players, results: resultArray };

}

module.exports = {
  calculateResults: calculateResults
}