import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addOpponent as addOpponentAPI } from '../service/supabaseService';
import { useAppSelector } from '../../store/store';

function useAddOpponent() {
  const queryClient = useQueryClient();
  const gameId = useAppSelector(state => state.status.id);

  const { mutateAsync: addOpponent } = useMutation<
    void,
    Error,
    { userId: string }
  >({
    mutationFn: ({ userId }) => addOpponentAPI(gameId!, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['game'] });
    },
  });

  return { addOpponent };
}

export default useAddOpponent;
