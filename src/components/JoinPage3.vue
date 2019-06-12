<template lang="pug">
  main
    div
      h1.join-title
        | 당신은
        C-Listcomponent
        | 이(가) 뛰어나다는 것을 아래와 같이 정의하고 있습니다.
      .data-area(v-html="getEdit.content")
      .group-btn(v-show="!isHasValue")
        button.next(type="button" @click="setNextPage('prev')") 수정하기
        button.prev(type="button" @click="setShowNextStep(true)") 다음단계
    .cover(v-show="isHasValue")
      div
        h2.join-title
          | 언제
          CListcomponent
          |을(를) 뛰어나게 발휘했나요?
        div.input-area
          input(v-model="editTitle" type="text" ref="title" :class="{active : !getIsHasValue && isClicked && editTitle.length === 0}" placeholder="예) 스노우보드 동아리")
          | 을(를) 할때
          p {{getAEditTitle}}
        .error-msg
          p(v-show="!getIsHasValue && isClicked && editTitle.length === 0") 타이틀을 입력해주세요!
        h2.join-title
          CListcomponent
          | 을(를) 발휘한 에피소드를 자세히 알려주세요.
        div.text-area
          textarea(v-model="editContent" ref="content" :class="{active : !getIsHasValue && isClicked && editContent.length === 0}" placeholder="예) (상황) 동아리 연말 나눔행사의 예산 부족 문제 해결을 학교 주변 가게 후원으로 해결하기 위해 (행동) 총 47개 매장의 사장님을 만나 나눔행사의 취지를 설명하고, 동아리 단톡방, 페이스북 및 안내 팜플릿 홍보를 약속하여 (결과) 4개 매장의 후원을 이끌어 냄")
          p(style="white-space: pre-line") {{getAEditContent}}
        .error-msg
          p(v-show="!getIsHasValue && isClicked && editContent.length === 0") 내용을 입력해주세요!
        .group-btn
          button.next(type="button" @click="setShowNextStep(false)") 이전단계
          button.prev(type="button" @click="setSave()") 경험저장
      div
        h1 나의경험
        ul
          li(v-for="(list, index) in getAListEdit")
            | {{list.title}}
            button(type="button") 닫기
        .group-btn
          button.prev(type="button" @click="setNextPage('next')") 경험저장
</template>

<script>
import CListcomponent from './util/list-component'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Join',
  data () {
    return {
      isClicked: false,
      isHasValue: false,
      onlyOne: false
    }
  },
  components: {
    CListcomponent
  },
  computed: {
    // 타이틀 값을 v-model로 연결하는 방법
    editTitle: {
      set (value) {
        // 값을 저장하는 역활
        let payload = {
          'value': value,
          'type': 'title'
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
          'type': 'content'
        }
        this.$store.dispatch('setValue', payload)
      },
      get () {
        return this.$store.getters.getAEditContent
      }
    },
    ...mapGetters([
      'getAdvantageList',
      'getIsHasValue',
      'getEdit',
      'getAListEdit',
      'getAEditTitle',
      'getAEditContent'
    ])
  },
  methods: {
    ...mapActions([
    ]),
    // 다음페이지로 연결
    setNextPage (payload) {
      this.isClicked = true
      let getIsHasValue = this.$store.getters.getIsHasValue
      switch (payload) {
        case 'prev':
          this.$router.push({ name: 'JoinPage2' })
          this.$store.dispatch('setChageHasValue')
          break
        case 'next':
          if (getIsHasValue === true) {
            this.isClicked = false
            this.$store.dispatch('setSaveContent', this.edit)
          }
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
    },
    setSave () {
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
      if (title.length !== 0 && content.length !== 0) {
        this.isClicked = false
        let payload = {
          'title': this.$store.getters.getAEditTitle,
          'content': this.$store.getAEditContent
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
@import "./../sass/partials/_fonts";
@import "./../sass/partials/_color";
@import "./../sass/partials/_mixin";

.data-area {
  padding: 20px 10px;
  border: 1px solid #dedfdf;
  background: #eeefef;
}
h1.join-title {
  font-size: $font-m;
  margin-bottom: 10px;
  text-align: left;
}
h2.join-title {
  font-size: $font-m;
  margin-bottom: 10px;
  text-align: left;
}
.cover {
  @include clearfix;
  margin-top: 50px;
  > div {
    float: left;
    border: 1px solid #dedfdf;
    box-sizing: border-box;
    padding: 20px;
    &:first-of-type {
      width: 69%;
      margin-right: 1%;
    }
    &:last-of-type {
      width: 30%;
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
    }
  }
  .input-area {
    font-size: $font-m;
    input[type="text"] {
      width: 80%;
      margin-right: 5px;
      padding: 20px 10px;
      border: 1px solid #dedfdf;
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
      border: 1px solid #dedfdf;
      padding: 20px 10px;
      font-size: $font-m;
      &.active {
        border: 1px solid $color-point;
      }
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
