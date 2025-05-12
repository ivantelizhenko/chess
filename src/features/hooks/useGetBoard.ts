import { useQuery } from '@tanstack/react-query';
import { getBoard as getBoardAPI } from '../service/supabaseService';
import { useAppSelector } from '../../store/store';

function useGetBoard() {
  const gameId = useAppSelector(state => state.status.gameId);

  return useQuery({
    queryKey: ['game', gameId],
    queryFn: () => getBoardAPI(gameId!),
  });
}

export default useGetBoard;
