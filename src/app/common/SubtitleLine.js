import {nanoid} from "@reduxjs/toolkit";
import {defaultStyle} from "./SubtitleStyle";

export default class SubtitleLine {
  id;
  isComment;
  Start;
  End;
  Style;
  Name = '';
  Effect = '';
  Text = '';
  Layer = 0;
  MarginL = 0;
  MarginR = 0;
  MarginV = 0;

  constructor(id, isComment, start, end, style, name='', effect='', text='',
              layer=0, marginL=0, marginR=0, marginV=0) {
    this.id = id;  // not ass-spec, unique id for every line from nanoid
    this.isComment = isComment;
    this.Layer = layer;
    this.Start = start;
    this.End = end;
    this.Style = style;
    this.Name = name;  // 'Name' is the ass spec, but is called speaker in aegisub
    this.Effect = effect;
    this.Text = text;
    this.MarginL = marginL;
    this.MarginR = marginR;
    this.MarginV = marginV;

  }
}

/**
 * Get a default line, probably used when creating a new file etc.
 * @param [lineID] supplied lineID for the default line
 * @returns {SubtitleLine}
 */
export function getDefaultLine(lineID) {
  const defaultStyleName = defaultStyle.Name;
  if (lineID) {
    const {...subtitleLine} = new SubtitleLine(lineID, false, 0.0, 5.0, defaultStyleName, '', '', '', 0, 0, 0, 0);
    return subtitleLine;
  }
  const {...subtitleLine} = new SubtitleLine(nanoid(), false, 0.0, 5.0, defaultStyleName, '', '', '', 0, 0, 0, 0);
  return subtitleLine;
}

export const initialLineID = nanoid();
