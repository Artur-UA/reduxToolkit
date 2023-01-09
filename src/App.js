import './App.css';
import {useState} from 'react'

import { useDispatch } from 'react-redux'

import {addNewTodo} from './store/todoSlice'


import TodoList from './component/TodoList';
import InputField from './component/InputField';


function App() {
  const dispatch = useDispatch()

  const [text, setText] = useState('')

  
  const askTask = () => {
    dispatch(addNewTodo({text}));
    setText('')
  }

  return (
    <div className="App">
      <header className="App-header">
       <InputField text={text} newTodo={askTask} setText={setText}/>
       <TodoList/>
      </header>
    </div>
  );
}

export default App;
