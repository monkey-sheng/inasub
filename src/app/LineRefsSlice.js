import {createSlice} from "@reduxjs/toolkit";

const initialState = {}

export const lineRefSlice = createSlice({
  name: 'lineRef',
  initialState,
  reducers: {
    addLineRef: {
      reducer: (state, action) => {
        if (!state.hasOwnProperty(action.payload.id)) {

        }
        else {
          console.error("")
        }
      },
      prepare: (id, refObj) => {
        return {payload: {id, refObj}}
      }
    }
  }
})
