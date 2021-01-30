<template>
    <span class="stamp" :style="styles">{{content}}</span>
</template>

<script>
export default {
    name: 'Stamp',
    props:{
        content: String,
        styles: Object,
    }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.stamp {
  position: absolute;
  display: inline-block;
  color: red;
  padding: 15px;
  background-color: transparent;
  box-shadow:inset 0px 0px 0px 10px red;
}

.stamp:after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url("./imgs/stamp-back.jpg");
  mix-blend-mode: lighten;
}
</style>