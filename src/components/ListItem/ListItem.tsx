import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons'

import { ConfirmModal } from '../ConfirmModal/ConfirmModal';

import { useState } from 'react';

import styled from "styled-components"

interface Task {
    id: number,
    nome: string,
    custo: string,
    data_limite: string,
}

interface ListItemProps {
    tasks: Task[];
    onDeleteTask: (taskId: number) => void;
    onEditTask: (task: Task) => void;
}

export const ListItem = ({ tasks, onDeleteTask, onEditTask }: ListItemProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

    const handleDeleteClick = (taskId: number) => {
        setTaskToDelete(taskId);
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        if (taskToDelete !== null) {
            onDeleteTask(taskToDelete);
        }
        setIsModalOpen(false);
        setTaskToDelete(null);
    };

    return (
        <>
            {tasks.map((task: Task, index) => (
                <Li key={index}>
                    <DivTaskInfo>
                        <h3>{task.nome}</h3>
                        <p>Custo: R$ {task.custo}</p>
                        <p>Data Limite: {new Date(task.data_limite).toLocaleDateString()}</p>
                    </DivTaskInfo>

                    <DivIcons>
                        <button title='Editar Tarefa' onClick={() => onEditTask(task)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                        <button title='Excluir Tarefa' onClick={() => handleDeleteClick(task.id)}><FontAwesomeIcon icon={faTrashCan} /></button>
                    </DivIcons>
                </Li>
            ))}

            {isModalOpen && (
                <ConfirmModal message='Tem certeza de que deseja excluir essa tarefa?' onConfirm={confirmDelete} onCancel={() => setIsModalOpen(false)} />
            )}
        </>
        
    )
}

const Li = styled.li`
    list-style-type: none;

    display: flex;
    align-items: center;
    gap: 20px;

    > div:first-child:hover {
        box-shadow: 0 4px 12px rgba(119, 119, 119, 0.5);
    }
`

const DivTaskInfo = styled.div`
    display: flex;
    flex-direction: column;

    min-width: 800px;

    border: 1px solid #777;
    border-radius: 10px;
    
    padding: 10px;

    transition: 0.3s ease-in;

    > h3 {
        margin-bottom: 10px;
        pointer-events: none;
        font-size: 19px;
    }

    > p {
        pointer-events: none;
    }
`

const DivIcons = styled.div`
    display: flex;
    gap: 10px;

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
    }

    > button:hover {
        box-shadow: 0 4px 12px rgba(119, 119, 119, 0.5);
        background-color: #CCC;
        color: #000;
    }

    > button > svg {
        width: 22px;
        height: 22px;
    }
`