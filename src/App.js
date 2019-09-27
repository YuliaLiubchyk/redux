import React from 'react';
import './App.css';
import { createStore } from './Store';
import { unaryOperatorsReducer } from './reducers';
import { increment, decrement } from './actions';

const store = createStore(unaryOperatorsReducer, { value: 0 });
const Context = React.createContext(null);

const { Provider: ContextProvider } = Context;

function Provider(props) {
  console.log(props)
  return <ContextProvider value={props.store}>
    {props.children}
  </ContextProvider>
}

function connect(mapStateToProps) {
  return (Component) => {
    class Connect extends React.Component {
      constructor(props, context) {
        super(props);
        console.log(this)
        this.state = mapStateToProps(context.getState(), props);
        
      }

      componentDidMount() {
        this._unsubscribe = this.context.subscribe(() => {
          this.setState(mapStateToProps(this.context.getState(), this.props));
        })
      }

      componentWillUnmount() {
        this._unsubscribe();
      }

      render() {
        return <Component {...this.props} {...this.state} />
      }   
    }

    Connect.contextType = Context;
    return Connect;
  }
}

function App(props) {
  console.log(props)
  return (
    <div>
      <button onClick={() => store.dispatch(increment())}>Increment</button>
      <div>Value: {props.value}</div>
      <button onClick={() => store.dispatch(decrement())}>Decrement</button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
}

const ConnectedApp = connect(mapStateToProps)(App);

function Root(){
  return (
    <Provider store={store}>
      <ConnectedApp/>
    </Provider>
  )
}

export default Root;

