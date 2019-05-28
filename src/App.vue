<template lang="pug">
  #app
    router-view
    button.btn-goto-top(type="button" @click="scrollToTop()") 위로가기
</template>

<script>
export default {
  name: 'App',
  methods: {
    // 상단으로 가는 버튼
    scrollToTop () {
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="scss">
@import "./sass/App";
// @import "./assets/fontawesome/css/font-awesome.css";
@font-face {
  font-family: "Nanum Square";
  src: url("./assets/font/NanumSquareR.eot");
  src: url("./assets/font/NanumSquareR.eot?#iefix") format("embedded-opentype"),
    url("./assets/font/NanumSquareR.woff") format("woff"),
    url("./assets/font/NanumSquareR.ttf") format("truetype"),
    url("./assets/font/NanumSquareOTFR.svg#9e23ceb0c858ca37642ba540402577eb")
      format("svg");
  font-style: normal;
  font-weight: 400;
}

@font-face {
  font-family: "Nanum Square";
  src: url("./assets/font/NanumSquareB.eot");
  src: url("./assets/font/NanumSquareB.eot?#iefix") format("embedded-opentype"),
    url("./assets/font/NanumSquareB.woff") format("woff"),
    url("./assets/font/NanumSquareB.ttf") format("truetype"),
    url("./assets/font/NanumSquareOTFB.svg#a41a1fda1fdf3dafd3394867a156b1cf")
      format("svg");
  font-style: normal;
  font-weight: 700;
}

#app {
  font-family: "Nanum Square", "Avenir", Helvetica, Arial, sans-serif;
  text-align: left;
  color: #000;
}

button.btn-goto-top {
  position: fixed;
  display: block;
  width: 70px;
  height: 70px;
  line-height: 40px;
  padding: 30px 0 0 0;
  border: 0 none;
  background: $color-point;
  color: $color-white;
  font-size: $font-s;
  &::before {
    position: absolute;
    left: 0;
    top: 0;
    content: "^";
    display: block;
    width: 70px;
    height: 30px;
    line-height: 60px;
    font-size: 40px;
    text-align: center;
  }
}

@include mobile {
  button.btn-goto-top {
    right: 10px;
    bottom: 10px;
  }
}
@include tablet {
  button.btn-goto-top {
    right: 10px;
    bottom: 10px;
  }
}
@include desktop {
  button.btn-goto-top {
    left: 50%;
    bottom: 40px;
    transform: translateX(520px);
  }
}
</style>
