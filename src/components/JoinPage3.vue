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
          input(type="text" ref="title" :class="{active : !getIsHasValue && isClicked && edit.title.length === 0}" v-model="edit.title" placeholder="예) 스노우보드 동아리")
          | 을(를) 할때
        .error-msg
          p(v-show="!getIsHasValue && isClicked && edit.title.length === 0") 타이틀을 입력해주세요!
        h2.join-title
          CListcomponent
          | 을(를) 발휘한 에피소드를 자세히 알려주세요.
        div.text-area
          textarea(v-model="edit.content" ref="textcontent" :class="{active : !getIsHasValue && isClicked && edit.content.length === 0}" placeholder="예) (상황) 동아리 연말 나눔행사의 예산 부족 문제 해결을 학교 주변 가게 후원으로 해결하기 위해 (행동) 총 47개 매장의 사장님을 만나 나눔행사의 취지를 설명하고, 동아리 단톡방, 페이스북 및 안내 팜플릿 홍보를 약속하여 (결과) 4개 매장의 후원을 이끌어 냄")
        .error-msg
          p(v-show="!getIsHasValue && isClicked && edit.content.length === 0") 내용을 입력해주세요!
        .group-btn
          button.next(type="button" @click="setShowNextStep(false)") 이전단계
          button.prev(type="button" @click="setSave()") 경험저장
      div
        h1 나의경험
        ul
          li
            | text
            button(type="button") 닫기
        .group-btn
          button.prev(type="button" @click="setNextPage('next')") 경험저장
</template>

<script scope>
import CListcomponent from './util/list-component'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Join',
  data () {
    return {
      isClicked: false,
      isHasValue: false,
      onlyOne: false,
      edit: {
        title: '',
        content: ''
      }
    }
  },
  components: {
    CListcomponent
  },
  computed: {
    ...mapGetters([
      'getAdvantageList',
      'getIsHasValue',
      'getEdit'
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
            this.$router.push({ name: 'JoinPage4' })
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
      // let edit = this.edit
      let title = this.edit.title
      let content = this.edit.content
      let titleTrim = title.trim()
      let contentTrim = content.trim()
      this.isClicked = true
      // let getIsHasValue = this.$store.getters.getIsHasValue
      if (titleTrim.length === 0 || contentTrim.length === 0) {
        this.$store.dispatch('setChageHasValue', false)
        this.isClicked = true
        if (titleTrim.length === 0) {
          return this.$refs.title.focus()
        } else if (contentTrim.length === 0) {
          return this.$refs.textcontent.focus()
        }
      }
      // if (getIsHasValue === true && title.length > 0 && content.length > 0) {
      //   this.$store.dispatch('setSave', edit)
      //   this.$store.dispatch('setChageHasValue')
      //   this.isClicked = false
      // }
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
      &.active{
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
      &.active{
        border: 1px solid $color-point;
      }
    }
  }
}
.error-msg {
  margin-top: 10px;
  margin-bottom: 50px;
  p{
    text-align: left;
    font-size: $font-m;
  }
}
</style>
