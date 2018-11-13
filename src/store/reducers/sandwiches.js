import { handleActions } from 'redux-actions'
import { MAKE_SANDWICH, APOLOGIZE, WITHDRAW } from '../types'

export default handleActions({
  [MAKE_SANDWICH](state, action) {
    console.log(MAKE_SANDWICH, state, action)
    const newSandwich = `${action.secretSauce} sandwich for ${action.forPerson}`
    return {
      ...state,
      sandwiches: [...state.sandwiches, newSandwich]
    }
  },
  [APOLOGIZE](state, action) {
    console.log(APOLOGIZE, state, action)
    return {
      ...state
    }
  },
  [WITHDRAW](state, action) {
    console.log(WITHDRAW, state, action)
    const amount = state.amount + action.amount
    return {
      ...state,
      amount
    }
  }
}, {
  amount: 100,
  sandwiches: [],
  isShopOpen: true
})