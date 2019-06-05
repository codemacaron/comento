<template lang="pug">
  main
    div
      h1.join-title
        | 당신은
        strong(v-for="(list, index) in getAdvantageList")
          span(v-show="list.value") {{ list.text }}
        | 이(가) 뛰어나다는 것을 아래와 같이 정의하고 있습니다.
      .data-area(v-html="getEdit.content")
      .error-msg
        p(v-show="!getIsHaveValue && isClicked") 강점을 선택해주세요!
      .group-btn(v-show="!isHasValue")
        button.next(type="button" @click="setNextPage('prev')") 수정하기
        button.prev(type="button" @click="setShowNextStep(true)") 다음단계
    div(v-show="isHasValue")
      h2.join-title
        | 언제
        strong(v-for="(list, index) in getAdvantageList")
          span(v-show="list.value") {{ list.text }}
        |을(를) 뛰어나게 발휘했나요?
      div
        input(type="text" placeholder="예) 스노우보드 동아리")
      .group-btn
        button.next(type="button" @click="setShowNextStep(false)") 이전단계
        button.prev(type="button" @click="setNextPage('next')") 경험저장
</template>

<script scope>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Join',
  data () {
    return {
      isClicked: false,
      isHasValue: false
    }
  },
  computed: {
    ...mapGetters([
      'getAdvantageList',
      'getIsHaveValue',
      'getEdit'
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
    },
    setShowNextStep (prop) {
      switch (prop) {
        case true:
          this.isHasValue = true
          break
        case false:
          this.isHasValue = false
          break
      }
    }
  }
}

</script>

<style lang="scss" scoped>
@import "./../sass/partials/_fonts";
@import "./../sass/partials/_color";

.data-area{
  padding: 10px;
  border: 1px solid #dedfdf;
}
h1.join-title {
  font-size: $font-m;
  margin-bottom: 10px;
  text-align: left;
}
</style>
