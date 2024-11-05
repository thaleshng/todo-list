import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExchangeAlt, faPlus } from "@fortawesome/free-solid-svg-icons";

import styled from 'styled-components'
import { List } from '../List/List'

export const MainContent = () => {
    return (
        <Main>
            <H1>✔ To-Do List</H1>
            <List />    
            <Div>
                <AddTaskButton title='Adicionar uma nova Tarefa'><FontAwesomeIcon icon={ faPlus } /></AddTaskButton>
                <ReOrderButton title='Reordenar Tarefas'><FontAwesomeIcon icon={ faExchangeAlt } /></ReOrderButton>
            </Div>
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