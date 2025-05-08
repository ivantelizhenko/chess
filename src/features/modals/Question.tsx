import { ReactNode } from 'react';
import styled from 'styled-components';

import { closeModalWindow } from '../store/uiSlice';
import { useAppDispatch } from '../../store/store';

import DefaultButton from '../../components/DefaultButton';

interface QuestionProps {
  children: ReactNode;
  onSubmit: () => void;
  onReject?: () => void;
}

function Question({ children, onSubmit, onReject }: QuestionProps) {
  const dispatch = useAppDispatch();
  function handlReject() {
    dispatch(closeModalWindow());

    if (onReject) {
      onReject();
    }
  }

  return (
    <Wrapper>
      <p>{children}</p>

      <Button onClick={onSubmit}>Yes</Button>
      <Button onClick={handlReject}>No</Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 24px 48px;

  font-size: 1.5rem;

  display: grid;
  row-gap: 20px;
  column-gap: 24px;
  grid-template-areas:
    'question question'
    'buttonYes buttonNo';

  & p {
    grid-area: question;
  }
`;

const Button = styled(DefaultButton)`
  width: 100%;
  text-align: center;
  font-size: 1.25rem;
  padding: 8px 0;

  &:hover {
    background-color: var(--color-gray-300);
  }
`;

export default Question;
