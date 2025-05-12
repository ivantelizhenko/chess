import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteGame as deleteGameAPI } from '../service/supabaseService';
import { useAppSelector } from '../../store/store';

function useDeleteGame() {
  const gameId = useAppSelector(state => state.status.id);
  const queryClient = useQueryClient();

  const { mutateAsync: deleteGame } = useMutation({
    mutationFn: () => deleteGameAPI(gameId!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['game'] });
    },
  });

  return { deleteGame };
}

export default useDeleteGame;
