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
