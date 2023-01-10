import { useDispatch } from 'react-redux'
import {deleteTodo, changeSuccess} from '../store/todoSlice'

const TodoItem = ({id, title, success}) => {

  const dispatch = useDispatch();
  const deleteItem = () => {
    dispatch(deleteTodo({id}));
  }
  const changeItem = () => {
    dispatch(changeSuccess({id}));
  }

  return (
    <li>
      <input className='checkbox' type="checkbox" checked={success} onChange={ () => changeItem(id)} />
      <label>{title}</label>
      <label className='delete' onClick={ () => deleteItem(id) }>&times;</label>
    </li>
  )
}

export default TodoItem