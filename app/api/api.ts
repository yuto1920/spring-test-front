import { Task } from "../type/type"; 

// データを取得する関数（JavaでいうServiceメソッドのようなもの）
export async function getTasks(): Promise<Task[]> {
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

export async function postTasks(title: string):Promise<Task>{
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${apiUrl}/tasks/`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"title": title}),
    }) 
    if (!res.ok) {
    const errorText = await res.text(); // エラーの詳細メッセージを取得
  console.log("------------------------------------------------");
  console.log("★API Error Status:", res.status);
  console.log("★API Error Text:", errorText);
  console.log("------------------------------------------------");
    throw new Error("Failed to fetch tasks");
  }
    const data = await res.json();
    return data; 
}

export async function putTasks(id:number, title: string):Promise<Task>{
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${apiUrl}/tasks/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({"title":title})
    })
    if (!res.ok) {
    const errorText = await res.text(); // エラーの詳細メッセージを取得
  console.log("------------------------------------------------");
  console.log("★API Error Status:", res.status);
  console.log("★API Error Text:", errorText);
  console.log("------------------------------------------------");
    throw new Error("Failed to fetch tasks");
  }
    const data = await res.json();
    return data; 
}

export async function deleteTasks(id:number){
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${apiUrl}/tasks/${id}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        }
    });
    return; 
}