import { atom } from "jotai";
import { VdbEvent } from "./hooks/fetch";

export const selectedEventAtom = atom<VdbEvent | null>(null);