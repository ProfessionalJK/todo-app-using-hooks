import React, { useState } from 'react';
import './App.css';

function Empty(){
  return(
    <div>
      <h3>To-Do list is Empty. Please add some tasks!!!</h3>
    </div>
  );
}

function Todo({todo, index, completeTodo, removeTodo}){  
  return(
    <div className="todo" 
    style={{textDecoration: todo.isCompleted? "line-through":""}}>
      {todo.text}
      <div>
        <button onClick={() => completeTodo(index)}>&#10003;</button>
        <button onClick={() => removeTodo(index)}>X</button>
      </div>
    </div>
  );
}

function TodoForm({ addTodo }){
  const [value, setValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!value) return;
    addTodo(value);
    setValue("");
  };

  return(
    <form onSubmit={handleSubmit}>
      <input type="text" className="todo" value={value} style={{width:`95.5%`}} placeholder="Type the task and press Enter!!!" onChange={e => setValue(e.target.value)}/>
    </form>
  );
}

function App(){
  const [todos, setTodos] = useState([{text: "", isCompleted:false}]);
  
  const addTodo = (text) => {
    const newTodos = [...todos, {text}];
    setTodos(newTodos);
  };

  const completeTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };
  
  return(
      <div className="app">        
        <div className="todo-list">
          <h1 className="title">Todo App</h1>
          <TodoForm addTodo={addTodo} />
          {todos.map((todo, index) => (
            todos.length > 1 ?(todo.text===""?"":<Todo key={index} index={index} todo={todo} completeTodo={completeTodo} removeTodo={removeTodo}/>):(<Empty />)
          ))}
          {todos.length>1?(<div><h2 className='footer'>Thank you for adding tasks in the list!!!</h2></div>):""}
          </div>
      </div>
    );
}

export default App;