
class Store {

    constructor(reducer, initialState) {
        this._state = initialState;
        this._reducer = reducer;
        this._listeners = [];
    }

    getState() {
        return this._state;
    }

    dispatch(action) {
        this._state = this._reducer(this._state, action);
        this._triggerListeners();
    }

    subscribe(listener) {
        const id = new Date().getTime()
        const newListener = {
            callback: listener,
            id: id
        };
        this._listeners.push(newListener);
        //returns unsubscribe function
        return () => {
            this._listeners = this._listeners.filter(l => l.id !== id);
        }
    }

    _triggerListeners(){
        this._listeners.forEach(listener => {
            listener.callback();
        });
    }

}

export const createStore = (reducer, initialState) => {
    return new Store(reducer, initialState);
} 