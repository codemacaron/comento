<template lang="pug">
  main
    h1 당신은 능동성이(가) 뛰어나다는 것을 아래와 같이 정의하고 있습니다.
    .editor-area
      | text 붙을 예정
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
    setNextPage (payload) {
      switch (payload) {
        case 'prev':
          this.$router.push({ name: 'JoinPage2' })
          break
        case 'next':
          this.$router.push({ name: 'JoinPage4' })
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
