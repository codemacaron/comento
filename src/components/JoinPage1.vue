<template lang="pug">
  main
    h1 작성한 우수자의 모습 중 한 가지와 관련된 나의 강점을 하나 선택하세요.
    ul
      li(v-for="(list, index) in getAdvantageList")
        input#advantage1(type="checkbox" name="advantage" :id="'advantage' + index" :checked="list.value" @click="changeValue($event)")
        label(:for="'advantage' + index") {{list.text}}
    .error-msg
      p(v-show="!getIsHasValue && isClicked") 강점을 선택해주세요!
    .group-btn
      button.next(type="button" @click="setNextPage('next')") 저장 후 다음단계
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Join',
  data () {
    return {
      isClicked: false
    }
  },
  computed: {
    ...mapGetters([
      'getAdvantageList',
      'getIsHasValue'
    ])
  },
  methods: {
    ...mapActions([
      // 'setNextPage'
    ]),
    changeValue (event) {
      let target = event.target.id
      let targetNum = target.replace(/[^0-9]/g, '')
      this.$store.dispatch('setChangeAdvantage', targetNum)
    },
    setNextPage () {
      this.isClicked = true
      let getIsHasValue = this.$store.getters.getIsHasValue
      if (getIsHasValue === true) {
        this.$router.push({ name: 'JoinPage2' })
        this.isClicked = false
        this.$store.dispatch('setChangeContent', 'false')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./../sass/partials/_fonts";
@import "./../sass/partials/_color";
h1 {
  text-align: center;
  font-weight: bold;
  font-size: $font-xl;
  margin-bottom: 50px;
}
ul {
  display: flex;
  flex-flow: row wrap;
  list-style: none;
  padding-left: 0;
  li {
    width: 33.33%;
    margin-bottom: 10px;
    input[type="checkbox"] {
      position: relative;
      width: 20px;
      height: 20px;
      margin-right: 10px;
      &::before {
        position: absolute;
        left: 0;
        top: 0;
        content: "";
        width: 20px;
        height: 20px;
        line-height: 18px;
        text-align: center;
        background: #fff;
        border: $border;
        font-size: 18px;
      }
    }
    input:checked {
      &::before {
        content: "∨";
      }
    }
  }
}
</style>
