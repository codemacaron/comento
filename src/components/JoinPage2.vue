<template lang="pug">
  div.cover
    h1
      strong(v-for="(list, index) in getAdvantageList")
        span(v-show="list.value") {{ list.text }}
      | 이(가) 뛰어나다는 것은 어떤 의미인가요?
    //- ul
    //-   li(v-for="(list, index) in getAdvantageList")
    //-     //- input#advantage1(type="checkbox" name="advantage" :id="'advantage' + index" :checked="list.value")
    //-     label(:for="'advantage' + index") {{list.text}}
    div
      button(type="button" @click="setNextPage('isFirstPage')") 이전단계
      //- button(type="button" @click="setNextPage('isThirdPage')") 저장 후 다음단계

    p 강점을 선택해주세요! {{this.getIsHaveValue}}
</template>

<script scope>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Join',
  data () {
    return {
      text: '',
      getIsHaveValue: false
    }
  },
  computed: {
    ...mapGetters([
      'getAdvantageList',
      'getAdvantageListText'
    ])
  },
  methods: {
    // changeValue (event) {
    // },
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
h1 {
  strong {
    > span {
      &::before,
      &::after {
        content: "`";
        display: inline-block;
      }
    }
  }
}
</style>
