import {createSlice} from "@reduxjs/toolkit";

const initialState = ''

export const activeLineSlice = createSlice({
  name: 'activeLine',
  initialState,
  reducers: {
    setActiveLine: (state, action) => {
      return action.payload;
    }
  }
})

export const {setActiveLine} = activeLineSlice.actions;
export default activeLineSlice.reducer;
