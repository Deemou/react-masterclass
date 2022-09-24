import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export interface ITodo {
  id: number;
  text: string;
}

export interface IBoard {
  [key: string]: ITodo[];
}

export const IBoardState = atom<IBoard>({
  key: "toDo",
  effects_UNSTABLE: [persistAtom],
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
  },
});
