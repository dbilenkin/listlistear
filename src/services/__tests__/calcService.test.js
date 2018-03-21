import { calculateResults } from '../calcService';

describe('Testing an empty list of players and choices', () => {
  let players = [];
  let choices = [];
  let round = 0;

  let result = {
    results: [],
    players: []
  }
  it('calculates empty results', () => {

    let actualResult = calculateResults(players, choices, round);
    console.log(actualResult);

    expect(actualResult).toEqual(result);
  });
});

describe('Testing example where first player gets all points', () => {

  let players = [
    {
      "name": "D",
      "points": 0,
      "answers": [["a", "b", "c", "d", "e", "f"]],
      "choices": [
        {
          "-L8-UYZJ0M8T94iGc9cx": "a",
          "-L8-UZ20wWMxYNpyI076": "b",
          "-L8-UZ_9uZUqgwDI8tGS": "c"
        }
      ],
      "id": "-L8-URiHRdXz_PNmoX19"
    },
    {
      "name": "A",
      "points": 0,
      "answers": [["a", "b", "c", "d", "e", "f"]],
      "choices": [
        {
          "-L8-U_VPRad7RQ9m4cLh": "d",
          "-L8-U_w6NabhLSLpvH4i": "e",
          "-L8-UaODH0f8VVx9STcN": "f"
        }
      ],
      "id": "-L8-UT0tAMGZR8HWUIeP"
    }
  ];

  let choices = [
    {
      "choice": "a",
      "playerKeys": { "-L8-UYZJ0M8T94iGc9cw": "-L8-URiHRdXz_PNmoX19" }
    },
    {
      "choice": "b",
      "playerKeys": { "-L8-UZ1zxGYfD83FXc5O": "-L8-URiHRdXz_PNmoX19" }
    },
    {
      "choice": "c",
      "playerKeys": { "-L8-UZ_8fdfkZspeF2zQ": "-L8-URiHRdXz_PNmoX19" }
    },
    {
      "choice": "d",
      "playerKeys": { "-L8-U_w6NabhLSLpvH4h": "-L8-UT0tAMGZR8HWUIeP" }
    },
    {
      "choice": "e",
      "playerKeys": { "-L8-UaOCVJzHyId9EzIY": "-L8-UT0tAMGZR8HWUIeP" }
    },
    {
      "choice": "f",
      "playerKeys": { "-L8-UbCsYslS6otf9NyA": "-L8-UT0tAMGZR8HWUIeP" }
    }
  ];

  let round = 0;

  let expectedPlayer1Points = 180;
  let expectedPlayer2Points = 0;
  let expectedA = 100;
  let expectedB = 60;
  let expectedC = 20;

  let actualResult = calculateResults(players, choices, round);
  console.log(JSON.stringify(actualResult, null, '  '));

  it('calculates player scores', () => {
    let actualPlayer1 = actualResult.players.filter(player => player.name === "D")[0];
    let actualPlayer2 = actualResult.players.filter(player => player.name === "A")[0];

    expect(actualPlayer1.points).toEqual(expectedPlayer1Points);
    expect(actualPlayer2.points).toEqual(expectedPlayer2Points);

  });

  it('calculates results scores', () => {

    let a = actualResult.results[0];
    let b = actualResult.results[1];
    let c = actualResult.results[2];

    expect(a[0]).toEqual("a");
    expect(b[0]).toEqual("b");
    expect(c[0]).toEqual("c");

    expect(a[1].points).toEqual(expectedA);
    expect(b[1].points).toEqual(expectedB);
    expect(c[1].points).toEqual(expectedC);
  });
});

describe('Testing more complex example where both players gets points', () => {

  let players = [
    {
      "name": "D",
      "points": 0,
      "answers": [["a", "b", "c", "d", "e", "f"]],
      "choices": [
        {
          "-L8-UYZJ0M8T94iGc9cx": "a",
          "-L8-UZ20wWMxYNpyI076": "b",
          "-L8-UZ_9uZUqgwDI8tGS": "c"
        }
      ],
      "id": "-L8-URiHRdXz_PNmoX19"
    },
    {
      "name": "A",
      "points": 0,
      "answers": [["d", "e", "c", "f", "a", "b"]],
      "choices": [
        {
          "-L8-U_VPRad7RQ9m4cLh": "d",
          "-L8-U_w6NabhLSLpvH4i": "e",
          "-L8-UaODH0f8VVx9STcN": "f"
        }
      ],
      "id": "-L8-UT0tAMGZR8HWUIeP"
    }
  ];

  let choices = [
    {
      "choice": "a",
      "playerKeys": { "-L8-UYZJ0M8T94iGc9cw": "-L8-URiHRdXz_PNmoX19" }
    },
    {
      "choice": "b",
      "playerKeys": { "-L8-UZ1zxGYfD83FXc5O": "-L8-URiHRdXz_PNmoX19" }
    },
    {
      "choice": "c",
      "playerKeys": { "-L8-UZ_8fdfkZspeF2zQ": "-L8-URiHRdXz_PNmoX19", "-L8-U_w6NabhLSLpvH4h": "-L8-UT0tAMGZR8HWUIeP" }
    },
    {
      "choice": "d",
      "playerKeys": { "-L8-U_w6NabhLSLpvH4h": "-L8-UT0tAMGZR8HWUIeP" }
    },
    {
      "choice": "e",
      "playerKeys": { "-L8-UaOCVJzHyId9EzIY": "-L8-UT0tAMGZR8HWUIeP" }
    },
    {
      "choice": "f",
      "playerKeys": { "-L8-UbCsYslS6otf9NyA": "-L8-UT0tAMGZR8HWUIeP" }
    }
  ];

  let round = 0;

  let expectedPlayer1Points = 100;
  let expectedPlayer2Points = 90;
  let expectedA = 100;
  let expectedB = 60;
  let expectedC = 20;

  let actualResult = calculateResults(players, choices, round);
  console.log(JSON.stringify(actualResult, null, '  '));

  it('calculates player scores', () => {
    let actualPlayer1 = actualResult.players.filter(player => player.name === "D")[0];
    let actualPlayer2 = actualResult.players.filter(player => player.name === "A")[0];

    expect(actualPlayer1.points).toEqual(expectedPlayer1Points);
    expect(actualPlayer2.points).toEqual(expectedPlayer2Points);

  });

  it('calculates results scores', () => {

    // let a = actualResult.results[0];
    // let b = actualResult.results[1];
    // let c = actualResult.results[2];

    // expect(a[0]).toEqual("a");
    // expect(b[0]).toEqual("b");
    // expect(c[0]).toEqual("c");

    // expect(a[1].points).toEqual(expectedA);
    // expect(b[1].points).toEqual(expectedB);
    // expect(c[1].points).toEqual(expectedC);
  });
});