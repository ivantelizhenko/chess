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
  display: grid;
  place-content: center;
  height: 100%;
  background-color: lightblue;
`;

export default App;
