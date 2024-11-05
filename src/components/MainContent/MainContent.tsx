import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExchangeAlt, faPlus } from "@fortawesome/free-solid-svg-icons";

import styled from 'styled-components'

import { List } from '../List/List'
import { addTask } from '../../services/getTasks';
import { getTasks } from '../../services/getTasks';

import { useState, useEffect } from 'react';

export const MainContent = () => {
    const [ isModalOpen, setIsModalOpen ] = useState(false)
    const [tasks, setTasks] = useState([])  ;
    const [nome, setNome] = useState("");
    const [custo, setCusto] = useState<number | string>("");
    const [data_limite, setDataLimite] = useState("");

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    const fetchTasks = async () => {
        const data = await getTasks();
        setTasks(data);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const taskData = { nome, custo: Number(custo), data_limite }

        const response = await addTask(taskData);
        if (response) {
            console.log("Tarefa adicionada com sucesso:", response);
            toggleModal();
            setNome("");
            setCusto("");
            setDataLimite("");
            fetchTasks();
        }
    }

    return (
        <Main>
            <H1>✔ To-Do List</H1>
            <List tasks={tasks} />    
            <Div>
                <AddTaskButton title='Adicionar uma nova Tarefa' onClick={toggleModal}>
                    <FontAwesomeIcon icon={ faPlus } />
                </AddTaskButton>
                <ReOrderButton title='Reordenar Tarefas'>
                    <FontAwesomeIcon icon={ faExchangeAlt } />
                </ReOrderButton>
            </Div>

            {isModalOpen && (
                <ModalBackground onClick={toggleModal}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <H2>Adicionar Nova Tarefa</H2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text" 
                                name="nome" 
                                placeholder="Nome da Tarefa"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />
                            <InputNumber 
                                name="custo" 
                                placeholder="Custo"
                                value={custo}
                                onChange={(e) => setCusto(e.target.value)}
                                required
                            />
                            <input 
                                type="date" 
                                name="data_limite"  
                                value={data_limite}
                                onChange={(e) => setDataLimite(e.target.value)}
                                required
                            />
                            <DivButtons>
                                <button type="submit">Adicionar</button>
                                <button onClick={toggleModal}>Fechar</button>
                            </DivButtons>
                        </form>
                        
                    </ModalContent>
                </ModalBackground>
            )}
        </Main>
    )
}

const Main = styled.main`
    background-color: #181818;
    padding: 0 50px 50px 50px;
    border-radius: 15px;
    box-shadow: 0 6px 15px rgba(24, 24, 24, 0.6);
`

const H1 = styled.h1`
    text-align: center;
    padding: 20px 0;
`

const Div = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
    margin-top: 20px;

    > button:hover {
        box-shadow: 0 4px 12px rgba(119, 119, 119, 0.5);
        background-color: #CCC;
        color: #000;
    }
`

const AddTaskButton = styled.button`
    min-width: 800px;
    border: 1px solid #777;
    border-radius: 10px;
    text-align: center;
    font-size: 40px;
    color: #FFF;
    transition: 0.3s ease-in;
    cursor: pointer;

    > svg {
        pointer-events: none;
        padding: 8px 0;
    }
`

const ReOrderButton = styled.button`
    cursor: pointer;
        padding: 7px;
        background-color: #777;
        border-radius: 10px;
        transition: 0.3s ease-in-out;
    
    > svg {
        transform: rotate(90deg);
        width: 22px;
        height: 22px;
    }
`
const H2 = styled.h2`
    margin-bottom: 15px;
    text-align: center;
`

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalContent = styled.div`
    background: #181818;
    padding: 20px;
    border-radius: 8px;
    max-width: 600px;
    width: 100%;
    box-shadow: 0 6px 15px rgba(24, 24, 24, 0.6);

    > form {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    > form > input {
        font-size: 18px;
        padding: 3px 6px;
        border-radius: 5px;
        border: 1px solid #777;
        /* color: #777; */

        &::placeholder {
            font-style: italic;
        }

        &:focus  {
            border-color: #777;
            outline: none;
            box-shadow: 0 0 3px rgba(255, 255, 255, 0.7);
        }
    }
`;

const InputNumber = styled.input.attrs({ type: 'number' })`
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    appearance: textfield;
    -moz-appearance: textfield;
`;

const DivButtons = styled.div`
    display: flex;
    gap: 15px;
    justify-content: center;
    margin-top: 10px;

    > button {
        padding: 10px 15px;
        font-size: 16px;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        border-radius: 20px;
        /* background-color: #777 */
    }

    > button:first-child {
        background-color: #28a745;
    }

    > button:first-child:hover {
        background-color: #218838;
        box-shadow: 0 4px 10px rgba(40, 167, 69, 0.3);
    }

    > button:last-child {
        background-color: #dc3545;
    }

    > button:last-child:hover {
        background-color: #c82333;
        box-shadow: 0 4px 10px rgba(220, 53, 69, 0.3);
    }
`