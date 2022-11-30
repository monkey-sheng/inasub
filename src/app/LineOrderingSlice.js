/**
 * Line ordering gives a list of lineIDs, representing the ordering of all existing lines.
 * This includes changing/swapping lines, as well as insertion and deletion of lines.
 */

import {createSlice, nanoid} from "@reduxjs/toolkit";
import assFileSlice, {assFileActions} from './AssFileSlice'
import {getDefaultLine} from "./common/SubtitleLine";
import {initialLineID} from "./common/SubtitleLine";

const initialState = [initialLineID];

/**
 *
 * @param index index to insert at, if needed to insert below a line, caller should compute.
 * @param {SubtitleLine} line
 * @returns {{payload: {line, index}}}
 */
function insertActionPreparer(index, line) {
  return {payload: {index, line}};
}

/**
 *
 * @param {Array.<string>} ids list of lines to delete
 * @param activeSelectedAfter set this line to active selected after deletion operation
 * @returns {{payload: {ids, activeSelectedAfter}}}
 */
function deleteActionPreparer(ids, activeSelectedAfter) {
  return {payload: {ids, activeSelectedAfter}}
}

/**
 *
 * @param id1 one id of line to swap
 * @param id2 the other id of line to swap
 * @returns {{payload: {id2, id1}}}
 */
function swapActionPreparer(id1, id2) {
  return {payload: {id1, id2}}
}

// TODO: extra reducers to handle AssFileSlice createNew?
export const lineOrderingSlice = createSlice({
  name: 'lineOrdering',
  initialState,
  reducers: {
    /**
     * set the new ordering by providing a new list representing the new ordering
     * @param state unused, original ordering list
     * @param action action.payload is the new list of ordering
     * @returns {Array}
     */
    setLineOrdering: (state, action) => {
      return action.payload;
    },
    insertLine: {
      reducer: (state, action) => {
        state.splice(action.payload.index, 0, action.payload.line);
      },
      prepare: insertActionPreparer
    },
    deleteLines: {
      reducer: (state, action) => {
        for (const id of action.payload.ids) {
          const index = state.indexOf(id);
          if (index !== -1) {
            state.splice(index, 1);
          }
          else {
            console.error('delete line ordering failed, id not found:', id);
          }
        }
      },
      /**
       * @param {Array.<string>} ids list of lines to delete
       * @param {string} activeSelectedAfter set this line to active selected after deletion
       * operation
       * @returns {{payload: {ids: Array.<string>, activeSelectedAfter: string}}}
       */
      prepare: (ids, activeSelectedAfter) => {
        return {payload: {ids, activeSelectedAfter}}
      }
    },
    // add a new default line
    deleteAllLines: {
      reducer: (state, action) => {
        const defaultLine = getDefaultLine(action.payload.newLineID);
        return [defaultLine];
      },
      prepare: (newLineID) => {
        return {payload: {newLineID}}
      }
    },
    swapLines: {
      reducer: (state, action) => {
        const index1 = state.findIndex(i => action.payload.id1 === i);
        const index2 = state.findIndex(i => action.payload.id2 === i);
        if (index1 !== -1 && index2 !== -1) {
          state[index1] = action.payload.id2;
          state[index2] = action.payload.id1;
        }
        else {
          console.error('swap line ordering failed, one or all id not found:',
            action.payload.id1, action.payload.id2);
        }
      },
      prepare: swapActionPreparer
    }
  },
  extraReducers: builder => {
    builder.addCase(
      assFileActions.createNew, (state, action) => {
        const newLineID = action.payload;
        console.log("extra reducer for line ordering responded to createNew action")
        return [newLineID];
      }
    )
  }
})


export const {insertLine, deleteLines, deleteAllLines, setLineOrdering, swapLines} = lineOrderingSlice.actions;
export default lineOrderingSlice.reducer;
