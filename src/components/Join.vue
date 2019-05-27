<template lang="pug">
  main
    Join-Page1(v-show="getIsFirstPage")
    Join-Page2(v-show="getIsSecondPage")
    Join-Page3(v-show="getIsThirdPage")
    Join-Page4(v-show="getIsFourthPage")
    Join-Page5(v-show="getIsFifthPage")
</template>

<script scope>
import JoinPage1 from './JoinPage1'
import JoinPage2 from './JoinPage2'
import JoinPage3 from './JoinPage3'
import JoinPage4 from './JoinPage4'
import JoinPage5 from './JoinPage5'
import { mapGetters } from 'vuex'

export default {
  name: 'Join',
  data () {
    return {
    }
  },
  components: {
    JoinPage1: JoinPage1,
    JoinPage2: JoinPage2,
    JoinPage3: JoinPage3,
    JoinPage4: JoinPage4,
    JoinPage5: JoinPage5
  },
  computed: {
    ...mapGetters([
      'getIsFirstPage',
      'getIsSecondPage',
      'getIsThirdPage',
      'getIsFourthPage',
      'getIsFifthPage'
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
main {
  width: 1000px;
  margin: 100px auto;
  border: $border;
  padding: 50px;
}
.cover {
  @include clearfix;
  padding: 0 0 10px 0;
  border-bottom: $border;
}
</style>
