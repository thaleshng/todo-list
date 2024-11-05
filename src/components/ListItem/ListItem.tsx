import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons'

import styled from "styled-components"
import { getTasks } from "../../services/getTasks"

import { useEffect, useState } from "react"

interface Task {
    nome: string,
    custo: string,
    data_limite: string,
}

export const ListItem = () => {
    const [ tasks, setTasks ] = useState([])
    
    useEffect(() => {
        const fetchTasks = async () => {
            const tasks = await getTasks()
            setTasks(tasks)
        };

        fetchTasks()
    }, [])

    console.log(tasks);

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
                        <button title='Editar Tarefa'><FontAwesomeIcon icon={faPenToSquare} /></button>
                        <button title='Excluir Tarefa'><FontAwesomeIcon icon={faTrashCan} /></button>
                    </DivIcons>
                </Li>
            ))}
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