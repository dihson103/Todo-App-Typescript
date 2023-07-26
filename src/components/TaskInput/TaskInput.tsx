import { Todo } from '../../@types/todo.type';
import styles from './taskInput.module.scss'
import { useState } from 'react'

interface TaskInputProps {
  addToDo: (name: string) => void,
  currentTodo: Todo | null,
  editTodo: (name: string) => void,
  edit: (id: string, name: string) => void,
  stopEdit: () => void
}

export default function TaskInput(props: TaskInputProps) {
  const { addToDo, currentTodo, editTodo, edit, stopEdit } = props;
  const [name, setName] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (currentTodo) {
      edit(currentTodo.id, currentTodo.name);
      stopEdit();
    } else {
      addToDo(name);
      setName('');
    }
  }

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (currentTodo) {
      editTodo(value);
    }
    else {
      setName(value);
    }
  }

  return (
    <div className='mb-2'>
      <h1 className={styles.title}>To do list Typescript</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='caption go here'
          value={currentTodo ? currentTodo.name : name}
          onChange={handleValueChange} />
        <button type="submit">➕</button>
      </form>
    </div>
  )
}
