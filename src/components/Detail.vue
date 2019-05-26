<template lang="pug">
  main(v-cloak)
    div.cover
      div.post
        h1 {{post.title}}
        ul
          li
            strong No
            span {{post.no}}
          li
            strong 작성일
            span {{post.updated_at}}
          li
            strong 카테고리
            span(v-show="post.category_no === '1'") Apple
            span(v-show="post.category_no === '2'") Banana
            span(v-show="post.category_no === '3'") Coconut
          li
            strong 이메일
            span {{post.email}}
          li
            strong 댓글 수
            span(v-show="replies.length !== 0") {{replies.length}}
            span(v-show="replies.length === 0") 0
        p
          strong 내용
          span {{post.contents}}
        a.link-goto-list(@click="onClickRenderLink()") 목록으로 가기
      div.replies(v-show="replies.length !== 0")
        h1 댓글
        ul(v-for="(reply, index) in replies")
          li
            ul
              li
                strong 댓글
                span {{index}}
              li
                strong No
                span {{reply.no}}
              li
                strong 작성일
                span {{reply.updated_at}}
              li
                strong 작성자 No
                span {{reply.user_no}}
              li
                strong 이메일
                span {{reply.email}}
            p
              strong 내용
              span {{reply.contents}}
    div.join
      h1.a11y-hidden 회원가입
      div.only-web
        p
          | 지금 가입하면 꿈꾸던 기업에 제직 중인 현직자와
          strong 익명
          | 으로 대화할 수 있습니다.
        p
          button.btn-join(type="button" @click="onJoin('open')") SNS계정으로 빠른 회원가입
          | 또는
          button.btn-login(type="button") 로그인
      div.only-mobile
        p
          | 지금 가입하면 꿈꾸던 기업에 제직
          br
          | 중인 현직자와
          strong 익명
          | 으로 대화할 수 있습니다.
        button.btn-join-m(type="button" @click="onJoin('open')") 회원가입
    div.join-popup(v-show="this.join === false")
      div
        h1 회원가입
        p
          | 지금 가입하면 꿈꾸던 기업에 재직 중인 현직자와
          strong 익명
          | 으로 대화할 수 있습니다.
        button.btn-facebook(type="button") 페이스북 계정으로 회원가입
        button.btn-google(type="button") 구글 계정으로 회원가입
        button.btn-naver(type="button") 네이버 계정으로 회원가입
        button.btn-later(type="button" @click="onJoin('close')") 나중에 하기

</template>

<script>
import axios from 'axios'
// import {mapGetters, mapActions} from 'vuex'
import { mapGetters } from 'vuex'

export default {
  name: 'Detail',
  data () {
    return {
      join: false,
      no: '',
      post: '',
      replies: []
    }
  },
  computed: {
    ...mapGetters([
      'getFilter'
    ])
  },
  methods: {
    // 동적 라우터 연결
    onClickRenderLink () {
      let payload = false
      this.$store.dispatch('setChangePage', payload)
      this.$router.push({ name: 'Main' })
    },
    onJoin (pram) {
      switch (pram) {
        case 'open':
          this.join = false
          break
        case 'close':
          this.join = true
          break
      }
    }
  },
  mounted () {
    this.no = this.$route.query.no
    let detailAPI = 'https://comento.cafe24.com/detail.php?req_no=' + this.no
    // detail 받아오기
    axios.get(detailAPI).then((response) => {
      console.log('detail :::: ', response.data.detail)
      console.log('detail-replies :::: ', response.data.detail.replies)
      this.post = response.data.detail.article
      this.replies = response.data.detail.replies
      console.log('this.replies :::: ', this.replies)
    }).catch(error => console.error('실행실패 ::: ', error.message))
  }
}

</script>

<style lang="scss" scoped>
@import "./../sass/App.scss";
// 변수 모음
$height: 50px;
* {
  box-sizing: border-box;
}

.a11y-hidden {
  @extend %readable-hidden;
}

[v-cloak] {
  display: none;
}

main {
  border: $border;
  padding: 50px;
}

.cover {
  border-top: 2px solid $color-border;
  border-bottom: 2px solid $color-border;
  p {
    line-height: 30px;
    padding-left: 10px;
    padding-right: 10px;
  }
  strong {
    font-weight: bold;
    &::after {
      content: ":";
      display: inline-block;
      margin: 0 5px;
    }
  }
  .post {
    position: relative;
    padding: 0 0 100px 0;
    @include clearfix;
    > h1 {
      padding: 10px;
      margin-bottom: 10px;
      border-bottom: $border;
      font-size: $font-l;
      font-weight: bold;
    }
    > ul {
      padding-bottom: 10px;
      padding-left: 10px;
      padding-right: 10px;
      margin-bottom: 10px;
      border-bottom: $border;
      li {
        font-size: $font-m;
        &:first-of-type {
          margin-left: 0;
        }
      }
    }
  }
  .replies {
    padding-bottom: 50px;
    margin-top: 50px;
    h1 {
      padding: 10px;
      margin-bottom: 10px;
      border-top: 2px solid $color-border;
      border-bottom: 2px solid $color-border;
      font-weight: bold;
      font-size: $font-m;
    }
    > ul {
      margin-bottom: 10px;
      > li {
        padding-top: 10px;
        margin-bottom: 20px;
        border-top: $border;
        border-bottom: $border;
        ul {
          padding-left: 10px;
          padding-right: 10px;
          padding-bottom: 10px;
          border-bottom: $border;
          li {
            font-size: $font-m;
          }
        }
      }
    }
  }
}

button,
a {
  display: block;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  border: 0 none;
  font-size: $font-m;
  &.link-goto-list {
    position: absolute;
    margin-left: auto;
    background: $color-point;
    color: $color-white;
    &:hover {
      background: $color-point-dark;
    }
  }
  &.btn-facebook {
    width: 100%;
    height: 40px;
    margin: 0 auto 10px auto;
    padding: 0;
    background: #3b5998;
    color: $color-white;
    line-height: 40px;
    &:hover {
      background: darken(#3b5998, 5%);
    }
  }
  &.btn-google {
    width: 100%;
    height: 40px;
    margin: 0 auto 10px auto;
    padding: 0;
    background: #ea4335;
    color: $color-white;
    line-height: 40px;
    &:hover {
      background: darken(#ea4335, 5%);
    }
  }
  &.btn-naver {
    width: 100%;
    height: 40px;
    margin: 0 auto 10px auto;
    padding: 0;
    background: #00bd39;
    color: $color-white;
    line-height: 40px;
    &:hover {
      background: darken(#00bd39, 5%);
    }
  }
  &.btn-later {
    padding: 0;
    background: $color-white;
    margin: 50px auto 0 auto;
  }
  &.btn-join {
    display: inline-block;
    margin-right: 20px;
    border: $border-point;
    background: $color-white;
    color: $color-point;
    &:hover {
      border: 1px solid $color-point-dark;
      background: $color-point;
      color: $color-white;
    }
  }
  &.btn-login {
    display: inline-block;
    margin-left: 20px;
    border: 1px solid $color-light;
    background: $color-white;
    color: $color-light;
    &:hover {
      border: 1px solid $color-point;
      background: $color-white;
      color: $color-point;
    }
  }
  &.btn-join-m {
    display: block;
    margin: 20px auto 0 auto;
    background: $color-point;
    color: $color-white;
  }
}

input[type="radio"] {
  position: relative;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    width: 20px;
    height: 20px;
    border: $border;
    border-radius: 100% 100%;
    background: #fff;
    font-size: $font-m;
    text-align: center;
    line-height: 25px;
    color: $color-point;
  }
  &:checked {
    &::before {
      content: "●";
    }
  }
}

.join {
  text-align: center;
  p {
    padding-top: 20px;
  }
}

.join-popup {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba($color: #000, $alpha: 0.8);
  > div {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 500px;
    height: auto;
    padding: 30px;
    transform: translate(-50%, -50%);
    background: $color-white;
    h1 {
      font-size: $font-l;
      text-align: center;
    }
    p {
      margin: 30px auto;
      padding: 10px 20px;
      line-height: 30px;
      border: $border;
      word-break: break-all;
      strong {
        color: $color-point;
        margin-left: 5px;
      }
    }
  }
}

@include mobile {
  .only-web {
    display: none;
  }
  .cover {
    .post {
      > ul {
        > li {
          margin-top: 10px;
          &:first-of-type {
            margin-top: 0px;
          }
        }
      }
    }
  }
  .replies {
    > ul {
      > li {
        ul {
          li {
            margin-top: 10px;
            &:first-of-type {
              margin-top: 0px;
            }
          }
        }
      }
    }
  }
  .link-goto-list {
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
  }
}

@include desktop {
  main {
    width: 1000px;
    margin: 100px auto;
  }
}

@include breakpoint(0px, 1200px) {
  main {
    box-sizing: border-box;
    width: 98%;
    margin: 10px auto;
  }
}

@include breakpoint(768px, 999999px) {
  .only-mobile {
    display: none;
  }
  .cover {
    .post {
      > ul {
        @include clearfix;
        > li {
          float: left;
          margin-left: 10px;
          &:first-of-type {
            &::before {
              content: "";
              margin-bottom: 0;
              display: inline-block;
              width: 0;
              height: 0;
              background: none;
              margin-right: 0;
            }
          }
          &::before {
            content: "";
            margin-bottom: -3px;
            display: inline-block;
            width: 1px;
            height: 15px;
            background: #dedfdf;
            margin-right: 10px;
          }
        }
      }
    }
  }
  .replies {
    > ul {
      > li {
        ul {
          @include clearfix;
          li {
            float: left;
            margin-left: 10px;
            &:first-of-type {
              margin-left: 0;
            }
          }
        }
      }
    }
  }
  .link-goto-list {
    bottom: 50px;
    right: 0;
  }
}
</style>
