import {createSlice} from "@reduxjs/toolkit";


/**
 * this is for setting the different fields of an already created line,
 * NOT FOR subtitle grid reordering/creating/deleting new lines
 */


const initialState = {}  // mapping from id to SubtitleLine

export const subtitleLinesUISlice = createSlice({
  name: 'subtitleLines',
  initialState,
  reducers: {
    setText: (state, action) => {
      const lineIDs = action.payload.ids;
      for (const lineID of lineIDs) {
        state[lineID].Text = action.payload
      }
    },
    setStyle: (state, action) => {
      const lineIDs = action.payload.ids;
      for (const lineID of lineIDs) {
        state[lineID].Style = action.payload
      }
    },
    setStart: (state, action) => {
      const lineIDs = action.payload.ids;
      for (const lineID of lineIDs) {
        state[lineID].Start = action.payload
      }
    },
    setEnd: (state, action) => {
      const lineIDs = action.payload.ids;
      for (const lineID of lineIDs) {
        state[lineID].End = action.payload
      }
    },
    setLayer: (state, action) => {
      const lineIDs = action.payload.ids;
      for (const lineID of lineIDs) {
        state[lineID].Layer = action.payload
      }
    },
    setName: (state, action) => {
      const lineIDs = action.payload.ids;
      for (const lineID of lineIDs) {
        state[lineID].Name = action.payload
      }
    },
    setEffect: (state, action) => {
      const lineIDs = action.payload.ids;
      for (const lineID of lineIDs) {
        state[lineID].effect = action.payload
      }
    },
    setIsComment: (state, action) => {
      const lineIDs = action.payload.ids;
      for (const lineID of lineIDs) {
        state[lineID].isComment = action.payload
      }
    },
    setMarginL: (state, action) => {
      const lineIDs = action.payload.ids;
      for (const lineID of lineIDs) {
        state[lineID].MarginL = action.payload
      }
    },
    setMarginR: (state, action) => {
      const lineIDs = action.payload.ids;
      for (const lineID of lineIDs) {
        state[lineID].MarginR = action.payload
      }
    },
    setMarginV: (state, action) => {
      const lineIDs = action.payload.ids;
      for (const lineID of lineIDs) {
        state[lineID].MarginV = action.payload
      }
    }
  }
})

export const subtitleLinesActions = subtitleLinesUISlice.actions;
export default subtitleLinesUISlice.reducer;
