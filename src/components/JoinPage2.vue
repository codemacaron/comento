<template lang="pug">
  main
    h1.join-title
      strong(v-for="(list, index) in getAdvantageList")
        span(v-show="list.value") {{ list.text }}
      | 이(가) 뛰어나다는 것은 어떤 의미인가요?
    h2.join-title
      | 저는
      strong(v-for="(list, index) in getAdvantageList")
        span(v-show="list.value" :class="{active : onlyOne}") {{ list.text }}
      | 이(가) 뛰어나다는 것을
    .editor-area
      p.point-msg * 의사소통능력 / 단순히 내가 하고싶은 말을 상대방에게 잘 전달하는 것이 아니라, 상대가 공동의 문제에 공감하게 하고 협력을 이끌어 낼 수 있는 것
      vue-html5-editor(@change="contentChange" :content="edit.content" :height="500" :z-index="0")
    h2.join-title.text-right 이라고 생각해요.
    .error-msg
      p(v-show="!getIsHaveValue && isClicked") 내용을 입력해주세요!
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
      onlyOne: false,
      valueCount: [],
      isClicked: false,
      text: '',
      edit: {
        content: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'getAdvantageList',
      'getIsHaveValue'
    ])
  },
  created () {
    this.$store.dispatch('setChangeContent', 'false')
    this.getEditValue()
    this.isValueCount()
  },
  methods: {
    ...mapActions([
      // 'setNextPage'
    ]),
    // 값이 1대 일때 적용
    isValueCount () {
      let advantageList = this.$store.getters.getAdvantageList
      let count = this.valueCount
      for (var i = 0; i < advantageList.length; i++) {
        if (advantageList[i].value === true) {
          count.push(i)
        }
      }
      setTimeout(() => {
        console.log(count)
        this.isOnlyOne()
      }, 100)
    },
    isOnlyOne () {
      let count = this.valueCount
      if (count.length < 2) {
        this.onlyOne = true
      }
    },
    // 만약 값이 있으면 넣기
    getEditValue () {
      let data = this.$store.getters.getEdit.content
      if (data.length !== 0) {
        this.edit.content = data
        this.$store.dispatch('setChangeContent', 'true')
      }
    },
    // 에디터에서 값이 바뀌는 것을 뷰엑스에 적용
    contentChange (data) {
      let dataTrim = data.trim()
      let dataLength = dataTrim.length
      this.edit.content = data
      if (dataLength !== 0) {
        this.$store.dispatch('setChangeContent', 'true')
      }
    },
    // 다음페이지로 연결
    setNextPage (payload) {
      this.isClicked = true
      let getIsHaveValue = this.$store.getters.getIsHaveValue
      if (getIsHaveValue === true) {
        switch (payload) {
          case 'prev':
            this.$router.push({ name: 'JoinPage1' })
            break
          case 'next':
            this.$router.push({ name: 'JoinPage3' })
            break
        }
        this.isClicked = false
        this.$store.dispatch('setSaveContent', this.edit)
      }
    }
  }
}

</script>

<style lang="scss" scoped>
@import "./../sass/partials/_fonts";
@import "./../sass/partials/_color";
</style>
