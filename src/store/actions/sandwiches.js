import { MAKE_SANDWICH, APOLOGIZE, WITHDRAW } from '../types'

export function fetchSecretSauce() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Döner Kebab')
        }, 1000)
    })
}

// These are the normal action creators you have seen so far.
// The actions they return can be dispatched without any middleware.
// However, they only express “facts” and not the “async flow”.

export function makeASandwich(forPerson, secretSauce) {
    return {
        type: MAKE_SANDWICH,
        forPerson,
        secretSauce
    };
}

export function apologize(fromPerson, toPerson, error) {
    return {
        type: APOLOGIZE,
        fromPerson,
        toPerson,
        error
    };
}

export function withdrawMoney(amount) {
    return {
        type: WITHDRAW,
        amount
    };
}

// But what do you do when you need to start an asynchronous action,
// such as an API call, or a router transition?

// Meet thunks.
// A thunk is a function that returns a function.
// This is a thunk.

export function makeASandwichWithSecretSauce(forPerson) {

    // Invert control!
    // Return a function that accepts `dispatch` so we can dispatch later.
    // Thunk middleware knows how to turn thunk async actions into actions.

    return function (dispatch) {
        return fetchSecretSauce().then(
            sauce => dispatch(makeASandwich(forPerson, sauce)),
            error => dispatch(apologize('The Sandwich Shop', forPerson, error))
        );
    };
}

// In fact I can write action creators that dispatch
// actions and async actions from other action creators,
// and I can build my control flow with Promises.

export function makeSandwichesForEverybody() {
    return function (dispatch, getState) {
        if (!getState().sandwiches.isShopOpen) {

            // You don’t have to return Promises, but it’s a handy convention
            // so the caller can always call .then() on async dispatch result.

            return Promise.resolve();
        }

        // We can dispatch both plain object actions and other thunks,
        // which lets us compose the asynchronous actions in a single flow.

        return dispatch(
            makeASandwichWithSecretSauce('My Grandma')
        ).then(() =>
            Promise.all([
                dispatch(makeASandwichWithSecretSauce('Me')),
                dispatch(makeASandwichWithSecretSauce('My wife'))
            ])
        ).then(() =>
            dispatch(makeASandwichWithSecretSauce('Our kids'))
        ).then(() =>
            dispatch(getState().myMoney > 42 ?
                withdrawMoney(42) :
                apologize('Me', 'The Sandwich Shop')
            )
        );
    };
}
