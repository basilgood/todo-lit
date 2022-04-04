import { component, useEffect, useState } from 'haunted';
import { html } from 'lit-html';
import './../styles/main.css';

const TodoList = (host) => {
  const [todos, setTodos] = useState([]);
  const submit = (event) => event.preventDefault();
  const list = todos.map(
    (todo, index) =>
      html` <li class="todo-item" title="">
        <button
          @click=${() => {
            const done = todos[index];
            setTodos(
              todos.map((todo) =>
                todo == todos[index] ? todo + ' (done)' : todo
              )
            );
          }}
        >
          ✔
        </button>
        ${todo}
        <button
          @click=${() => {
            setTodos(todos.slice(0, index).concat(todos.slice(index + 1)));
          }}
        >
          x
        </button>
      </li>`
  );
  useEffect(() => {
    console.log(todos);
  }, [todos]);
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
          setTodos([input.value].concat(todos));
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
