import styled from "styled-components"
import { ListItem } from "../ListItem/ListItem"

interface Task {
    id: number,
    nome: string;
    custo: number;
    data_limite: string;
}

interface ListProps {
    tasks: Task[];
    onDeleteTask: (taskId: number) => void;
    onEditTask: (task: Task) => void;
    isReorderMode: boolean;
    onMoveTaskUp: (taskId: number) => void;
    onMoveTaskDown: (taskId: number) => void;
}

export const List = ({ tasks, onDeleteTask, onEditTask, isReorderMode, onMoveTaskUp, onMoveTaskDown }: ListProps ) => {
    return (
        <Ul>
            <ListItem 
                tasks={tasks}
                onDeleteTask={onDeleteTask}
                onEditTask={onEditTask}
                isReorderMode={isReorderMode}
                onMoveTaskUp={onMoveTaskUp}
                onMoveTaskDown={onMoveTaskDown}
            />
        </Ul>
    )
}

const Ul = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 20px;
`