<template>
  <div ref="game" class="game_canvas">
    <button class="absolute" @click="t1">aa1</button>
    <canvas
      ref="canvas"
      class="canvas"
      :width="width"
      :height="height"
    ></canvas>
  </div>
</template>

<script>
import Game from "@/lib/gameLib/index.js";

export default {
  name: "MainPage",
  components: {},
  data() {
    return {
      width: 500,
      height: 500,
      game: null,
    };
  },
  methods: {
    t1() {},
    updateSize() {
      this.width = this.$refs.game.clientWidth;
      this.height = this.$refs.game.clientHeight;
    },
  },
  mounted() {
    this.updateSize();
    this.game = new Game(this.$refs.canvas);
    window.addEventListener("resize", this.updateSize);
    this.game.start();
  },
  unmounted() {
    window.removeEventListener("resize", this.updateSize);
  },
};
</script>

<style scoped>
.wellcomeText {
  color: white;
  font-size: 32px;
}

.game_canvas {
  overflow: hidden;
  display: block;
  height: 100vh;
  width: 100vw;
}
.canvas {
  display: block;
}
.absolute {
  position: absolute;
}
</style>
