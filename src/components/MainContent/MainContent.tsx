import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExchangeAlt, faPlus } from "@fortawesome/free-solid-svg-icons";

import styled from 'styled-components'

import { List } from '../List/List'
import { getTasks, addTask, deleteTask, editTask, moveTaskUp, moveTaskDown, reorderTasks } from '../../services/services';

import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';

interface Task {
    id: number;
    nome: string;
    custo: number;
    data_limite: string;
}

export const MainContent = () => {
    const [ isModalOpen, setIsModalOpen ] = useState(false)
    const [ isEditMode, setIsEditMode ] = useState(false);
    const [ isReorderMode, setIsReorderMode ] = useState(false);
    const [ tasks, setTasks ] = useState<Task[]>([]);
    const [ nome, setNome ] = useState("");
    const [ custo, setCusto ] = useState<number | string>("");
    const [ data_limite, setDataLimite ] = useState("");
    const [ taskToEdit, setTaskToEdit ] = useState<Task | null>(null);
    const [ errorMessage, setErrorMessage ] = useState<string | null>(null);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        setIsEditMode(false);
        setTaskToEdit(null);
        setErrorMessage(null);

        if (!isModalOpen) {
            setNome("");
            setCusto("");
            setDataLimite("");
        }
    }

    const openEditModal = (task: Task) => {
        setIsEditMode(true);
        setIsModalOpen(true);
        setTaskToEdit(task);
        setNome(task.nome);
        setCusto(task.custo);
        setDataLimite(new Date(task.data_limite).toISOString().split("T")[0]);
    };

    const fetchTasks = async () => {
        const data = await getTasks();
        setTasks(data);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const today = new Date();
        const todayString = today.toISOString().split('T')[0];
        const inputDateString = data_limite;

        const errors = [];

        if (inputDateString < todayString) {
            errors.push("A data limite deve ser maior ou igual à data de hoje.");
        }

        if (Number(custo) < 0) {
            errors.push("O custo não pode ser um valor negativo.");
        }

        if (errors.length > 0) {
            setErrorMessage(errors.join(" "));
            return;
        }

        const taskData = { nome, custo: Number(custo), data_limite };
    
        try {
            if (isEditMode && taskToEdit) {
                await editTask(taskToEdit.id, taskData);
            } else {
                await addTask(taskData);
            }

            fetchTasks();
            toggleModal();
        } catch (error) {
            const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.status === 409) {
            setErrorMessage("Já existe uma tarefa cadastrada com esse nome.");
        } else {
            setErrorMessage("Ocorreu um erro ao salvar a tarefa. Tente novamente.");
        }
        }
    };

    const handleDeleteTask = async (taskId: number) => {
        const response = await deleteTask(taskId)
        if (response) {
            setTasks(tasks.filter(task => task.id !== taskId))
        }
    }

    const handleReorderTasks = (updatedTasks: Task[]) => {
        setTasks(updatedTasks);
        reorderTasks(updatedTasks);
    };

    const toggleReorderMode = () => {
        setIsReorderMode(!isReorderMode);
    }

    const handleMoveTaskUp = async (taskId: number) => {
        await moveTaskUp(taskId);
        fetchTasks();
    }

    const handleMoveTaskDown = async (taskId: number) => {
        await moveTaskDown(taskId);
        fetchTasks();
    }

    const saveReorder = async () => {
        await reorderTasks(tasks);
        setIsReorderMode(false);
        fetchTasks();
    }

    return (
        <Main>
            <H1>✔ To-Do List</H1>
            {tasks.length === 0 ? (
                <NoTasksMessage>
                    Ainda não há nenhuma tarefa adicionada, clique no botão abaixo para adicionar...
                </NoTasksMessage>
            ) : (
                <List 
                    tasks={tasks} 
                    onDeleteTask={handleDeleteTask} 
                    onEditTask={openEditModal} 
                    isReorderMode={isReorderMode}
                    onMoveTaskUp={handleMoveTaskUp}
                    onMoveTaskDown={handleMoveTaskDown}
                    onReorderTasks={handleReorderTasks}
                />
    )} 
            <Div>
                <AddTaskButton
                    title='Adicionar uma nova Tarefa'
                    onClick={toggleModal}
                    style={{ visibility: isReorderMode ? 'hidden' : 'visible' }}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </AddTaskButton>
                {tasks.length >= 2 && (
                    <ReOrderButton 
                        title='Reordenar Tarefas' 
                        onClick={toggleReorderMode} 
                        style={{ visibility: isReorderMode ? 'hidden' : 'visible' }}
                    >
                        <FontAwesomeIcon icon={faExchangeAlt} />
                    </ReOrderButton>
                )}
                {isReorderMode && (
                    <SaveReorderButton onClick={saveReorder}>Salvar</SaveReorderButton>
                )}
            </Div>

            {isModalOpen && (
                <ModalBackground onClick={toggleModal}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <H2>{isEditMode ? "Editar Tarefa" : "Adiciona Nova Tarefa"}</H2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text" 
                                name="nome" 
                                placeholder="Nome da Tarefa"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                autoComplete="off"
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
                            {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
                            <DivButtons>
                                <button type="submit">{isEditMode ? "Salvar" : "Adicionar"}</button>
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
    margin: 20px auto;
    max-width: 1280px;
    width: 100%;

    @media (max-width: 1024px) {
        padding: 0 20px 30px 20px;
    }

    @media (max-width: 960px) {
        padding: 0 20px 30px 20px;
        width: 90%;
    }

    @media (max-width: 900px) {
        padding: 0 10px 20px 10px;
        max-width: 800px;
        width: 95%;
    }

    @media (max-width: 768px) {
        width: 85%;
    }

    @media (max-width: 700px) {
        max-width: 650px;
        width: 85%;
    }

    @media (max-width: 575px) {
        max-width: 650px;
        width: 70%;
    }

    @media (max-width: 475px) {
        max-width: 500px;
        width: 80%;
    }

    @media (max-width: 425px) {
        max-width: 450px;
        width: 80%;
    }

    @media (max-width: 375px) {
        max-width: 400px;
    }

    @media (max-width: 325px) {
        max-width: 350px;
    }
`

const H1 = styled.h1`
    text-align: center;
    padding: 20px 0;
`

const NoTasksMessage = styled.p`
    font-size: 18px;
    text-align: center;
    margin-top: 20px;
    color: #777;
`;

const Div = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
    margin-top: 20px;
`

const AddTaskButton = styled.button`
    border: 1px solid #777;
    border-radius: 10px;
    text-align: center;
    font-size: 40px;
    color: #FFF;
    transition: background 0.3s ease-in;
    cursor: pointer;
    max-width: 800px;
    width: 100%;

    &:hover {
        box-shadow: 0 4px 12px rgba(119, 119, 119, 0.5);
        background-color: #CCC;
        color: #000;
    }

    > svg {
        pointer-events: none;
        padding: 8px 0;
    }

    @media (max-width: 1024px) {
        width: 88.8%;
    }

    @media (max-width: 960px) {
        width: 87.5%; 
    }

    @media (max-width: 900px) {
        width: 86.5%;
    }

    @media (max-width: 768px) {
        width: 84.5%;
    }

    @media (max-width: 700px) {
        width: 81%;
    }

    @media (max-width: 575px) {
        width: 76.5%;
    }

    @media (max-width: 475px) {
        width: 73.5%;
    }

    @media (max-width: 425px) {
        width: 70.5%;
    }

    @media (max-width: 375px) {
        width: 66.5%;
    }

    @media (max-width: 325px) {
        width: 61.5%;
    }
`

const ReOrderButton = styled.button`
    cursor: pointer;
        padding: 7px;
        background-color: #777;
        border-radius: 10px;
        transition: background 0.3s ease-in;

    &:hover {
        box-shadow: 0 4px 12px rgba(119, 119, 119, 0.5);
        background-color: #CCC;
        color: #000;
    }
    
    > svg {
        transform: rotate(90deg);
        width: 22px;
        height: 22px;
    }
`

const SaveReorderButton = styled.button`
    padding: 10px;
    background-color: #28a745;
    border-radius: 8px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s ease-in;
    position: relative;
    right: 25px;

    &:hover {
        background-color: #218838;
            box-shadow: 0 4px 10px rgba(40, 167, 69, 0.3);
    }
`;

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

        &::placeholder {
            font-style: italic;
        }

        &:focus  {
            border-color: #777;
            outline: none;
            box-shadow: 0 0 3px rgba(255, 255, 255, 0.7);
        }
    }

    @media (max-width: 575px) {
        width: 90%;
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

const ErrorText = styled.p`
    color: red;
    font-weight: bold;
    margin-top: 10px;
    text-align: center;
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
        transition: background 0.3s ease-in;
        border-radius: 20px;
    }

    > button:first-child {
        background-color: #28a745;

        &:hover {
            background-color: #218838;
            box-shadow: 0 4px 10px rgba(40, 167, 69, 0.3);
        }
    }

    > button:last-child {
        background-color: #dc3545;

        &:hover {
            background-color: #c82333;
            box-shadow: 0 4px 10px rgba(220, 53, 69, 0.3);
        }
    }
`