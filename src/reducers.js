import { INCREMENT, DECREMENT } from './constants';

const initialState = {
    value: 0
};

export const unaryOperatorsReducer = (prevState = initialState, action) => {
    switch (action.type) {
        case INCREMENT:
            return {
                value: prevState.value + 1
            };
        case DECREMENT:
            return {
                value: prevState.value - 1
            };
        default:
            return prevState;
    }
}