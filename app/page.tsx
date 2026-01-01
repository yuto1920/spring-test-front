'use client'
import { Task } from "./type/type"
import { getTasks } from "./api/api";
import { postTasks } from "./api/api";
import { putTasks } from "./api/api";
import { deleteTasks } from "./api/api";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import styles from './Home.module.css';
// メインのページコンポーネント
export default function Home() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [postTitle, setPostTitle] = useState('');
  const [putTitle, setPutTitle] = useState('');
  const [putId, setPutId] = useState(0);
  const [deleteId, setDeleteId] = useState(0);
  // ここでデータを取得（非同期）

  const fetchTasks = async() => {
    try{
      const data = await getTasks();
      setTasks(data);
    }catch(error){
      console.error("タスク取得error:",error);
    }
  }
  useEffect(() => {
    const tasks = fetchTasks();
  },[])
  const postSubmitHandler = async(e:FormEvent) => {
    e.preventDefault();
    const data = await postTasks(postTitle);
    console.log(data);
    window.location.reload()
    return data;
  }
  const putSubmitHandler = async(e:FormEvent) => {
    e.preventDefault();
    const data = await putTasks(putId,putTitle);
    console.log(data);
    window.location.reload()
    return data;
  }
  const deleteSubmitHandler = async(e:FormEvent) => {
    e.preventDefault();
    const data = await deleteTasks(deleteId);
    console.log(data);
    window.location.reload()
    return data;
  }
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>タスク管理ボード</h1>
      
      {/* タスク一覧 */}
      <ul className={styles.taskList}>
        {tasks.map((task) => (
          <li key={task.id} className={styles.taskItem}>
            <span className={styles.taskId}>#{task.id}</span>
            <span>{task.title}</span>
          </li>
        ))}
      </ul>

      {/* Post Form */}
      <form onSubmit={postSubmitHandler} className={`${styles.formCard} ${styles.postForm}`}>
        <span className={styles.label}>新規作成 (POST)</span>
        <div className={styles.inputGroup}>
          <input 
            className={styles.input}
            value={postTitle} 
            placeholder="新しいタスクのタイトル" 
            onChange={(e) => setPostTitle(e.target.value)}
          />
          <button type="submit" className={styles.button}>追加</button>
        </div>
      </form>

      {/* Put Form */}
      <form onSubmit={putSubmitHandler} className={`${styles.formCard} ${styles.putForm}`}>
        <span className={styles.label}>更新 (PUT)</span>
        <div className={styles.inputGroup}>
          <input 
            type="number" 
            className={styles.input}
            value={putId} 
            placeholder="ID" 
            style={{flex: '0 0 80px'}} /* ID欄は少し狭く */
            onChange={(e) => setPutId(e.target.valueAsNumber)}
          />
          <input 
            className={styles.input}
            value={putTitle} 
            placeholder="変更後のタイトル" 
            onChange={(e) => setPutTitle(e.target.value)}
          />
          <button type="submit" className={styles.button}>更新</button>
        </div>
      </form>

      {/* Delete Form */}
      <form onSubmit={deleteSubmitHandler} className={`${styles.formCard} ${styles.deleteForm}`}>
        <span className={styles.label}>削除 (DELETE)</span>
        <div className={styles.inputGroup}>
          <input 
            type="number" 
            className={styles.input}
            value={deleteId} 
            placeholder="削除するID" 
            onChange={(e) => setDeleteId(e.target.valueAsNumber)}
          />
          <button type="submit" className={styles.button}>削除</button>
        </div>
      </form>
    </main>
  );
}