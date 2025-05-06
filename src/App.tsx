import styled from 'styled-components';
import ChessEnviroment from './components/Chess/ChessEnviroment';

function App() {
  return (
    <Wrapper>
      <ChessEnviroment />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  height: 100%;
  max-height: 100%;
  background-color: var(--color-gray-700);
`;

export default App;
