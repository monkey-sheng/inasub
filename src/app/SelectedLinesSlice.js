import {createSlice} from "@reduxjs/toolkit";
import {deleteLines, insertLine} from "./LineOrderingSlice";
import {initialLineID} from "./common/SubtitleLine";

const initialState = [initialLineID];

export const selectedLinesSlice = createSlice({
  name: 'selectedLines',
  initialState,
  reducers: {
    setSelectedLines: (state, action) => {
      return action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(deleteLines,
      /**
       * @param state
       * @param {{type, payload:{ids, activeSelectedAfter}}} action
       */
      (state, action) => {
        return [action.payload.activeSelectedAfter];
      }).addCase(insertLine,
      /**
       * @param state
       * @param {{payload: {line: SubtitleLine, index: number}}} action
       */
      (state, action) => {
        return [action.payload.line.id];
      })
  }
})

export const {setSelectedLines} = selectedLinesSlice.actions;
export default selectedLinesSlice.reducer;
