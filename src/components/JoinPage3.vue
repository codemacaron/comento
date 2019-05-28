<template lang="pug">
  div.cover
    h1 당신은 능동성이(가) 뛰어나다는 것을 아래와 같이 정의하고 있습니다.
    .editor-area
      | text 붙을 예정
    div
      button(type="button" @click="setNextPage('isSecondPage')") 이전단계
      button(type="button" @click="setNextPage('isThirdPage')") 저장 후 다음단계
</template>

<script scope>
import { mapGetters, mapActions } from 'vuex'

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
    ...mapActions([
      'setNextPage'
    ])
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
