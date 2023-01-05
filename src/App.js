import './App.css';
import {useState} from 'react'
import TodoList from './component/TodoList';
import InputField from './component/InputField';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('')
  const newTodo = () =>{
    if(text.trim().length) {
      setTodos([
        ...todos,
        {
          id: new Date().toISOString(),
          text,
          success: false
        }
      ])
      setText('')
    }
  }

  const deleteTodo = (todoId) =>{ 
    setTodos(todos.filter( todo => todo.id !== todoId))
  }

  const changeSuccess = (todoId) => {
    setTodos(
      todos.map( todo => {
        if(todo.id !== todoId){
          return todo
        }
        return {
          ...todo,
          success: !todo.success
        }
      })
    );
  }

  return (
    <div className="App">
      <header className="App-header">
       <InputField text={text} newTodo={newTodo} setText={setText}/>
       <TodoList todos={todos} changeSuccess={changeSuccess} deleteTodo={deleteTodo}/>
      </header>
    </div>
  );
}

export default App;
