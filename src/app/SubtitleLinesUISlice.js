import {createSlice} from "@reduxjs/toolkit";


/**
 * this is for setting the different fields of an already created line,
 * NOT FOR subtitle grid reordering/creating new lines
 */


const initialState = {}  // mapping from id to SubtitleLine

export const SubtitleLinesSlice = createSlice({
  name: 'subtitleLines',
  initialState,
  reducers: {
    setText: (state, action) => {
      const lineIDs = action.payload.ids;
      for (const lineID of lineIDs) {
        state[lineID].text = action.payload
      }
    },
    setStyle: (state, action) => {
      const lineIDs = action.payload.ids;
      for (const lineID of lineIDs) {
        state[lineID].style = action.payload
      }
    },
    setStart: (state, action) => {
      const lineIDs = action.payload.ids;
      for (const lineID of lineIDs) {
        state[lineID].start = action.payload
      }
    },
    setEnd: (state, action) => {
      const lineIDs = action.payload.ids;
      for (const lineID of lineIDs) {
        state[lineID].end = action.payload
      }
    },
    setLayer: (state, action) => {
      const lineIDs = action.payload.ids;
      for (const lineID of lineIDs) {
        state[lineID].layer = action.payload
      }
    },
    setName: (state, action) => {
      const lineIDs = action.payload.ids;
      for (const lineID of lineIDs) {
        state[lineID].name = action.payload
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
        state[lineID].marginL = action.payload
      }
    },
    setMarginR: (state, action) => {
      const lineIDs = action.payload.ids;
      for (const lineID of lineIDs) {
        state[lineID].marginR = action.payload
      }
    },
    setMarginV: (state, action) => {
      const lineIDs = action.payload.ids;
      for (const lineID of lineIDs) {
        state[lineID].marginV = action.payload
      }
    },

  }
})
