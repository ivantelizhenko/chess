import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBoard as updateBoardAPI } from '../service/supabaseService';
import { useAppSelector } from '../../store/store';

function useUpdateBoard() {
  const { board, prevTwoMoves } = useAppSelector(state => state.board);
  const gameId = useAppSelector(state => state.status.gameId)!;
  const lastMove = prevTwoMoves.at(-1)!;
  const queryClient = useQueryClient();

  const { mutateAsync: updateBoard } = useMutation({
    mutationFn: () => updateBoardAPI(lastMove, board!, gameId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['game'] });
    },
  });

  return { updateBoard };
}

export default useUpdateBoard;
