<template lang="pug">
  div
    h1 나의경험
    ul
      li(v-for="(list, index) in getAListEdit")
        a(@click="onClickRewrite(index)")
          span(v-show = "getChangeIndex !== index") {{list.title}}
          span(v-show = "getChangeIndex === index") {{getAEditTitle}}
        button(type="button" @click="setDelete(index)") 닫기
    p
      span(v-show = "getChangeIndex === undefined && getAListEdit.length < 1 && getAEditTitle.length < 1 && !getFirstList") 저장된 경험이 없어요
      span(v-show = "getChangeIndex === undefined && getAEditTitle.length < 1 && getFirstList") 새로운 경험 작성하기
      span(v-show = "getChangeIndex === undefined") {{getAEditTitle}}
    //- C-Popup(v-show="getIsPopup")
    .group-btn(v-show="getAListEdit.length>0")
      button.prev(type="button" @click="setNextPage()") 경험저장
</template>
<script>
// import CPopup from './popup'
import { mapGetters } from 'vuex'
export default {
  name: 'C-Listadvantaget',
  data () {
    return {
      isClicked: false,
      isHasValue: false
    }
  },
  components: {
    // CPopup
  },
  computed: {
    ...mapGetters([
      'getIsHasValue',
      'getAListEdit',
      'getIsPopup',
      'getAEditTitle',
      'getFirstList',
      'getChangeIndex'
    ])
  },
  methods: {
    // 다음페이지로 연결
    setNextPage () {
      this.$router.push({ name: 'JoinPage4' })
    },
    // 수정하기
    onClickRewrite (payload) {
      this.$store.dispatch('setRewrite', payload)
    },
    // 팝업 열기
    // onClickRenderLink (payload) {
    //   this.$store.dispatch('setPopup', payload)
    // },
    // 삭제하기
    setDelete (payload) {
      this.$store.dispatch('setDelete', payload)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./../../sass/partials/_color";
@import "./../../sass/partials/_fonts";
h1 {
  font-size: $font-m;
}
ul {
  padding-left: 20px;
  li {
    position: relative;
    $border: 30px;
    min-height: 30px;
    line-height: 30px;
    margin-top: 5px;
    a {
      &:hover {
        text-decoration: underline;
      }
    }
    button {
      position: absolute;
      right: 0;
      top: 0;
      overflow: hidden;
      width: 30px;
      height: 30px;
      background: none;
      border: 0 none;
      &:after {
        content: "X";
        position: absolute;
        right: 0;
        top: 0;
        display: block;
        width: 30px;
        height: 30px;
        box-sizing: border-box;
        line-height: 30px;
        text-align: center;
        background: #fff;
        border: $border;
      }
    }
  }
}
</style>
