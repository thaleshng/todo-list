import styled from "styled-components"
import { ListItem } from "../ListItem/ListItem"

interface Task {
    nome: string;
    custo: string;
    data_limite: string;
}

interface ListProps {
    tasks: Task[];
}

export const List = ({ tasks }: ListProps ) => {
    return (
        <Ul>
            <ListItem tasks={tasks} />
        </Ul>
    )
}

const Ul = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 20px;
`