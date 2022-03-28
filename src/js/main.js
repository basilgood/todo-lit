import { component, useEffect, useState } from 'haunted';
import { html } from 'lit-html';
import './../styles/main.css';

const TodoList = (host) => {
  const [todos, setTodos] = useState([]);
  const submit = (event) => event.preventDefault();
  const del = (event) => event.remove();
  const list = todos.map(
    (todo) => html`<li>${todo}<em class="delete-todo">x</em></li>`
  );
  useEffect(() => {
    console.log(todos);
  }, [todos]);
  // const handleInput = event => setTodos(event.target.value)
  return html`
    <style>
      .todo-list {
        list-style-type: none;
        padding: 0;
      }
      .todo-list li {
        display: flex;
        justify-content: space-between;
        background: #cccccc;
        border-bottom: 1px solid #ffffff;
      }
      .delete-todo {
        cursor: pointer;
        padding: 0 0 0 20px;
      }
    </style>
    <h3>To Do List</h3>
    <form @submit=${submit} class="todo-form">
      <input
        type="text"
        placeholder="Add a todo"
        class="todo-input"
        value=${todos}
      />
      <button
        class="todo-button"
        @click=${() => {
          const input = host.shadowRoot.querySelector('.todo-input');
          setTodos(todos.concat(input.value));
        }}
      >
        Add todo
      </button>
    </form>
    <ul class="todo-list">
      ${list}
    </ul>
  `;
};

customElements.define('todo-list', component(TodoList));
