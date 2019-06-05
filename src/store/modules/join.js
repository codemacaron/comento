
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
    advantageListText: [],
    isHaveValue: false,
    edit: {
      content: ''
    }
  },
  // getters
  getters: {
    getAdvantageList (state) {
      return state.advantageList
    },
    getAdvantageListText (state) {
      return state.advantageListText
    },
    getIsHaveValue (state) {
      return state.isHaveValue
    },
    getEdit (state) {
      return state.edit
    }
  },
  // mutations
  mutations: {
    // 강점 리스트에서 체크된 상황 변화
    setChangeAdvantage (state, payload) {
      state.isHaveValue = false
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
          state.isHaveValue = true
        }
      }
    },
    // 값의 변화
    setChangeContent (state, payload) {
      switch (payload) {
        case 'true':
          state.isHaveValue = true
          break
        case 'false':
          state.isHaveValue = false
          break
      }
    },
    // edit 내용
    setSaveContent (state, payload) {
      state.edit.content = payload.content
      console.log(state.edit.content)
    }
  },
  // actions
  actions: {
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
    }
  }
}
