import React, { useState, useEffect } from 'react';
import './App.css';

function Todo({todo, index, completeTodo, redoTodo, removeTodo}){  
  return(
    <div className="todo" 
    style={{textDecoration: todo.isCompleted? "line-through":""}}>
      {todo.text}
      <div>
        <button name="complete" onClick={() => completeTodo(index)} style={{float: "left"}}><b>&#10003;</b></button>
        <button class="redo" onClick={() => redoTodo(index)} style={{float: "left"}}><b>&#8634;</b></button>
        <button onClick={() => removeTodo(index)} style={{float: "left"}}><b>&#10539;</b></button>
      </div>
    </div>
  );
}

function TodoForm({ addTodo }){
  const [value, setValue] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!value) return;
    if(value.match(/^\d/) || value.match(/^\W/) || value.startsWith("_"))
      return(
        setValue(""),
        alert("Task should not starts except alphabets!!!")
        
    );
    addTodo(value);
    setValue("");
  };

  if(value!==""){
    if(!value.match(/^\d/) && !value.match(/^\W/) && !value.startsWith("_"))
      document.getElementsByName("task")[0].style.color = "green";
    else
      document.getElementsByName("task")[0].style.color = "red";
  }    

  return(
    <form onSubmit={handleSubmit}>
      <input name="task" type="text" className="todo" value={value} style={{width:`95.5%`}} placeholder="Type the task and press Enter!!!" onChange={e => setValue(e.target.value)}/>
    </form>
  );
}

function App(){
  const [todos, setTodos] = useState([]);
  
  const checkTasksLeft = () => {
    const totalTasks = todos.length;
    var completedTasks = 0;
    todos.map((todo, index) => 
      (todo.isCompleted === true ? completedTasks += 1 : "")
    );
    return (totalTasks - completedTasks);
  }

  const addTodo = (text) => {
    const newTodos = [...todos,{text}]
    setTodos(newTodos);
  };

  const completeTodo = (index) => {
    document.getElementsByName("complete")[index].style.display = "none";
    document.getElementsByClassName("redo")[index].style.display = "block";
    const newTodos = [...todos];
    todos[index].isCompleted ? newTodos[index].isCompleted = false : newTodos[index].isCompleted = true;
    setTodos(newTodos);
    /*const itemsLeft = checkTasksLeft();
    if(itemsLeft === 0){
      setTodos([]);
    }*/
  };
  const redoTodo = (index) => {
    document.getElementsByName("complete")[index].style.display = "block";
    document.getElementsByClassName("redo")[index].style.display = "none";
    const newTodos = [...todos];
    if(todos[index].isCompleted)
      newTodos[index].isCompleted = false;
    setTodos(newTodos);
  }
  const removeTodo = (index) => {
    const newTodos = [...todos]
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };
  
  useEffect(() => {
    var presentTasks = checkTasksLeft();
    if(todos.length === 0){
      document.getElementsByClassName("footer")[0].innerHTML = "To-Do list is Empty. Please add some tasks!!!";
    }
    else if(presentTasks === 0){
      document.getElementsByClassName("footer")[0].innerHTML = "All tasks are completed. No task is left!!!";
    }
    else if(presentTasks === 1){
      document.getElementsByClassName("footer")[0].innerHTML = "There is "+presentTasks+" task left!!!";
    }
    else{
      document.getElementsByClassName("footer")[0].innerHTML = "There are "+presentTasks+" tasks left!!!";
    }
  });
    
  return(
      <div className="app">        
        <div className="todo-list">
          <h1 className="title">Todo App</h1>
          <TodoForm addTodo={addTodo} />
          {todos.map((todo, index) => (
            <Todo key={index} index={index} todo={todo} completeTodo={completeTodo} redoTodo={redoTodo} removeTodo={removeTodo}/>
          ))}
          <h2 className='footer'></h2>
          </div>
      </div>
    );
}

export default App;