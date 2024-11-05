import styled from "styled-components"
import { ListItem } from "../ListItem/ListItem"

interface Task {
    id: number,
    nome: string;
    custo: string;
    data_limite: string;
}

interface ListProps {
    tasks: Task[];
    onDeleteTask: (taskId: number) => void
}

export const List = ({ tasks, onDeleteTask }: ListProps ) => {
    return (
        <Ul>
            <ListItem tasks={tasks} onDeleteTask={onDeleteTask} />
        </Ul>
    )
}

const Ul = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 20px;
`