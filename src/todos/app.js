import  html  from "./app.html?raw";
import todoStore, { Filters } from "../store/todo.store";
import { renderTodos } from "./usecases";


const ElementIDs = {
    TodoList : '.todo-list',
    NewTodoInput : '#new-todo-input',
    ClearCompleted : '.clear-completed',
    TodoFilters : '.filtro',
    PendingCount : '#pending-count',
}

/**
 * 
 * @param {String} elementId 
 */

export const App = ( elementId ) => {


    const displayTodo = () => {
        const todos = todoStore.getTodo( todoStore.getCurrentFilter() );
        renderTodos(ElementIDs.TodoList, todos);
        document.querySelector(ElementIDs.PendingCount).innerHTML = todoStore.getTodo( Filters.Pending ).length;
    }

    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append( app );
        displayTodo();
    })();

    // Referencias HTML

    const newDescriptionInput = document.querySelector( ElementIDs.NewTodoInput );
    const todoListUL = document.querySelector( ElementIDs.TodoList );
    const clearCompleteButton = document.querySelector( ElementIDs.ClearCompleted );
    const filtersLIs = document.querySelectorAll( ElementIDs.TodoFilters );



    //Listeners

    newDescriptionInput.addEventListener('keyup', ( event ) => {
        if( event.keyCode !== 13 ) return;
        if( event.target.value.trim().length === 0 ) return;

        todoStore.addTodo( event.target.value );
        displayTodo();
        event.target.value = '';
    });
    
    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodo();
    });

    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');
        if(event.target.closest('.destroy')!== null){
            todoStore.deleteTodo(element.getAttribute('data-id'));
            displayTodo();
        }
    });
    clearCompleteButton.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodo();
    })

    filtersLIs.forEach( element => {
        element.addEventListener('click', (element) => {
            filtersLIs.forEach( el => el.classList.remove('selected') );
            element.target.classList.add('selected');

            switch (element.target.text) {
                case 'Todos':
                    todoStore.setFilter( Filters.All );
                    break;
                case 'Pendientes':
                    todoStore.setFilter( Filters.Pending );
                    break;
                case 'Completados':
                    todoStore.setFilter( Filters.Completed );
                    break;
            }
            displayTodo();
        })
    } )

}