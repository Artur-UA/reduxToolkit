import { useDispatch } from 'react-redux'
import {/* deleteTodo,  changeSuccess,*/ deleteTodoItem, changeStatus} from '../store/todoSlice'
const TodoItem = ({id, title, completed}) => {
  const dispatch = useDispatch();


  const deleteItem = () => {
    dispatch(deleteTodoItem({id}));
  }
  const changeItem = () => {
    dispatch(changeStatus({id}));
  }

  return (
    <li>
      <input className='checkbox' type="checkbox" checked={completed} onChange={ () => changeItem(id)} />
      <label>{title}</label>
      <label className='delete' onClick={ () => deleteItem(id) }>&times;</label>
    </li>
  )
}

export default TodoItem