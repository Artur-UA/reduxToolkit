const TodoItem = ({id, text, success, deleteTodo, changeSuccess}) => {
  return (
    <li>
              <input className='checkbox' type="checkbox" checked={success} onChange={ () => changeSuccess(id)} />
              <label>{text}</label>
              <label className='delete' onClick={ () => deleteTodo(id) }>&times;</label>
            </li>
  )
}

export default TodoItem