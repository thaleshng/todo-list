import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan, faArrowUp, faArrowDown, faGripVertical } from '@fortawesome/free-solid-svg-icons';

import { ConfirmModal } from '../ConfirmModal/ConfirmModal';
import { useState } from 'react';

import styled, { css } from "styled-components";

interface Task {
    id: number,
    nome: string,
    custo: number,
    data_limite: string,
}

interface ListItemProps {
    task: Task;
    index: number;
    totalTasks: number;
    onDeleteTask: (taskId: number) => void;
    onEditTask: (task: Task) => void;
    isReorderMode: boolean;
    onMoveTaskUp: (taskId: number) => void;
    onMoveTaskDown: (taskId: number) => void;
}

export const ListItem = ({ task, index, totalTasks, onDeleteTask, onEditTask, isReorderMode, onMoveTaskUp, onMoveTaskDown }: ListItemProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDeleteClick = () => {
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        onDeleteTask(task.id);
        setIsModalOpen(false);
    };

    return (
        <>
            <Li>
                <DivTaskInfo isHighCost={task.custo >= 1000}>
                    <h3>{task.nome}</h3>
                    <p>Custo: R$ {task.custo}</p>
                    <p>Data Limite: {new Date(task.data_limite).toLocaleDateString()}</p>
                </DivTaskInfo>

                <DivIcons isReorderMode={isReorderMode}>
                    {isReorderMode ? (
                        <>
                            <button title="Mover para Cima" onClick={() => onMoveTaskUp(task.id)} disabled={index === 0}>
                                <FontAwesomeIcon icon={faArrowUp} />
                            </button>
                            <button title="Mover para Baixo" onClick={() => onMoveTaskDown(task.id)} disabled={index === totalTasks - 1}>
                                <FontAwesomeIcon icon={faArrowDown} />
                            </button>
                            <button title="Arrastar">
                                <FontAwesomeIcon icon={faGripVertical} />
                            </button>
                        </>
                    ) : (
                        <>
                            <button title="Editar Tarefa" onClick={() => onEditTask(task)}>
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                            <button title="Excluir Tarefa" onClick={handleDeleteClick}>
                                <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                        </>
                    )}
                </DivIcons>
            </Li>

            {isModalOpen && (
                <ConfirmModal message='Tem certeza de que deseja excluir essa tarefa?' onConfirm={confirmDelete} onCancel={() => setIsModalOpen(false)} />
            )}
        </>
    );
};

const Li = styled.li`
    list-style-type: none;

    display: flex;
    align-items: center;
    gap: 20px;

    > div:first-child:hover {
        
    }
`
interface DivTaskInfoProps {
    isHighCost: boolean;
}

const DivTaskInfo = styled.div<DivTaskInfoProps>`
    display: flex;
    flex-direction: column;

    min-width: 800px;

    border: 1px solid #777;
    border-radius: 10px;
    
    padding: 10px;

    transition: 0.3s ease-in;

    &:hover {
        box-shadow: 0 4px 12px rgba(119, 119, 119, 0.5);
    }

    ${({ isHighCost }) =>
        isHighCost &&
        css`
            background-color: rgba(255, 235, 59, 0.8);
            color: #000;

        &:hover {
            box-shadow: 0 4px 12px rgba(255, 235, 59, 0.7);
    }
        `
    }

    > h3 {
        margin-bottom: 10px;
        pointer-events: none;
        font-size: 19px;
    }

    > p {
        pointer-events: none;
    }
`
interface DivIconsProps {
    isReorderMode: boolean;
}

const DivIcons = styled.div<DivIconsProps>`
    display: flex;
    gap: 10px;

    > button:first-child {
        ${({ isReorderMode }) =>
            isReorderMode &&
            css`
                > svg {
                    left: 0px;
                }
            `}
    }

    > button:first-child > svg {
        position: relative;
        right: -1.4px;
    }

    > button {
        cursor: pointer;
        padding: 7px;
        background-color: #777;
        border-radius: 10px;
        transition: 0.3s ease-in-out;

        &:disabled {
            cursor: not-allowed;
            background-color: #aaa;
            color: #666;
            box-shadow: none; 
        }
    }

    > button:hover:not(:disabled) {
        box-shadow: 0 4px 12px rgba(119, 119, 119, 0.5);
        background-color: #CCC;
        color: #000;
    }

    > button > svg {
        width: 22px;
        height: 22px;
    }
`