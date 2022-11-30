import {createSlice, nanoid} from "@reduxjs/toolkit";
import {AssFile, scriptInfoSectionDefault, otherSectionDefault} from "./common/AssFile";
import {getStyles} from "./common/SubtitleStyle";
import {getDefaultLine, initialLineID} from "./common/SubtitleLine";
import {deleteLines, deleteAllLines, insertLine} from "./LineOrderingSlice";


/**
 * this is for setting the different fields of an already created line,
 * NOT FOR subtitle grid reordering/creating/deleting new lines
 */

const {...initialState} = new AssFile(scriptInfoSectionDefault, getStyles(), {[initialLineID]: getDefaultLine(initialLineID)}, otherSectionDefault);


/**
 * PrepareCallback for various actions related to setting on a subtitle line.
 * @param {Array} ids the list of lineIDs to set values on
 * @param value the value to be set, e.g. Layer, Text, etc.
 */
function lineActionPreparer(ids, value) {
  return {payload: {ids, value}};
}

/**
 * PrepareCallback for various actions related to setting on a subtitle line.
 * @param {string} styleName the style's name, which is unique
 * @param value the value to be set, e.g. PrimaryColor, Fontsize, etc.
 */
function styleActionPreparer(styleName, value) {
  return {payload: {styleName, value}};
}

export const AssFileSlice = createSlice({
  name: 'assFile',
  initialState,
  reducers: {
    /**
     *
     * @param state AssFile object
     * @param action {{payload: string}} optional payload is the lineID
     * @returns {AssFile}
     */
    createNew: (state, action) => {  // TODO: line ordering also need to handle this action and update
      const {...newAssFile} = new AssFile(scriptInfoSectionDefault, getStyles(), [getDefaultLine(action.payload)], []);
      return newAssFile;
    },
    loadFile: (state, action) => {
      return action.payload;
    },
    setText: {
      reducer: (state, action) => {
        const lineIDs = action.payload.ids;
        for (const lineID of lineIDs) {
          state['Events'][lineID].Text = action.payload.value;
        }
      },
      prepare: lineActionPreparer
    },
    setStyle: {
      reducer: (state, action) => {
        const lineIDs = action.payload.ids;
        for (const lineID of lineIDs) {
          state['Events'][lineID].Style = action.payload.value;
        }
      },
      prepare: lineActionPreparer
    },
    setStart: {
      reducer: (state, action) => {
        const lineIDs = action.payload.ids;
        for (const lineID of lineIDs) {
          state['Events'][lineID].Start = action.payload.value;
        }
      },
      prepare: lineActionPreparer
    },
    setEnd: {
      reducer: (state, action) => {
        const lineIDs = action.payload.ids;
        for (const lineID of lineIDs) {
          state['Events'][lineID].End = action.payload.value;
        }
      },
      prepare: lineActionPreparer
    },
    setLayer: {
      reducer: (state, action) => {
        const lineIDs = action.payload.ids;
        for (const lineID of lineIDs) {
          state['Events'][lineID].Layer = action.payload.value;
        }
      },
      prepare: lineActionPreparer
    },
    setName: {
      reducer: (state, action) => {
        const lineIDs = action.payload.ids;
        for (const lineID of lineIDs) {
          state['Events'][lineID].Name = action.payload.value;
        }
      },
      prepare: lineActionPreparer
    },
    setEffect: {
      reducer: (state, action) => {
        const lineIDs = action.payload.ids;
        for (const lineID of lineIDs) {
          state['Events'][lineID].Effect = action.payload.value;
        }
      },
      prepare: lineActionPreparer
    },
    setIsComment: {
      reducer: (state, action) => {
        const lineIDs = action.payload.ids;
        for (const lineID of lineIDs) {
          state['Events'][lineID].isComment = action.payload.value;
        }
      },
      prepare: lineActionPreparer
    },
    setMarginL: {
      reducer: (state, action) => {
        const lineIDs = action.payload.ids;
        for (const lineID of lineIDs) {
          state['Events'][lineID].MarginL = action.payload.value;
        }
      },
      prepare: lineActionPreparer
    },
    setMarginR: {
      reducer: (state, action) => {
        const lineIDs = action.payload.ids;
        for (const lineID of lineIDs) {
          state['Events'][lineID].MarginR = action.payload.value;
        }
      },
      prepare: lineActionPreparer
    },
    setMarginV: {
      reducer: (state, action) => {
        const lineIDs = action.payload.ids;
        for (const lineID of lineIDs) {
          state['Events'][lineID].MarginV = action.payload.value;
        }
      },
      prepare: lineActionPreparer
    },
    // TODO: styles related
    setStyleName: {
      reducer: (state, action) => {
        // since the styleName is basically the ID of the style, copy modify, delete, insert again
        const styleName = action.payload.styleName;
        const newName = action.payload.value;
        const style = state['V4+ Styles'][styleName];
        style.Name = newName;
        delete state['V4+ Styles'][styleName];
        state['V4+ Styles'][newName] = style;
      },
      prepare: styleActionPreparer
    },
    setStyleFontname: {
      reducer: (state, action) => {
        const styleName = action.payload.styleName;
        state['V4+ Styles'][styleName].Fontname = action.payload.value;
      },
      prepare: styleActionPreparer
    },
    setStyleFontsize: {
      reducer: (state, action) => {
        const styleName = action.payload.styleName;
        state['V4+ Styles'][styleName].Fontsize = action.payload.value;
      },
      prepare: styleActionPreparer
    },
    setStylePrimaryColour: {
      reducer: (state, action) => {
        const styleName = action.payload.styleName;
        state['V4+ Styles'][styleName].PrimaryColour = action.payload.value;
      },
      prepare: styleActionPreparer
    },
    setStyleSecondaryColour: {
      reducer: (state, action) => {
        const styleName = action.payload.styleName;
        state['V4+ Styles'][styleName].SecondaryColour = action.payload.value;
      },
      prepare: styleActionPreparer
    },
    setStyleOutlineColour: {
      reducer: (state, action) => {
        const styleName = action.payload.styleName;
        state['V4+ Styles'][styleName].OutlineColour = action.payload.value;
      },
      prepare: styleActionPreparer
    },
    setStyleBackColour: {
      reducer: (state, action) => {
        const styleName = action.payload.styleName;
        state['V4+ Styles'][styleName].BackColour = action.payload.value;
      },
      prepare: styleActionPreparer
    },
    setStyleBold: {
      reducer: (state, action) => {
        const styleName = action.payload.styleName;
        state['V4+ Styles'][styleName].Bold = action.payload.value;
      },
      prepare: styleActionPreparer
    },
    setStyleItalic: {
      reducer: (state, action) => {
        const styleName = action.payload.styleName;
        state['V4+ Styles'][styleName].Italic = action.payload.value;
      },
      prepare: styleActionPreparer
    },
    setStyleUnderline: {
      reducer: (state, action) => {
        const styleName = action.payload.styleName;
        state['V4+ Styles'][styleName].Underline = action.payload.value;
      },
      prepare: styleActionPreparer
    },
    setStyleStrikeOut: {
      reducer: (state, action) => {
        const styleName = action.payload.styleName;
        state['V4+ Styles'][styleName].StrikeOut = action.payload.value;
      },
      prepare: styleActionPreparer
    },
    setStyleScaleX: {
      reducer: (state, action) => {
        const styleName = action.payload.styleName;
        state['V4+ Styles'][styleName].ScaleX = action.payload.value;
      },
      prepare: styleActionPreparer
    },
    setStyleScaleY: {
      reducer: (state, action) => {
        const styleName = action.payload.styleName;
        state['V4+ Styles'][styleName].ScaleY = action.payload.value;
      },
      prepare: styleActionPreparer
    },
    setStyleSpacing: {
      reducer: (state, action) => {
        const styleName = action.payload.styleName;
        state['V4+ Styles'][styleName].Spacing = action.payload.value;
      },
      prepare: styleActionPreparer
    },
    setStyleAngle: {
      reducer: (state, action) => {
        const styleName = action.payload.styleName;
        state['V4+ Styles'][styleName].Angle = action.payload.value;
      },
      prepare: styleActionPreparer
    },
    setStyleBorderStyle: {
      reducer: (state, action) => {
        const styleName = action.payload.styleName;
        state['V4+ Styles'][styleName].BorderStyle = action.payload.value;
      },
      prepare: styleActionPreparer
    },
    setStyleOutline: {
      reducer: (state, action) => {
        const styleName = action.payload.styleName;
        state['V4+ Styles'][styleName].Outline = action.payload.value;
      },
      prepare: styleActionPreparer
    },
    setStyleShadow: {
      reducer: (state, action) => {
        const styleName = action.payload.styleName;
        state['V4+ Styles'][styleName].Shadow = action.payload.value;
      },
      prepare: styleActionPreparer
    },
    setStyleAlignment: {
      reducer: (state, action) => {
        const styleName = action.payload.styleName;
        state['V4+ Styles'][styleName].Alignment = action.payload.value;
      },
      prepare: styleActionPreparer
    },
    setStyleMarginL: {
      reducer: (state, action) => {
        const styleName = action.payload.styleName;
        state['V4+ Styles'][styleName].MarginL = action.payload.value;
      },
      prepare: styleActionPreparer
    },
    setStyleMarginR: {
      reducer: (state, action) => {
        const styleName = action.payload.styleName;
        state['V4+ Styles'][styleName].MarginR = action.payload.value;
      },
      prepare: styleActionPreparer
    },
    setStyleMarginV: {
      reducer: (state, action) => {
        const styleName = action.payload.styleName;
        state['V4+ Styles'][styleName].MarginV = action.payload.value;
      },
      prepare: styleActionPreparer
    },
    setStyleEncoding: {
      reducer: (state, action) => {
        const styleName = action.payload.styleName;
        state['V4+ Styles'][styleName].Encoding = action.payload.value;
      },
      prepare: styleActionPreparer
    }
  },
  extraReducers: builder => {
    builder.addCase(deleteLines, (state, action) => {
      const toDelete = action.payload.ids;
      for (const id of toDelete) {
        if (state['Events'][id] === undefined) {
          console.error('assFile delete, line not found:', id)
        }
        delete state['Events'][id]
      }
    }).addCase(deleteAllLines, (state, action) => {
      const defaultLine = getDefaultLine(action.payload.newLineID);
      state['Events'] = {[action.payload.newLineID]: defaultLine};
    }).addCase(insertLine, (state, action) => {
      state['Events'][action.payload.line.id] = action.payload.line;
    })
  }
})

export const assFileActions = AssFileSlice.actions;
export default AssFileSlice.reducer;

