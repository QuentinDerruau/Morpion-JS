import { initialState, play, getWinner, getNextPlayer } from "./index";
var morpion = initialState;
let winning1 = 0;
let winning2 = 0;
function check(value) {
  if (value === 1) {
    return "<div class='rondVide'></div>";
  } else if (value === 2) {
    return "<div class='rondPlein'></div>";
  } else {
    return value;
  }
}
function winner() {
  const emptyCellCount = morpion
    .map((row) => row.filter((cell) => cell === null).length)
    .reduce((sum, count) => sum + count);
  if (getWinner(morpion) === 1) {
    document.getElementById("turn").innerHTML = "Joueur 1 gagne";
    winning1++;
    document.getElementById("case0").onclick = function () {};
    document.getElementById("case1").onclick = function () {};
    document.getElementById("case2").onclick = function () {};
    document.getElementById("case10").onclick = function () {};
    document.getElementById("case11").onclick = function () {};
    document.getElementById("case12").onclick = function () {};
    document.getElementById("case20").onclick = function () {};
    document.getElementById("case21").onclick = function () {};
    document.getElementById("case22").onclick = function () {};
    document.getElementById("win1").innerHTML = winning1.toString();
  } else if (getWinner(morpion) === 2) {
    document.getElementById("turn").innerHTML = "Joueur 2 gagne";
    winning2++;
    document.getElementById("case0").onclick = function () {};
    document.getElementById("case1").onclick = function () {};
    document.getElementById("case2").onclick = function () {};
    document.getElementById("case10").onclick = function () {};
    document.getElementById("case11").onclick = function () {};
    document.getElementById("case12").onclick = function () {};
    document.getElementById("case20").onclick = function () {};
    document.getElementById("case21").onclick = function () {};
    document.getElementById("case22").onclick = function () {};
    document.getElementById("win2").innerHTML = winning2.toString();
  } else if (emptyCellCount === 0) {
    document.getElementById("turn").innerHTML = "Match Nul";
  }
}
function click(position) {
  const len = position.toString().length;
  var first;
  var second;
  if (len === 1) {
    first = 0;
    second = position;
  } else {
    first = position.toString().split("")[0];
    second = position.toString().split("")[1];
    first = parseInt(first, 10);
    second = parseInt(second, 10);
  }
  morpion = play(morpion, second, first);
  let value = check(morpion[first][second]);
  document.getElementById("case" + position).innerHTML = value;
  document.getElementById("turn").innerHTML =
    "Tour : Joueur " + getNextPlayer(morpion);
  winner();
}
function row(start, end, row) {
  var section = document.createElement("section");
  section.id = "row" + row;
  document.getElementById("morpion").appendChild(section);
  for (let i = start; i < end; i++) {
    var div = document.createElement("div");
    div.id = "case" + i;
    div.onclick = function () {
      click(i);
    };
    document.getElementById("row" + row).appendChild(div);
  }
}
function start() {
  var h1 = document.createElement("h1");
  var turn = document.createElement("h2");
  var article = document.createElement("article");
  var win1 = document.createElement("h3");
  var win2 = document.createElement("h3");
  var reset = document.createElement("h3");
  var resetpoints = document.createElement("h3");
  h1.id = "title";
  turn.id = "turn";
  win1.id = "win1";
  win2.id = "win2";
  article.id = "morpion";
  reset.id = "reset";
  resetpoints.id = "resetPoints";
  h1.innerHTML = "MORPION";
  turn.innerHTML = "Tour : Joueur 1";
  win1.innerHTML = winning1.toString();
  win2.innerHTML = winning2.toString();
  reset.innerHTML = "Reset";
  resetpoints.innerHTML = "Reset Points";
  reset.onclick = function () {
    morpion = initialState;
    document.getElementById("case0").innerHTML = "";
    document.getElementById("case1").innerHTML = "";
    document.getElementById("case2").innerHTML = "";
    document.getElementById("case10").innerHTML = "";
    document.getElementById("case11").innerHTML = "";
    document.getElementById("case12").innerHTML = "";
    document.getElementById("case20").innerHTML = "";
    document.getElementById("case21").innerHTML = "";
    document.getElementById("case22").innerHTML = "";
    document.getElementById("turn").innerHTML = "Tour : Joueur 1";
    document.getElementById("case0").onclick = function () {
      click(0);
    };
    document.getElementById("case1").onclick = function () {
      click(1);
    };
    document.getElementById("case2").onclick = function () {
      click(2);
    };
    document.getElementById("case10").onclick = function () {
      click(10);
    };
    document.getElementById("case11").onclick = function () {
      click(11);
    };
    document.getElementById("case12").onclick = function () {
      click(12);
    };
    document.getElementById("case20").onclick = function () {
      click(20);
    };
    document.getElementById("case21").onclick = function () {
      click(21);
    };
    document.getElementById("case22").onclick = function () {
      click(22);
    };
  };
  resetpoints.onclick = function () {
    winning1 = 0;
    winning2 = 0;
    document.getElementById("win1").innerHTML = winning1.toString();
    document.getElementById("win2").innerHTML = winning2.toString();
  };
  document.body.appendChild(h1);
  document.body.appendChild(turn);
  document.body.appendChild(win1);
  document.body.appendChild(win2);
  document.body.appendChild(article);
  document.body.appendChild(turn);
  document.body.appendChild(reset);
  document.body.appendChild(resetpoints);
  row(0, 3, 0);
  row(10, 13, 1);
  row(20, 23, 2);
}
start();
