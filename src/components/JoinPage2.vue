<template lang="pug">
  main
    h1
      strong(v-for="(list, index) in getAdvantageList")
        span(v-show="list.value") {{ list.text }}
      | 이(가) 뛰어나다는 것은 어떤 의미인가요?
    h2
      | 저는
      strong(v-for="(list, index) in getAdvantageList")
        span(v-show="list.value") {{ list.text }}
      | 이(가) 뛰어나다는 것을
    .editor-area
      p.point-msg * 의사소통능력 / 단순히 내가 하고싶은 말을 상대방에게 잘 전달하는 것이 아니라, 상대가 공동의 문제에 공감하게 하고 협력을 이끌어 낼 수 있는 것
      vue-html5-editor(@change="contentChange" :content="edit.content" :height="500" :z-index="0")
    h2 이라고 생각해요.
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
      isClicked: false,
      text: '',
      edit: {
        title: '',
        content: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'getAdvantageList',
      'getAdvantageListText',
      'getIsHaveValue'
    ])
  },
  methods: {
    ...mapActions([
      // 'setNextPage'
    ]),
    //
    contentChange (data) {
      let dataTrim = data.trim()
      let dataLength = dataTrim.length
      this.edit.content = data
      if (dataLength !== 0) {
        this.$store.dispatch('setChangeContent', 'true')
        console.log(this.$store.getters.getIsHaveValue)
      }
    },
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
        this.$store.dispatch('setChangeContent', 'false')
      }
    }
  }
}

</script>

<style lang="scss" scoped>
@import "./../sass/partials/_fonts";
@import "./../sass/partials/_color";
h1, h2 {
  font-weight: bold;
}
h1 {
  line-height: 50px;
  text-align: center;
  font-size: $font-xl;
  margin-bottom: 50px;
  strong {
    > span {
      display: inline-block;
      padding: 0 20px;
      margin: 0 5px;
      background: $color-point;
      color: $color-white;
      height: 40px;
      line-height: 40px;
      border-radius: 40px;
      &:hover{
        background: $color-point-dark;
        cursor: default;
      }
    }
  }
}
h2 {
  line-height: 30px;
  margin-bottom: 10px;
  font-size: $font-l;
  &:last-of-type{
    text-align: right;
  }
  strong {
    &:last-of-type{
      > span {
        &::after {
          content: "";
          margin-right: 5px;
        }
      }
    }
    > span {
      margin-left: 10px;
      border-bottom: $border;
      padding-bottom: 2px;
      &::after {
        content: ",";
        display: inline-block;
      }
    }
  }
}

</style>
