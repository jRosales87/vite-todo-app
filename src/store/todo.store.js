import { Todo } from "../todos/models/todo.model";

export const Filters = {
    All : 'all',
    Completed : 'Completed',
    Pending : 'Pending'
}

const state = {
    todos : [
        new Todo('Piedra del alma'),
        new Todo('Piedra del espacio'),
        new Todo('Piedra del tiempo'),
        new Todo('Piedra del poder'),
        new Todo('Piedra del realidad'),
    ],
    filter: Filters.All,
}

const initStore = () => {

    loadStore();
    console.log('InitStore 🦖');

}


const loadStore = () => {
    if(!localStorage.getItem('state')) return;
    const {todos = [], filter = Filters.All} = JSON.parse(localStorage.getItem('state'));
    state.todos = todos;
    state.filter = filter;
}


const saveSatateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify( state ));
}

/**
 * 
 * @param {String} filter 
 */
const getTodo = ( filter = Filters.All ) => {
    switch (filter) {
        case Filters.All:
            return [...state.todos];
        case Filters.Completed:
            return state.todos.filter( todo => todo.done);
        case Filters.Pending:
            return state.todos.filter( todo => !todo.done);
        default:
            throw new Error(`Option ${ filter } is not valid`);
    }
}

/**
 * 
 * @param {String} description 
 */
const addTodo = ( description ) => {
    if(!description){
        throw new Error('Description is required');
    }

    state.todos.push( new Todo(description) );
    saveSatateToLocalStorage();
}

/**
 * 
 * @param {String} todoId 
 */
const toggleTodo = ( todoId ) => {
    state.todos = state.todos.map( todo => {
        if ( todo.id === todoId ) {
            todo.done = !todo.done
        }
        return todo;
    } )
    saveSatateToLocalStorage();
} 

/**
 * 
 * @param {String} todoId 
 */
const deleteTodo = ( todoId ) => {
    state.todos = state.todos.filter( todo => todo.id != todoId );
    saveSatateToLocalStorage();
} 


const deleteCompleted = ( ) => {
    state.todos = state.todos.filter( todo => !todo.done );
    saveSatateToLocalStorage();
} 

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = ( newFilter = Filters.All ) => {
    if(!Object.values(Filters).includes(newFilter)){
        throw new Error('Filter dont exists');
    }
    state.filter = newFilter;
    saveSatateToLocalStorage();
}


const getCurrentFilter = () => {
    return state.filter;
}

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodo,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}