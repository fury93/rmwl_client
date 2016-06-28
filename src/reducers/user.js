import SI from 'seamless-immutable'
import reduxCrud from 'redux-crud'

const baseReducers = reduxCrud.reducersFor('users');

function userReducer(state=SI([]), action) {
    switch (action.type) {
        default:
            return baseReducers(state, action)
    }
}

export default userReducer
