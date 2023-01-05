import {configureStore} from '@reduxjs/toolkit'
import todoReducer from './todoSlice'

export default configureStore({
    reducer: {
        todos: todoReducer,
        // сюда можна добавить любое количество reducer-ов
    }
});