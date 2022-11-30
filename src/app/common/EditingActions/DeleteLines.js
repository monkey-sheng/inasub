import {batch} from "react-redux";
import {store} from "../../store";
import {deleteAllLines, deleteLines, insertLine, setLineOrdering} from "../../LineOrderingSlice";
import {getDefaultLine} from "../SubtitleLine";
import {nanoid} from "@reduxjs/toolkit";


/**
 *
 */
export default function deleteLinesAction() {
  const state = store.getState(), dispatch = store.dispatch;
  const currActiveLineIndex = state.lineOrdering.present.indexOf(state.activeLine);
  const toDelete = state.selectedLines;
  const newLineOrdering = state.lineOrdering.present.slice();
  const allDeleted = toDelete.length === newLineOrdering.length;

  for (const line of toDelete) {
    if (!newLineOrdering.splice(newLineOrdering.indexOf(line), 1).length) {
      console.error('delete line did not find ID', line);
    }
  }

  // if every line is deleted, add a default line
  if (allDeleted) {
    const id = nanoid();
    dispatch(deleteAllLines(id));
  }
  else {
    const newActiveSelected =
      newLineOrdering[currActiveLineIndex] || newLineOrdering[newLineOrdering.length - 1];
    dispatch(deleteLines(toDelete, newActiveSelected));
  }
}
