import axios from "axios";

export async function getTasks() {
    try {
        const response = await axios.get("https://teste-fatto-api-ad1y.onrender.com/tarefas")
        return response.data
    } catch (error) {
        console.error("Erro ao consumir API", error);
        return null
    }
}

interface TaskData {
    nome: string;
    custo: number;
    data_limite: string;
}


export async function addTask(taskData: TaskData) {
    try {
        const response = await axios.post("https://teste-fatto-api-ad1y.onrender.com/tarefas", taskData)
        return response.data
    } catch (error) {
        console.error("Erro ao adicionar tarefa",error);
        return null;
    }
}