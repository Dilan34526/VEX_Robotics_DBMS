import { atom } from "jotai";
import { VdbEvent } from "./types";

export const selectedEventAtom = atom<VdbEvent | null>(null);