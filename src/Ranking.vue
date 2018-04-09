
<template>
  <div>
      <div id="ranking" class="ranking">
        <div class="row">
          <div class="column header">Position</div>
          <div class="column header">Write answers count</div>
          <div class="column header">Name</div>
        </div>

        <div v-for="(rank, index) in ranking" class="row">  
          <div class="column">
            {{ index + 1 }}
          </div>     
          <div class="column">
            {{ rank.level }}
          </div>
          <div class="column">
            {{ rank.name }}
          </div>   
        </div>

        <div class="action">
          <a href="/game">Start new game</a>
        </div>
      </div>
  </div>
</template>

<script>
const Ranking = require("../src/js/ranking");
const ranking = new Ranking();

export default {
  data() {
    return {
      ranking: ranking.get()
    };
  }
};
</script>

<style>
.ranking {
  margin: 0 auto;
  margin-top: 3em;
  width: 50%;
  min-width: 14em;
}

.ranking .row {
  width: 100%;
}

.ranking .row:nth-child(odd) {
  background-color: #f4f4f4;
}

.ranking .row .column {
  display: inline-block;
  width: 25%;
  text-align: center;
  padding: 0.5em;
}

.ranking .action {
  text-align: center;
  width: 100%;
  margin-top: 2em;
}
</style>
