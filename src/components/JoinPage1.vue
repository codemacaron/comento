<template lang="pug">
  div.cover
    h1 작성한 우수자의 모습 중 한 가지와 관련된 나의 강점을 하나 선택하세요.
    ul
      li(v-for="(list, index) in getAdvantageList")
        input#advantage1(type="checkbox" name="advantage" :id="'advantage' + index" :checked="list.value" @click="changeValue($event)")
        label(:for="'advantage' + index") {{list.text}}
    p 강점을 선택해주세요! {{this.getIsHaveValue}}
    div
      button(type="button" @click="setNextPage('isSecondPage')") 저장 후 다음단계
</template>

<script scope>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Join',
  data () {
    return {
      getIsHaveValue: false
    }
  },
  computed: {
    ...mapGetters([
      'getAdvantageList'
    ])
  },
  methods: {
    changeValue (event) {
      let target = event.target.id
      let targetNum = target.replace(/[^0-9]/g, '')
      this.$store.dispatch('setChangeAdvantage', targetNum)
    },
    ...mapActions([
      'setNextPage'
    ])
  },
  watch () {
    this.getIsHaveValue = this.$store.getters.getIsHaveValue
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
