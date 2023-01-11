import './App.css';
import {useState, useEffect} from 'react'

import { useDispatch, useSelector } from 'react-redux'

import {/* addNewTodo, */ loadTodoList, addNewTodoItem} from './store/todoSlice'

import TodoList from './component/TodoList';
import InputField from './component/InputField';
import namesPictures from './namesPictures.png'

function App() {
  const dispatch = useDispatch()

  const [text, setText] = useState('')

  const {status, error} = useSelector(state => state.todos)

  useEffect( ()=> {
    dispatch(loadTodoList())
  }, [dispatch])

  const askTask = () => {
    dispatch(addNewTodoItem({text}));
    setText('')
  }

  return (
    <div className="App">
      <header className="App-header">
       <InputField text={text} newTodo={askTask} setText={setText}/>

       { status === 'loading' && <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}

       { error && <img alt='Houston, we have a problem' src={namesPictures} />}

       <TodoList/>
      </header>
    </div>
  );
}

export default App;
