
import { SET_CITY } from '../actions'

// reducers
export const city = (state = {}, action) => {
    switch(action.type) {
        case SET_CITY:
            return { ...state, city: action.payload }
        default:
            return state
    }
}