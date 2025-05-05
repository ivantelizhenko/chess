import ChessBoard from './components/Chess/ChessBoard';
import styled from 'styled-components';

function App() {
  return (
    <Wrapper>
      <ChessBoard />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 24px;
  /* grid-template-rows: auto 1fr auto; */
  display: grid;
  max-height: 100%;
  height: 100%;
  background-color: var(--color-gray-800);
`;

export default App;
