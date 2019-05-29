<template lang="pug">
  main
    h1 작성한 우수자의 모습 중 한 가지와 관련된 나의 강점을 하나 선택하세요.
    .error-msg
      p(v-show="!getIsHaveValue && isClicked") 강점을 선택해주세요!
    .group-btn
      button.next(type="button" @click="setNextPage('prev')") 이전단계
      button.prev(type="button" @click="setNextPage('next')") 저장 후 다음단계
</template>

<script scope>
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
      'getIsHaveValue'
    ])
  },
  methods: {
    ...mapActions([
      // 'setNextPage'
    ]),
    // filter 팝업창
    showPopup (payload) {
      this.$store.dispatch('setResetList')
    },
    setNextPage (payload) {
      switch (payload) {
        case 'prev':
          this.$router.push({ name: 'JoinPage4' })
          break
        case 'next':
          this.$router.push({ name: 'Main' })
          break
      }
    }
  }
}

</script>

<style lang="scss" scoped>
@import "./../sass/partials/_fonts";
@import "./../sass/partials/_color";
</style>
