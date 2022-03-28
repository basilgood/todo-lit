import { component, useEffect, useState } from 'haunted';
import { html } from 'lit-html';
import './../styles/main.css';

const TodoList = (host) => {
  const [todos, setTodos] = useState(() => []);
  const submit = (event) => event.preventDefault();
  useEffect(() => {
    console.log('render');
  }, []);
  // const handleInput = event => setTodos(event.target.value)
  return html`
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
    ${todos}
  `;
};

customElements.define('todo-list', component(TodoList));
