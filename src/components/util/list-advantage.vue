<template lang="pug">
  div
    h1 나의경험
    ul
      li(v-for="(list, index) in getAListEdit")
        a(@click="onClickRewrite(index)") {{list.title}}
        button(type="button" @click="setDelete(index)") 닫기
    C-Popup(v-show="getIsPopup")
    .group-btn(v-show="getAListEdit.length>0")
      button.prev(type="button" @click="setNextPage()") 경험저장
</template>
<script>
import CPopup from './popup'
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
    CPopup
  },
  computed: {
    ...mapGetters([
      'getIsHasValue',
      'getAListEdit',
      'getIsPopup'
    ])
  },
  methods: {
    // 다음페이지로 연결
    setNextPage () {
      this.$router.push({ name: 'JoinPage4' })
    },
    onClickRewrite (payload) {
      this.$store.dispatch('setRewrite', payload)
    },
    onClickRenderLink (payload) {
      this.$store.dispatch('setPopup', payload)
    },
    setDelete (payload) {
      this.$store.dispatch('setDelete', payload)
    }
  }
}
</script>

<style lang="scss">
@import "./../../sass/partials/_fonts";
h1 {
  font-size: $font-m;
}
ul {
  padding-left: 20px;
  li {
    position: relative;
    padding-right: 30px;
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
        border: 1px solid #dedfdf;
      }
    }
  }
}
</style>
