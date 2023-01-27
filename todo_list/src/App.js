import React from "react";
import "./App.css";
const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false,
    }

    if (newTodo.text.length > 0) {
      setTodos([...todos].concat(newTodo))
      setTodo("")
    }
    else {
      alert("enter valid task");
      setTodo("")
    }
  }

  const handleRemove = id => {
    let text = "Are you sure? \n Ok to confirm or CANCEL to go back"
    if (window.confirm(text) === true) {
      setTodos(oldValues => {
        return oldValues.filter(task => task.id !== id)
      })
    }

  }

  const toggleComplete = id => {
    let updatedTodos = [...todos].map((task)=>{
      if(task.id ===id){
        task.completed= !task.completed
        task.message = "completed"
      }
      return task
    })
    setTodos (updatedTodos)
  }


  return (
    <div className="App">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          align="right"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
          placeholder="Add a new task"
        />
        <button type="submit">Add Todo</button>
      </form>
      <div className="todo" style={{ textAlign: 'center' }}>
        <ul style={{ listStyleType: 'none' }}>
          {todos.map(task => {
            return (<li key={task.id} style={{ border: '1px solid black', margin: "20px", padding: "20px", listStylePosition: 'inside' }}>
              <span style={{color:'green', padding: '10px' }}>{task.message}</span>
              <input type="checkbox" id='completed' checked={task.completed} onChange={ () => toggleComplete(task.id)}/>
              <span style={{ padding: '10px' }}>{task.text}  </span>

              <button onClick={() => handleRemove(task.id)}>Delete</button>
            </li>)
          })}


        </ul>
      </div>


    </div>



  );
};
export default App;
