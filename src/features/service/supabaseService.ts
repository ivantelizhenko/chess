import { supabase } from '../../lib/supabase';
import { BoardType } from '../types/BoardTypes';
import { NewGameType } from '../types/SupabaseServicesTypes';

export async function createGame({
  gameId,
  userId,
  side,
  board,
  time,
  extraSeconds,
}: NewGameType) {
  const sideTransform =
    side === 'w' ? { sideWhite: userId } : { sideBlack: userId };
  const boardJSON = JSON.stringify(board);

  const newGame = {
    id: gameId,
    ...sideTransform,
    board: boardJSON,
    time,
    extraSeconds,
  };

  await supabase.from('games').insert([newGame]);
}

export async function deleteGame(id: string) {
  await supabase.from('games').delete().eq('id', id);
}

export async function addOpponent(gameId: string, userId: string) {
  const { data: players } = await supabase
    .from('games')
    .select('sideWhite, sideBlack')
    .eq('id', gameId);

  const { sideWhite } = players![0];

  const opponent =
    sideWhite !== '' ? { sideBlack: userId } : { sideWhite: userId };

  await supabase.from('games').update(opponent).eq('id', gameId);
}

export async function updateBoard(
  lastMove: string,
  board: BoardType,
  gameId: string
) {
  const boardJSON = JSON.stringify(board);
  const { data } = await supabase.from('games').select('turn').eq('id', gameId);
  const newTurn = data![0].turn === 'w' ? 'b' : 'w';

  await supabase
    .from('games')
    .update({ lastMove, board: boardJSON, turn: newTurn })
    .eq('id', gameId);
}

export async function getBoard(id: string) {
  const { data } = await supabase.from('games').select('board').eq('id', id);

  const board = JSON.parse(data![0].board);

  return board;
}

export async function getGame(id: string) {
  const { data } = await supabase.from('games').select('*').eq('id', id);

  const game = data!.map(data => ({
    ...data,
    board: JSON.parse(data.board),
  }));

  return game;
}
