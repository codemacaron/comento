<template lang="pug">
  div
    h2.join-title
      | 언제
      CListcomponent
      |을(를) 뛰어나게 발휘했나요?
    div.input-area
      input(v-model="editTitle" type="text" ref="title" :class="{active : !getIsHasValue && isClicked && editTitle.length === 0}" placeholder="예) 스노우보드 동아리")
      | 을(를) 할때
    .error-msg
      p(v-show="!getIsHasValue && isClicked && editTitle.length === 0") 타이틀을 입력해주세요!
    h2.join-title
      CListcomponent
      | 을(를) 발휘한 에피소드를 자세히 알려주세요.
    div.text-area
      textarea(v-model="editContent" ref="content" :class="{active : !getIsHasValue && isClicked && editContent.length === 0}" placeholder="예) (상황) 동아리 연말 나눔행사의 예산 부족 문제 해결을 학교 주변 가게 후원으로 해결하기 위해 (행동) 총 47개 매장의 사장님을 만나 나눔행사의 취지를 설명하고, 동아리 단톡방, 페이스북 및 안내 팜플릿 홍보를 약속하여 (결과) 4개 매장의 후원을 이끌어 냄")
    .error-msg
      p(v-show="!getIsHasValue && isClicked && editContent.length === 0") 내용을 입력해주세요!
    .group-btn
      button.next(type="button" @click="setShowNextStep()") 이전단계
      button.prev(type="button" @click="setSave()") 경험저장
</template>
<script>
import { mapGetters } from 'vuex'
import CListcomponent from './list-component'
export default {
  name: 'C-Write',
  data () {
    return {
      isClicked: false
    }
  },
  components: {
    CListcomponent
  },
  computed: {
    // 타이틀 값을 v-model로 연결하는 방법
    editTitle: {
      set (value) {
        this.$store.dispatch('setFirstList')
        // 값을 저장하는 역활
        let payload = {
          'value': value,
          'type': 'title',
          'index': this.$store.getters.getChangeIndex
        }
        this.$store.dispatch('setValue', payload)
      },
      get () {
        // 값을 가져오는 역활
        return this.$store.getters.getAEditTitle
      }
    },
    editContent: {
      set (value) {
        let payload = {
          'value': value,
          'type': 'content',
          'index': this.$store.getters.getChangeIndex
        }
        this.$store.dispatch('setValue', payload)
      },
      get () {
        return this.$store.getters.getAEditContent
      }
    },
    ...mapGetters([
      'getIsHasValue',
      'getAEditTitle',
      'getAEditContent',
      'getAListEdit'
    ])
  },
  methods: {
    setShowNextStep () {
      this.isClicked = true
      this.$router.push({ name: 'JoinPage2' })
      this.$store.dispatch('setChageHasValue').then(() => {
        this.isClicked = false
      })
    },
    setSave () {
      let changeIndex = this.$store.getters.getChangeIndex
      this.isClicked = true
      this.$store.dispatch('setChageHasValue', false)
      let title = this.$store.getters.getAEditTitle
      let content = this.$store.getters.getAEditContent
      if (title.length === 0 || content.length === 0) {
        if (title.length === 0) {
          return this.$refs.title.focus()
        } else if (content.length === 0) {
          return this.$refs.content.focus()
        }
      }
      if (changeIndex === undefined && title.length !== 0 && content.length !== 0) {
        this.isClicked = false
        let payload = {
          'title': this.$store.getters.getAEditTitle,
          'content': this.$store.getters.getAEditContent
        }
        this.$store.dispatch('setChageHasValue', true)
        this.$store.dispatch('setSave', payload).then(() => {
          this.$store.dispatch('setClear')
        })
      }

      if (changeIndex !== undefined && title.length !== 0 && content.length !== 0) {
        this.isClicked = false
        let payload = {
          'title': this.$store.getters.getAEditTitle,
          'content': this.$store.getters.getAEditContent,
          'index': changeIndex
        }
        this.$store.dispatch('setChageHasValue', true)
        this.$store.dispatch('setSave', payload).then(() => {
          this.$store.dispatch('setClear')
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./../../sass/partials/_fonts";
@import "./../../sass/partials/_color";
@import "./../../sass/partials/_mixin";

h2.join-title {
  font-size: $font-m;
  margin-bottom: 10px;
  text-align: left;
}
.input-area {
  font-size: $font-m;
  input[type="text"] {
    width: 80%;
    margin-right: 5px;
    padding: 20px 10px;
    border: $border;
    font-size: $font-m;
    &.active {
      border: 1px solid $color-point;
    }
  }
}
.text-area {
  font-size: $font-m;
  textarea {
    width: 100%;
    min-height: 200px;
    border: $border;
    padding: 20px 10px;
    font-size: $font-m;
    &.active {
      border: 1px solid $color-point;
    }
  }
}
.error-msg {
  margin-top: 10px;
  margin-bottom: 50px;
  p {
    text-align: left;
    font-size: $font-m;
  }
}
</style>
