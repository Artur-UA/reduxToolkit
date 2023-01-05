import TodoItem from "./TodoItem"


const TodoList = ({todos, changeSuccess, deleteTodo}) => {
  return (
    <ul>
        { 
            todos && todos.map( todo => <TodoItem key={todo.id} {...todo} changeSuccess={changeSuccess} deleteTodo={deleteTodo} /> )
        }
    </ul>
  )
}

export default TodoList