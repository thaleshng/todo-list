import styled from "styled-components";
import { ListItem } from "../ListItem/ListItem";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

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
    onReorderTasks: (updatedTasks: Task[]) => void;
}

export const List = ({ tasks, onDeleteTask, onEditTask, isReorderMode, onMoveTaskUp, onMoveTaskDown, onReorderTasks }: ListProps) => {

    const handleOnDragEnd = (result: DropResult) => {
        if (!result.destination) {
            console.log("No valid drop destination found");
            return;
        }

        const updatedTasks = Array.from(tasks);
        const [reorderedTask] = updatedTasks.splice(result.source.index, 1);
        updatedTasks.splice(result.destination.index, 0, reorderedTask);

        onReorderTasks(updatedTasks);
    };

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="tasks">
                {(provided) => {
                    return (
                        <Ul {...provided.droppableProps} ref={provided.innerRef}>
                            {tasks.map((task, index) => (
                                <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                    {(provided) => {
                                        return (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                            >
                                                <ListItem
                                                    task={task}
                                                    index={index}
                                                    totalTasks={tasks.length}
                                                    onDeleteTask={onDeleteTask}
                                                    onEditTask={onEditTask}
                                                    isReorderMode={isReorderMode}
                                                    onMoveTaskUp={onMoveTaskUp}
                                                    onMoveTaskDown={onMoveTaskDown}
                                                    dragHandleProps={provided.dragHandleProps ?? undefined}
                                                />
                                            </div>
                                        );
                                    }}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </Ul>
                    );
                }}
            </Droppable>
        </DragDropContext>
    );
};

const Ul = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 20px;
`