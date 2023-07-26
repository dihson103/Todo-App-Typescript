import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'
import { useState, useEffect } from 'react'
import { Todo } from '../../@types/todo.type';


export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const doneList = todos.filter(task => task.done);
  const notDoneList = todos.filter(task => !task.done);

  useEffect(() => {
    const todoString = localStorage.getItem('todos');
    const todosObj = JSON.parse(todoString || '[]');
    setTodos(todosObj);
  }, []);

  const addTodo = (name: string) => {
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString()
    }
    setTodos(prev => [...prev, todo]);
    // khi set 1 state thì nó thực hiện bất đồng bộ nên ở bên dưới todos vẫn chưa bị thay đổi
    const newTodosObj = [...todos, todo];
    localStorage.setItem('todos', JSON.stringify(newTodosObj));
  }

  const handleDoneTodo = (id: string, done: boolean) => {
    const newList = todos.map(todo => {
      if (todo.id == id) {
        return { ...todo, done };
      }
      return todo;
    })
    setTodos(newList);
    localStorage.setItem('todos', JSON.stringify(newList));
  }

  const handleDelete = (id: string) => {
    const newTodos = todos.filter(todo => todo.id != id);
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }

  const startEditTodo = (id: string) => {
    const findedTodo = todos.find(todo => todo.id == id);
    if (findedTodo) {
      setCurrentTodo(findedTodo);
    }
  }

  const editTodo = (name: string) => {
    setCurrentTodo(prev => {
      if (prev) return { ...prev, name };
      return null;
    })
  }

  const edit = (id: string, name: string) => {
    const newList = todos.map(todo => {
      if(todo.id == id){
        return {...todo, name};
      }
      return todo;
    })
    setTodos(newList);
    localStorage.setItem('todos', JSON.stringify(newList));
  }

  const stopEdit = () => {
    setCurrentTodo(null);
  }

  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput
          addToDo={addTodo}
          currentTodo={currentTodo}
          editTodo={editTodo}
          edit={edit}
          stopEdit={stopEdit}
        />
        <TaskList
          todos={notDoneList}
          handleDoneTodo={handleDoneTodo}
          handleDelete={handleDelete}
          startEditTodo={startEditTodo}
        />
        <TaskList
          doneTaskList
          todos={doneList}
          handleDoneTodo={handleDoneTodo}
          handleDelete={handleDelete}
          startEditTodo={startEditTodo}
        />
      </div>
    </div>
  )
}
