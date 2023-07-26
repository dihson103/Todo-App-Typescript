import { Todo } from '../../@types/todo.type';
import styles from './taskList.module.scss'

interface TaskListProps {
  doneTaskList?: boolean,
  todos: Todo[],
  handleDoneTodo: (id: string, done: boolean) => void,
  handleDelete: (id: string) => void,
  startEditTodo: (id: string) => void

}

export default function TaskList(props: TaskListProps) {
  const { doneTaskList, todos, handleDoneTodo, handleDelete, startEditTodo } = props;

  const handleCheckBox = (todoId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    handleDoneTodo(todoId, event.target.checked);
  }

  const handleDeleteBtn = (id: string) => () => {
    handleDelete(id);
  }

  return (
    <div className='mb-2'>
      <h2 className={styles.title}>{doneTaskList ? 'Done Task List' : 'Not Done Task List'}</h2>
      <div className={styles.tasks}>

        {todos.map(todo => (
          <div className={styles.task} key={todo.id}>
            <input type="checkbox" className={styles.taskCheckBox} checked={todo.done} onChange={handleCheckBox(todo.id)} />
            <span className={`${styles.taskName} ${todo.done ? styles.taskNameDone : ''}`}>{todo.name}</span>
            <div className={styles.taskAction}>
              <button className={styles.taskBtn} onClick={() => startEditTodo(todo.id)}>✏️</button>
              <button className={styles.taskBtn} onClick={handleDeleteBtn(todo.id)}>🗑️</button>
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}
