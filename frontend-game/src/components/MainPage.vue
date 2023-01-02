<template>
  <div class="">

    <vue-p5 id="game_canvas" v-on="{setup, draw}"></vue-p5>

  </div>
</template>

<script>

import * as p5 from 'p5'


export default {
  name: 'MainPage',
  computed:{
    gameHeight(){
      return 500;
    },
    gameWidth(){
      return 500;
    }
  },

  created(){
    p5.createCanvas(100,100)
  }





}


</script>

<style scoped>

.wellcomeText{
  color: white;
  font-size:32px;
}

#game_canvas{
  height: 100vh;
}

</style>
