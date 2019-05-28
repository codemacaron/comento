<template lang="pug">
  div.cover
    h1
      strong(v-for="(list, index) in getAdvantageList")
        span(v-show="list.value") {{ list.text }}
      | 이(가) 뛰어나다는 것은 어떤 의미인가요?
    h1
      | 저는
      strong(v-for="(list, index) in getAdvantageList")
        span(v-show="list.value") {{ list.text }}
      | 이(가) 뛰어나다는 것을
    p 의사소통능력 / 단순히 내가 하고싶은 말을 상대방에게 잘 전달하는 것이 아니라, 상대가 공동의 문제에 공감하게 하고 협력을 이끌어 낼 수 있는 것
    .editor-area
      vue-html5-editor(@change="contentChange" :content="rtnMap.notice.content" :height="500" :z-index="0")
    p 이라고 생각해요.
    div
      button(type="button" @click="setNextPage('isFirstPage')") 이전단계
      button(type="button" @click="setNextPage('isThirdPage')") 저장 후 다음단계

    p 강점을 선택해주세요! {{getIsHaveValue}}
</template>

<script scope>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Join',
  data () {
    return {
      text: '',
      rtnMap: {
        notice: {
          rnum: '',
          notiId: '',
          cateDiv: '_all_',
          mcDispYn: '',
          webDispYn: '',
          sdkDispYn: '',
          homepageDispYn: '',
          merchantFilterYn: 'N',
          sdkFilterYn: 'N',
          sdkFilterCond: '',
          title: '',
          content: '',
          periodLimitYn: 'Y',
          startDate: '',
          endDate: '',
          regUserId: '',
          updUserId: '',
          userNm: '',
          regDttm: '',
          updDttm: '',
          status: '',
          displayPlc: '00',
          division: '01'
        },
        merchants: [{
          mxId: '',
          mctNm: ''
        }],
        sdks: [{
          sdkId: ''
        }]
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
      'setNextPage'
    ]),
    contentChange (data) {
      this.rtnMap.notice.content = data
    }
  }
}

</script>

<style lang="scss" scoped>
@import "./../sass/App.scss";
// 변수 모음
$height: 50px;
$top-height: calc(50px * 2);
$padding: 10px;
$double-padding: calc(10px * 2);
* {
  box-sizing: border-box;
}
.a11y-hidden {
  @extend %readable-hidden;
}
[v-cloak] {
  display: none;
}
.cover {
  @include clearfix;
  padding: 0 0 10px 0;
  border-bottom: $border;
}
h1 {
  strong {
    > span {
      &::before,
      &::after {
        content: "`";
        display: inline-block;
      }
    }
  }
}
</style>
