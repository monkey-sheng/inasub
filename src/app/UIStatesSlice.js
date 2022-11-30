import {createSlice} from "@reduxjs/toolkit";

// TODO: do I need them globally, or can be a component state?
const initialState = {
  subtitleGridContextMenu: null,  // context menu open or not
  openVideoButton: false,  // should it be open video button, or the video

}

export const uiStatesSlice = createSlice({
  name: 'uiStates',
  initialState,
  reducers: {
    // TODO: different click pos?
    showSubtitleGridContextMenu: {
      reducer: (state, action) => {
        state.subtitleGridContextMenu = action.payload;
      },
      prepare: (x, y) => ({ payload: {x, y} })
    },
    hideSubtitleGridContextMenu: state => {
      state.subtitleGridContextMenu = null;
    },
    toggleOpenVideoButton: state => {
      state.openVideoButton = !state.openVideoButton;
    }
  }
})

export const {
  toggleOpenVideoButton,
  showSubtitleGridContextMenu,
  hideSubtitleGridContextMenu
} = uiStatesSlice.actions;

export default uiStatesSlice.reducer;
