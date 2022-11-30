import {createSlice} from "@reduxjs/toolkit";
import {deleteLines, insertLine} from "./LineOrderingSlice";
import {initialLineID} from "./common/SubtitleLine";

const initialState = initialLineID;

export const activeLineSlice = createSlice({
  name: 'activeLine',
  initialState,
  reducers: {
    setActiveLine: (state, action) => {
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
      return action.payload.activeSelectedAfter;
    }).addCase(insertLine,
      /**
       * @param state
       * @param {{payload: {line: SubtitleLine, index: number}}} action
       */
      (state, action) => {
        return action.payload.line.id;
    })
  }
})

export const {setActiveLine} = activeLineSlice.actions;
export default activeLineSlice.reducer;
