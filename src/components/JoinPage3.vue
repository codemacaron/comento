<template lang="pug">
  div.cover
    h1 작성한 우수자의 모습 중 한 가지와 관련된 나의 강점을 하나 선택하세요.
    ul
      li(v-for="(list, index) in getAdvantageList")
        input#advantage1(type="checkbox" name="advantage" :id="'advantage' + index" :checked="list.value")
        label(:for="'advantage' + index") {{list.text}}
    div
      button(type="button" v-show="!getIsFirstPage") 이전단계
      button(type="button") 저장 후 다음단계
</template>

<script scope>
import { mapGetters } from 'vuex'

export default {
  name: 'Join',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'getIsFirstPage',
      'getAdvantageList'
    ])
  },
  methods: {
    // filter 팝업창
    showPopup (payload) {
      this.$store.dispatch('setResetList')
    }
  }
}

</script>

<style lang="scss" scoped>
@import "./../sass/App.scss";
// 변수 모음
$height: 50px;
$top-height: calc(50px * 2);
$padding: 10px;
$double-padding: calc(10px * 2);
* {
  box-sizing: border-box;
}
.a11y-hidden {
  @extend %readable-hidden;
}
[v-cloak] {
  display: none;
}
.cover {
  @include clearfix;
  padding: 0 0 10px 0;
  border-bottom: $border;
}
</style>
