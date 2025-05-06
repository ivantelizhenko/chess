import { ReactNode } from 'react';
import styled from 'styled-components';

const times = {
  w: {
    color: 'var(--color-gray-900)',
    backgroundColor: 'var(--color-gray-400)',
    gridArea: 'timeWhite',
  },
  b: {
    color: 'var(--color-gray-400)',
    backgroundColor: 'var(--color-gray-900)',
    gridArea: 'timeBlack',
  },
};

function Time({ children, type }: { children: ReactNode; type: 'w' | 'b' }) {
  const style = times[type];

  return <Wrapper style={style}>{children}</Wrapper>;
}

const Wrapper = styled.div`
  padding: 12px 16px;
  width: fit-content;
  height: fit-content;
  border-radius: 3px;
  font-weight: 600;
  font-size: 1.5rem;
`;

export default Time;
