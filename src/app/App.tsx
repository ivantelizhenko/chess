import styled from 'styled-components';
import ChessEnviroment from '../features/chess/components/enviroment/ChessEnviroment';
import Menu from '../features/menu/components/Menu';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import '../features/service/supabaseService';

function App() {
  return (
    <Wrapper>
      <BrowserRouter>
        <Routes>
          <Route index element={<Menu />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/chess/:id" element={<ChessEnviroment />} />
          <Route path="*" element={<Navigate replace to="/menu" />} />
        </Routes>
      </BrowserRouter>
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
