import { ReactNode, useEffect, useRef } from 'react';
import styled from 'styled-components';

function ModalWindow({
  children,
  isOpen,
}: {
  children: ReactNode;
  isOpen: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialog.current === null) return;
    if (isOpen) {
      dialog.current.showModal();
      dialog.current.style.display = 'grid';
    } else {
      dialog.current!.close();
      dialog.current!.style.display = 'none';
    }
  }, [isOpen]);

  return <Wrapper ref={dialog}>{children}</Wrapper>;
}

const Wrapper = styled.dialog`
  display: none;
  max-width: 100%;
  width: 100%;
  max-height: 100%;
  height: 100%;
  background-color: transparent;

  &::backdrop {
    backdrop-filter: blur(3px);
    background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1));
  }
`;

export default ModalWindow;
