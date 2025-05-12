import { useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAppSelector } from '../../store/store';

// function useRealtimeGameUpdates(getNewData: (data: any) => void) {
function useRealtimeGameById() {
  const gameId = useAppSelector(state => state.status.gameId);

  useEffect(() => {
    if (!gameId) return;

    const channel = supabase
      .channel(`realtime:game:${gameId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'games',
          filter: `id=eq.${gameId}`,
        },
        payload => {
          // getNewData(payload.new); // або обробити як потрібно
          console.log(payload.new.timeWhite);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameId]);
}

export default useRealtimeGameById;
