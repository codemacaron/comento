<template lang="pug">
  main
    h2.join-title
      | 아래 내용을 읽었을 때,
      C-Listcomponent
      | 이(가) 있는 사람처럼 보여지나요?
    .data-area(v-html="getEdit.content")

    h2.join-title
      | 당신이 생각하는
      C-Listcomponent
      | 이(가) 뛰어나게 발휘된 경험들을 다시 읽어보세요.
    ul.list-num
      li(v-for="(list, index) in getAListEdit")
        a(@click="onClickNum(index)" :class="{active : clickNum === index}") {{index}}
    ul.list-content
      li(v-for="(list, index) in getAListEdit" )
        div.data-area(:class="{active : clickNum === index}")
          h1 {{list.title}}
          p {{list.content}}
          .group-btn
            button.next(type="button" @click="onClickRewrite(index)") 수정
            button.next(type="button" @click="setDelete(index)") 삭제

    h2.join-title
      | 아니라면 수정하기 버튼을 눌러 글을 보완하거나 경험을 추가해보세요.
    .group-btn
      button.next(type="button" @click="setNextPage('prev')") 이전단계
      button.prev(type="button" @click="setNextPage('next')") 저장 후 목록으로
</template>

<script>
import CListcomponent from './util/list-component'
import { mapGetters } from 'vuex'

export default {
  name: 'Join',
  data () {
    return {
      isClicked: false,
      clickNum: 0
    }
  },
  components: {
    CListcomponent
  },
  computed: {
    ...mapGetters([
      'getIsHaveValue',
      'getAListEdit',
      'getEdit'
    ])
  },
  methods: {
    onClickNum (payload) {
      this.clickNum = payload
    },
    setNextPage (payload) {
      switch (payload) {
        case 'prev':
          this.$store.dispatch('setClear')
          this.$router.push({ name: 'JoinPage3' })
          break
        case 'next':
          this.$store.dispatch('setChangePage', false)
          this.$router.push({ name: 'Main' })
          break
      }
    },
    setDelete (payload) {
      this.$store.dispatch('setDelete', payload)
    },
    // 수정하기
    onClickRewrite (payload) {
      this.$store.dispatch('setRewrite', payload)
      this.$router.push({ name: 'JoinPage3' })
    }
  }
}

</script>

<style lang="scss" scoped>
@import "./../sass/partials/_fonts";
@import "./../sass/partials/_color";
@import "./../sass/partials/_mixin";

h1.join-title {
  font-size: $font-m;
  margin-bottom: 10px;
  text-align: left;
}

.list-num, .list-content{
  @include clearfix;
  list-style: none;
  padding-left: 0;
  li {
    float: left;
  }
}
.list-num{
  li {
    margin-left: 5px;
    &:first-of-type{
      margin-left: 0px;
    }
    a {
      display: block;
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border: $border;
      &:hover {
        border: $border-dark;
        text-decoration: none;
      }
      &.active {
        border: $border-point;
      }
    }
  }
}
.list-content{
  li {
    width: 100%;
    >div{
      display: none;
      &.active{
        display: block;
      }
    }
  }
}
</style>
