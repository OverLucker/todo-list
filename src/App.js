import React, { Component } from 'react';
import {ToDoItem} from './ToDoItem/ToDoItem';
import './App.css';


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

  setItemName = (index) => (event) => {
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
