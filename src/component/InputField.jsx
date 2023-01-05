const InputField = ({text, newTodo, setText}) => {
  return (
    <label>
        <input type="text" value={text} onChange={ (e) => setText(e.target.value)}/>
        <button onClick={newTodo}>Save</button>
    </label>
  )
}

export default InputField