export default {
  // state
  state: {
    advantageList: [
      {
        'text': '책임감',
        'value': false
      },
      {
        'text': '도전정신',
        'value': false
      },
      {
        'text': '성과지향',
        'value': false
      },
      {
        'text': '글로벌 마인드',
        'value': false
      },
      {
        'text': '능동성',
        'value': false
      },
      {
        'text': '팀워크 지향',
        'value': false
      },
      {
        'text': '문제해결능력',
        'value': false
      },
      {
        'text': '학습능력',
        'value': false
      },
      {
        'text': '창의력',
        'value': false
      },
      {
        'text': '꼼꼼함',
        'value': false
      },
      {
        'text': '의사소통능력',
        'value': false
      },
      {
        'text': '열정/근성',
        'value': false
      },
      {
        'text': '대인관계(신뢰,친화력)',
        'value': false
      },
      {
        'text': '계획/조직화',
        'value': false
      }
    ],
    isHasValue: false,
    isFirstList: false,
    edit: {
      content: ''
    },
    lastValue: null,
    valueCount: [],
    aListEdit: [],
    aEdit: {
      title: '',
      content: ''
    },
    isPopup: false,
    popupValue: '',
    changeIndex: undefined
  },
  // getters
  getters: {
    getAdvantageList (state) {
      return state.advantageList
    },
    getIsHasValue (state) {
      return state.isHasValue
    },
    getEdit (state) {
      return state.edit
    },
    getLastValue (state) {
      return state.lastValue
    },
    getAListEdit (state) {
      return state.aListEdit
    },
    getAEditTitle (state) {
      return state.aEdit.title
    },
    getAEditContent (state) {
      return state.aEdit.content
    },
    getPopupValue (state) {
      return state.popupValue
    },
    getIsPopup (state) {
      return state.isPopup
    },
    getFirstList (state) {
      return state.isFirstList
    },
    getChangeIndex (state) {
      return state.changeIndex
    }
  },
  // mutations
  mutations: {
    // 값이 있는지 없는지 바꿔주는 부분
    setChageHasValue (state, payload) {
      if (payload === false) {
        state.isHasValue = false
      } else {
        state.isHasValue = true
      }
    },
    // 강점 리스트에서 체크된 상황 변화
    setChangeAdvantage (state, payload) {
      state.isHasValue = false
      payload = payload * 1
      let advantageList = state.advantageList
      for (var i = 0; i < advantageList.length; i++) {
        if (payload === i) {
          if (advantageList[i].value === false) {
            advantageList[i].value = true
          } else {
            advantageList[i].value = false
          }
        }
      }
      for (let item in advantageList) {
        if (advantageList[item].value === true) {
          state.isHasValue = true
        }
      }
    },
    // 값의 변화
    setChangeContent (state, payload) {
      switch (payload) {
        case 'true':
          state.isHasValue = true
          break
        case 'false':
          state.isHasValue = false
          break
      }
    },
    // edit 내용
    setSaveContent (state, payload) {
      state.edit.content = payload.content
    },
    // 리스트 중 마지막에 특정 클래스 넣음
    setValueLastIndex (state) {
      let advantageList = state.advantageList
      let count = state.valueCount
      for (var i = 0; i < advantageList.length; i++) {
        if (advantageList[i].value === true) {
          count.push(i)
        }
      }
      state.lastValue = count[count.length - 1]
    },
    // 리스트 저장
    setSave (state, payload) {
      let stateAListEdit = state.aListEdit
      let setPayload = {
        'title': payload.title,
        'content': payload.content
      }
      if (payload.index === undefined) {
        stateAListEdit.push(setPayload)
      } else if (payload.index !== undefined) {
        stateAListEdit.splice(payload.index, 1, setPayload)
        state.changeIndex = undefined
      }
    },
    // 값을 v-model로 연결하는 방법
    setValue (state, payload) {
      let value = payload.value
      if (payload.index !== undefined) {
        state.changeIndex = payload.index
      }
      switch (payload.type) {
        case 'title':
          state.aEdit = {...state.aEdit, title: value}
          break
        case 'content':
          state.aEdit = {...state.aEdit, content: value}
          break
      }
    },
    // 값을 저장후 초기화
    setClear (state) {
      let stateAEdit = state.aEdit
      stateAEdit.title = ''
      stateAEdit.content = ''
    },
    // 팝업 관련
    setPopup (state, payload) {
      state.isPopup = true
      state.popupValue = payload
    },
    setClose (state) {
      state.isPopup = false
    },
    // 해당 리스트 삭제
    setDelete (state, payload) {
      let stateAListEdit = state.aListEdit
      let idx = stateAListEdit.indexOf(payload)
      if (idx === -1) {
        stateAListEdit.splice(payload, 1)
      }
    },
    setFirstList (state) {
      state.isFirstList = true
    }
  },
  // actions
  actions: {
    // 값이 있는지 없는지 바꿔주는 부분
    setChageHasValue ({commit}, payload) {
      commit('setChageHasValue', payload)
    },
    // 강점 리스트에서 체크된 상황 변화
    setChangeAdvantage ({commit}, payload) {
      commit('setChangeAdvantage', payload)
    },
    // 값의 변화
    setChangeContent ({commit}, payload) {
      commit('setChangeContent', payload)
    },
    // edit 내용
    setSaveContent ({commit}, payload) {
      commit('setSaveContent', payload)
    },
    // 리스트 중 마지막에 특정 클래스 넣음
    setValueLastIndex ({commit}) {
      commit('setValueLastIndex')
    },
    // 리스트 저장
    setSave ({commit}, payload) {
      commit('setSave', payload)
    },
    // 값을 v-model로 연결하는 방법
    setValue ({commit}, payload) {
      commit('setValue', payload)
    },
    // 값을 저장후 초기화
    setClear ({commit}) {
      commit('setClear')
    },
    // 팝업 관련
    setPopup ({commit}, payload) {
      commit('setPopup', payload)
    },
    setClose ({commit}) {
      commit('setClose')
    },
    // 해당 리스트 삭제
    setDelete ({commit}, payload) {
      commit('setDelete', payload)
    },
    // 수정
    setRewrite ({commit, state}, payload) {
      let changePayload = state.aListEdit[payload]
      let changePayloadTitle = {
        'type': 'title',
        'value': changePayload.title,
        'index': payload
      }
      let changePayloadContent = {
        'type': 'content',
        'value': changePayload.content,
        'index': payload
      }
      commit('setValue', changePayloadTitle)
      commit('setValue', changePayloadContent)
    },
    // 리스트에 값이 처음인지 확인
    setFirstList ({commit}) {
      commit('setFirstList')
    }
  }
}
