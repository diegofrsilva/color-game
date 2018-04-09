<template>
    <div class="container">
        <!-- boarding container -->
        <div v-if="!gameState.isOver" id="board" class="board">
            <div class="level">Your current level: {{ gameState.level }}</div>
            
            <div v-for="row in gameState.board.rows" v-bind:key="row.key" class="row">
                <div v-for="column in row.columns" v-bind:key="column.key" v-on:click="playAt(column)" v-bind:style="column.style" class="column">&nbsp;</div>
            </div>
        </div>
        
        <!-- player name input -->
        <div v-if="gameState.isOver" class="player-info">
            <div>
                Game over. Please enter your name
            </div>
            <div>
                <input placeholder="Type your name here" v-model="playerName"/>
                <button v-on:click="saveRanking(playerName)">Continue</button>
            </div>
        </div>
    </div>
</template>

<script>
const Ranking = require("../src/js/ranking");
const ColorGame = require("../src/js/game");
const ranking = new Ranking();
const game = new ColorGame(2);
const data = {
  gameState: game.getGameState(),
  playerName: null
};

export default {
  name: "app",
  data() {
    return data;
  },
  methods: {
    playAt: column => {
      data.gameState = game.playAt(column);
    },
    saveRanking: name => {
      ranking.put(name, game.getGameState().level);
      window.location = "/ranking";
    }
  }
};
</script>

<style>
.container {
  height: 100%;
  width: 100%;
  position: absolute;
}
.container .board {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: 90%;
  width: 90%;
}
.container .board .row {
  display: flex;
  width: 100%;
  height: 100%;
  margin-top: 0.3em;
  margin-bottom: 0.3em;
}
.container .board .column {
  width: 100%;
  height: 100%;
  margin-left: 0.3em;
  margin-right: 0.3em;
}
.container .level {
  width: 100%;
  text-align: center;
  padding: 1em;
}
.container .player-info {
  margin: 0 auto;
  width: 80%;
  text-align: center;
  margin-top: 3em;
}
.container .player-info div {
  margin-top: 1em;
}
</style>