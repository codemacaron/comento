<template lang="pug">
  main
    div
      h1.join-title
        | 당신은
        C-Listcomponent
        | 이(가) 뛰어나다는 것을 아래와 같이 정의하고 있습니다.
      .data-area(v-html="getEdit.content")
      .group-btn(v-show="!getJoin3Value")
        button.next(type="button" @click="setNextPage()") 이전단계
        button.prev(type="button" @click="setShowNextStep()") 다음단계
    .cover(v-show="getJoin3Value")
      C-Write
      C-Listadvantage
</template>

<script>
import CListcomponent from './util/list-component'
import CWrite from './util/write'
import CListadvantage from './util/list-advantage'
import { mapGetters } from 'vuex'

export default {
  name: 'Join',
  data () {
    return {
      isClicked: false,
      onlyOne: false
    }
  },
  components: {
    CListcomponent,
    CWrite,
    CListadvantage
  },
  computed: {
    ...mapGetters([
      'getIsHasValue',
      'getEdit',
      'getJoin3Value'
    ])
  },
  methods: {
    // 다음페이지로 연결
    setNextPage () {
      this.isClicked = true
      this.$router.push({ name: 'JoinPage2' })
      this.$store.dispatch('setChageHasValue').then(() => {
        this.isClicked = false
      })
    },
    setShowNextStep () {
      this.$store.dispatch('setJoinValue')
    }
  }
}

</script>

<style lang="scss" scoped>
@import "./../sass/partials/_fonts";
@import "./../sass/partials/_color";
@import "./../sass/partials/_mixin";

.cover{
  margin-top: 50px;
  @include clearfix;
  >div {
    float: left;
    border: $border;
    box-sizing: border-box;
    padding: 20px;
    &:first-of-type {
      width: 69%;
      margin-right: 1%;
    }
    &:last-of-type {
      width: 30%;
    }
  }
}
h1.join-title {
  font-size: $font-m;
  margin-bottom: 10px;
  text-align: left;
}
.cover {
  margin-top: 50px;
}
</style>
