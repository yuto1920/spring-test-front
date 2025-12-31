import { Task } from "./type"

// データを取得する関数（JavaでいうServiceメソッドのようなもの）
async function getTasks(): Promise<Task[]> {
  // 環境変数からURLを取得
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  // fetchでAPIを叩く
  const res = await fetch(`${apiUrl}/tasks/`, {
    cache: "no-store", // 常に最新データを取得する設定（SSR）
  });

  if (!res.ok) {
    const errorText = await res.text(); // エラーの詳細メッセージを取得
  console.log("------------------------------------------------");
  console.log("★API Error Status:", res.status);
  console.log("★API Error Text:", errorText);
  console.log("------------------------------------------------");
    throw new Error("Failed to fetch tasks");
  }

  // JSONを受け取って、Task型の配列として返す
  // Spring Bootの戻り値に合わせて修正してください（{ results: ... } 形式の場合など）
  // 今回のYAML定義だと { page:..., results: [...] } なので注意！
  const data = await res.json();
  return data.results; 
}

// メインのページコンポーネント
export default async function Home() {
  // ここでデータを取得（非同期）
  const tasks = await getTasks();

  return (
    <main style={{ padding: "20px" }}>
      <h1>タスク一覧</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
            {task.id}: {task.title}
          </li>
        ))}
      </ul>
    </main>
  );
}