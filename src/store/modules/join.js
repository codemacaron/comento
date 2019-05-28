
export default {
  // state
  state: {
    try: false,
    isFirstPage: true,
    isSecondPage: false,
    isThirdPage: false,
    isFourthPage: false,
    isFifthPage: false,
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
    isHaveValue: true
  },
  // getters
  getters: {
    getTry (state) {
      return state.try
    },
    getIsFirstPage (state) {
      return state.isFirstPage
    },
    getIsSecondPage (state) {
      return state.isSecondPage
    },
    getIsThirdPage (state) {
      return state.isThirdPage
    },
    getIsFourthPage (state) {
      return state.isFourthPage
    },
    getIsFifthPage (state) {
      return state.isFifthPage
    },
    getAdvantageList (state) {
      return state.advantageList
    },
    getAdvantageListText (state) {
      return state.advantageListText
    },
    getIsHaveValue (state) {
      return state.isHaveValue
    }
  },
  // mutations
  mutations: {
    // 리스트 로딩
    setTry (state, payload) {
      if (payload === 'show') {
        state.try = true
      } else if (payload === 'noshow') {
        state.try = false
      }
    },
    setChangeAdvantage (state, payload) {
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
    },
    setNextPage (state, payload) {
      let HaveValue = state.isHaveValue
      switch (payload) {
        case 'isFirstPage':
          state.isFirstPage = true
          state.isSecondPage = false
          state.isThirdPage = false
          state.isFourthPage = false
          state.isFifthPage = false
          break
        case 'isSecondPage':
          let advantageList = state.advantageList
          HaveValue = false
          for (var i = 0; i < advantageList.length; i++) {
            if (advantageList[i].value === true) {
              HaveValue = true
            }
          }
          if (HaveValue) {
            HaveValue = true
            state.isFirstPage = false
            state.isSecondPage = true
            state.isThirdPage = false
            state.isFourthPage = false
            state.isFifthPage = false
          }
          break
        case 'isThirdPage':
          state.isFirstPage = false
          state.isSecondPage = false
          state.isThirdPage = true
          state.isFourthPage = false
          state.isFifthPage = false
          break
        case 'isFourthPage':
          state.isFirstPage = false
          state.isSecondPage = false
          state.isThirdPage = false
          state.isFourthPage = true
          state.isFifthPage = false
          break
        case 'isFifthPage':
          state.isFirstPage = false
          state.isSecondPage = false
          state.isThirdPage = false
          state.isFourthPage = false
          state.isFifthPage = true
          break
      }
    }
  },
  // actions
  actions: {
    // 리스트 로딩
    setTry ({commit}, payload) {
      commit('setTry', payload)
    },
    setChangeAdvantage ({commit}, payload) {
      commit('setChangeAdvantage', payload)
    },
    setNextPage ({commit}, payload) {
      commit('setNextPage', payload)
    }
  }
}
