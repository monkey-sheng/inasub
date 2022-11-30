import {createSlice} from "@reduxjs/toolkit";

const initialState = {}

export const lineRefsSlice = createSlice({
  name: 'lineRefs',
  initialState,
  reducers: {
    addLineRef: {
      reducer: (state, action) => {
        if (!state.hasOwnProperty(action.payload.id)) {
          state[action.payload.id] = action.payload.refObj;
        }
        else {
          console.error("adding ref but already exist for id:", action.payload.id)
        }
      },
      prepare: (id, refObj) => {
        return {payload: {id, refObj}}
      }
    },
    removeLineRef: {
      reducer: (state, action) => {
        if (state.hasOwnProperty(action.payload.id)) {
          delete state[action.payload.id];
        }
        else {
          console.error("removing ref but not found for id:", action.payload.id)
        }
      },
      prepare: (id, refObj) => {
        return {payload: {id, refObj}}
      }
    },
  }
})

export const lineRefsActions = lineRefsSlice.actions;
export default lineRefsSlice.reducer;
