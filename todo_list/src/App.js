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

  const [todoEditing, setTodoEditing] = React.useState(null)
  const [editingText, setEditingText] = React.useState ("")

  const handleEdit = id =>{
    let updateEdit = [...todos].map ((task) => {
      if(task.id ===id) {
        task.text=editingText;

      }
      return task
    })
    setTodos(updateEdit)
    setTodoEditing(null)
  }
 /* The first argument passed to useEffect is a callback function that runs after 
 the component is rendered and any time the variables in the second argument change.
  In this case, the callback is the function that retrieves the data from the local storage or saves it to the local storage, 
 and the second argument is an empty array, which means that the effect will run only once, 
 when the component is first rendered and not on any re-render*/
 
  React.useEffect(() => {
    const json = localStorage.getItem('todos')
    const loadedTodos= JSON.parse(json)
    if (loadedTodos){
      setTodos(loadedTodos)
    }
  }, []) 
  /* This first useEffect used to check if there is any data in the local storage, when the component is first rendered. 
  If there is any data, it retrieves the data and sets it to the state of the component. */

  React.useEffect (() => {
    const json= JSON.stringify(todos)
    localStorage.setItem('todos',json)
  }, [todos])

  /* this second useEffect used to save the todos to the local storage, whenever the todos state is updated. 
  This way the data is always up to date in the local storage and can be retrieved even if the page is refreshed. */
      
    
  


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
              <span style={{color:'green', padding: '10px' }}>{task.completed ? task.message : ""}</span>
              <input type="checkbox" id='completed' checked={task.completed}  onChange={ () => toggleComplete(task.id)}/>
              {task.id === todoEditing ? (<span style={{ padding: '10px' }}> <input type='text' onChange={(e) => setEditingText (e.target.value)} /> </span>) : (<span style={{ padding: '10px' }}> {task.text} </span>)}
              {task.id===todoEditing ? (<button onClick={() => handleEdit(task.id)}>Submit edit </button>) :
              (<button onClick={() => setTodoEditing(task.id)}>Edit</button>) }

              <span style={{ padding: '10px' }}><button style={{backgroundColor:'red'}} onClick={() => handleRemove(task.id)}>Delete</button></span>
              
            </li>)
          })}


        </ul>
      </div>


    </div>



  );
};
export default App;
