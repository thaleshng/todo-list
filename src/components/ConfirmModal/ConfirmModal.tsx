import styled from "styled-components";

interface ConfirmModalProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export const ConfirmModal = ({ message, onConfirm, onCancel }: ConfirmModalProps) => {
    return (
        <ModalOverlay>
            <ModalBox>
                <p>{message}</p>
                <ButtonGroup>
                    <ConfirmButton onClick={onConfirm}>Confirmar</ConfirmButton>
                    <CancelButton onClick={onCancel}>Cancelar</CancelButton>
                </ButtonGroup>
            </ModalBox>
        </ModalOverlay>
    )
}

const ModalOverlay = styled.div`
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

const ModalBox = styled.div`
    background: #181818;
    padding: 20px;
    border-radius: 8px;
    max-width: 400px;
    width: 100%;
    text-align: center;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 15px;
    justify-content: center;
    margin-top: 20px;
`;

const ConfirmButton = styled.button`
    background-color: #28a745;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        background-color: #218838;
        box-shadow: 0 4px 10px rgba(40, 167, 69, 0.3);
    }
`;

const CancelButton = styled.button`
    background-color: #dc3545;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        background-color: #c82333;
        box-shadow: 0 4px 10px rgba(220, 53, 69, 0.3);
    }
`;