import { createSlice } from "@reduxjs/toolkit";

const todoSLice = createSlice({
    name: 'todos', 
    initialState: { 
        todos: []
    },
    reducers: {
        addNewTodo(state,action) {
            state.todos.push({ //имутабельность не важна 
                id: new Date().toISOString(),
                text: action.payload.text,
                success: false
            });
        },
        deleteTodo(state,action){
            state.todos = state.todos.filter( todo => todo.id !== action.payload.id)
        },
        changeSuccess(state,action){
            const idTodo = state.todos.find( todo => todo.id === action.payload.id);
            idTodo.success = !idTodo.success
        }
    }
})

export const {addNewTodo, deleteTodo, changeSuccess} = todoSLice.actions; //важно указать

export default todoSLice.reducer; //будет создан автоматически