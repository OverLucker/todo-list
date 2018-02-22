import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
//
// class ToDoCheckbox extends Component {
//   constructor(props){
//     super(props);
//     this.state = {'done': this.props.done}
//     // this.toggle = this.toggle.bind(this);
//   }
//   getInitialState() {
//     return {
//       'done': this.props.done
//     }
//   }
//   toggle() {
//     // localStorage.setItem()
//     this.setState({done: !this.state.done});
//   }
//   render() {
//     return (
//       <div className="circle non-selectable" onClick={this.toggle.bind(this)}>{this.state.done ? 'X' : '\u00A0'}</div>
//     );
//   }
// }

const ToDoCheckbox = ({ onClick, done }) => {
  return (
    <div className="circle non-selectable" onClick={onClick(!done)}>{done ? 'X' : '\u00A0'}</div>
  )
}

const ToDoItem = ({onClick, onChange, done, name}) => {
  return (
    <div className="item">
      <ToDoCheckbox done={done} onClick={onClick}/>
      <div className="item__name">
        <input onChange={onChange(name)} value={name}/>
      </div>
    </div>
  );
}

class ToDoItemAdd extends Component {
  constructor(props){
    super(props);
    this.state = { name: ""};
  }

  onChange(){

  }
  render() {
    return (
      <input onChange={this.onChange.bind(this)} value={this.state.name} className="item__name" ref="name" placeholder="Еще одна заметка"/>
    );
  }
}

class App extends Component {
  constructor(props){
    super(props);
    try {
      let todos = localStorage.getItem('todo') || "[]";
      this.state = { todos: JSON.parse(todos)};
    }
    catch (syntaxerror) {
      this.state = { todos: []};
      console.warn('Todo data corrupted');
    }
  }
  setItemState = (index) => (done) => () => {
    const { todos } = this.state;
    todos[index].done = done;
    this.setState({ todos });
    localStorage.setItem('todo', JSON.stringify(todos));
  }

  setItemName = (index) => (name) => (event) => {
    const { todos } = this.state;
    todos[index].name = event.target.value;
    this.setState({ todos });
    localStorage.setItem('todo', JSON.stringify(todos));
  }

  addNewItem = () => {
    const { todos } = this.state;
    todos.push({name: '', done: false});
    this.setState({ todos });
    localStorage.setItem('todo', JSON.stringify(todos));
  }

  render() {
    var todos = this.state.todos.map( (x, n) => {
      return (<ToDoItem onClick={this.setItemState(n)} onChange={this.setItemName(n)} key={n} name={x.name} done={x.done} />)
    });
    return (
      <div className="App">
        <div className="App-title">ToDo list by OverLucker</div>
        <div className="App-body">
          {todos}
          <div className="item">
            <div onClick={this.addNewItem} className="circle non-selectable">+</div>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
