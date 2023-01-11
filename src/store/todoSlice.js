import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loadTodoList = createAsyncThunk(
    'todos/loadTodoList', // имя санки/редюсера
    async function (_, {rejectWithValue}) { // первий параметр это параметры из dispatch(но я ничего не передавал). второй есть выбор достыпных методов. rejectWithValue - для обрботки ошибки 

        try {
            const resp = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=7',)

            if (!resp.ok){
                throw new Error('Error in Server')
            }
            const data = await resp.json();
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
        
    }
)

export const deleteTodoItem = createAsyncThunk(
    'todos/deleteTodoItem',
    async function({id}, {rejectWithValue, dispatch}){ // dispatch вытаскиваем. и запускаю уже сделаный ранее reducer  
        try {
            const resp = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                method: 'DELETE',
            })
            if (!resp.ok){
                throw new Error('Error in Server. Can\'t delete task.')
            }
            dispatch(deleteTodo({id}))
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
    
export const changeStatus = createAsyncThunk(
    'todos/changeStatus',
    async function ({id}, {rejectWithValue, dispatch, getState}){

        //const todos = getState().todos.todos;
        const todo = getState().todos.todos.find( todo => todo.id === id);

        
        try {
            const resp = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    completed: !todo.completed,
                }),
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
            })
            if (!resp.ok){
                throw new Error('Error in Server. Can\'t change task.')
            }
            dispatch(changeSuccess({id}))
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const addNewTodoItem = createAsyncThunk(
    'todos/addNewTodo',
    async function({text}, {rejectWithValue, dispatch}){
        try {
            const resp = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify({
                    userId: 1,
                    title: text,
                    completed: false
                }),
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
            })
            if (!resp.ok){
                throw new Error('Error in Server. Can\'t add new task.')
            }
            
            const data = await resp.json();
            dispatch(addNewTodo(data))
            
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const showError = (state, action) => {
    state.status = 'reject';
    state.error = action.payload; 
}

const showLoader = (state, action) => {
    state.status = 'loading';
    state.error = null;
}


const todoSLice = createSlice({
    name: 'todos', 
    initialState: { 
        todos: [],
        status: null,
        error: null
    },
    reducers: {
        addNewTodo(state,action) {
            /* state.todos.push({ //имутабельность не важна
                userId: 1,
                id: new Date().toISOString(),
                title: action.payload.text,
                completed: false
            }); */
            state.todos.push(action.payload);
        },
        deleteTodo(state,action){
            state.todos = state.todos.filter( todo => todo.id !== action.payload.id)
        },
        changeSuccess(state,action){
            const idTodo = state.todos.find( todo => todo.id === action.payload.id);
            idTodo.completed = !idTodo.completed
        }
    },
    extraReducers:{
        [loadTodoList.pending]: showLoader, // 3 состояния (pending, fulfilled, rejected)
        [loadTodoList.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.todos = action.payload;
        },
        [loadTodoList.rejected]: showError,
        [deleteTodoItem.rejected]: showError,
        [changeStatus.rejected]: showError,
        [deleteTodoItem.rejected]: showLoader,
        [changeStatus.rejected]: showLoader,
    }
})

export const {addNewTodo, deleteTodo, changeSuccess} = todoSLice.actions; //важно указать

export default todoSLice.reducer; //будет создан автоматически