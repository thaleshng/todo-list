import styled from "styled-components"
import { ListItem } from "../ListItem/ListItem"

export const List = () => {
    return (
        <Ul>
            <ListItem />
        </Ul>
    )
}

const Ul = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 20px;
`