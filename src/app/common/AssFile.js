import SubtitleStyle, {normalizeAssColorTag, defaultStyle} from "./SubtitleStyle";
import SubtitleLine from "./SubtitleLine";
import {nanoid} from "@reduxjs/toolkit";

export function timestampToTime(timestamp) {
  const hms = timestamp.split(':');
  if (hms.length !== 3) {
    return null;
  }
  return (Number(hms[0]) * 3600 + Number(hms[1]) * 60 + Number(hms[2])).toFixed(2);
}

export function timeToTimeStamp(time) {
  let h, m, s, intTime;
  intTime = parseInt(time);
  h = Math.floor(intTime / 3600);
  intTime = intTime % 3600;
  m = Math.floor(intTime / 60);
  m = ('00' + m).slice(-2);  // 2 digits and zero padded
  s = time - h * 3600 - m * 60;
  s = ('00' + s.toFixed(2)).slice(-5);  // 5 chars, i.e. 01.23, zero padded
  return [h, m, s].join(':');
}

/**
 * parse ass file content into object AssFile, with some sanity checks.
 * @param {String} content file content string
 * @returns {AssFile} parsed AssFile
 */
export function parseAss(content) {

  function postProcess(sections) {
    function createStyleWithSanity(styleObj) {
      let Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold,
        Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow,
        Alignment, MarginL, MarginR, MarginV, Encoding;
      Name = styleObj.Name;
      Fontname = styleObj.Fontname;
      Fontsize = Number(styleObj.Fontsize) || defaultStyle.Fontsize;
      PrimaryColour = normalizeAssColorTag(styleObj.PrimaryColour) || defaultStyle.PrimaryColour;
      SecondaryColour = normalizeAssColorTag(styleObj.SecondaryColour) || defaultStyle.SecondaryColour;
      OutlineColour = normalizeAssColorTag(styleObj.OutlineColour) || defaultStyle.OutlineColour;
      BackColour = normalizeAssColorTag(styleObj.BackColour) || defaultStyle.BackColour;
      Bold = Number(styleObj.Bold) || defaultStyle.Bold;
      Italic = Number(styleObj.Italic) || defaultStyle.Italic;
      Underline = Number(styleObj.Underline) || defaultStyle.Underline;
      StrikeOut = Number(styleObj.StrikeOut) || defaultStyle.StrikeOut;
      ScaleX = Number(styleObj.ScaleX) || defaultStyle.ScaleX;
      ScaleY = Number(styleObj.ScaleY) || defaultStyle.ScaleY;
      Spacing = Number(styleObj.Spacing) || defaultStyle.Spacing;
      Angle = Number(styleObj.Angle) || defaultStyle.Angle;
      BorderStyle = Number(styleObj.BorderStyle) || defaultStyle.BorderStyle;
      Outline = Number(styleObj.Outline) || defaultStyle.Outline;
      Shadow = Number(styleObj.Shadow) || defaultStyle.Shadow;
      Alignment = Number(styleObj.Alignment) || defaultStyle.Alignment;
      MarginL = Number(styleObj.MarginL) || defaultStyle.MarginL;
      MarginR = Number(styleObj.MarginR) || defaultStyle.MarginR;
      MarginV = Number(styleObj.MarginV) || defaultStyle.MarginV;
      Encoding = Number(styleObj.Encoding) || defaultStyle.Encoding;
      return new SubtitleStyle(Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold,
        Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow,
        Alignment, MarginL, MarginR, MarginV, Encoding);
    }

    function createSubtitleLineWithSanity(lineObj) {
      // as per spec it could be 'Comment' or even others, but ignore others
      let id = nanoid();
      let Start, End, Style, Name, Effect, Text, Layer, MarginL, MarginR, MarginV;
      let isComment;

      function sanitize(line) {
        Start = timestampToTime(line.Start) || 0.0;
        End = timestampToTime(line.End) || 0.0;
        Layer = Number(line.Layer) || 0;
        MarginL = Number(line.MarginL) || 0;
        MarginR = Number(line.MarginR) || 0;
        MarginV = Number(line.MarginV) || 0;
        Style = line.hasOwnProperty('Style') ? line.Style : '';
        Name = line.hasOwnProperty('Name') ? line.Name : '';
        Effect = line.hasOwnProperty('Effect') ? line.Effect : '';
        Text = line.hasOwnProperty('Text') ? line.Text : '';
      }

      if (lineObj.key && lineObj.key === 'Dialogue') {
        isComment = false;
        const line = lineObj.value;
        sanitize(line);
        return new SubtitleLine(id, isComment, Start, End, Style, Name, Effect, Text, Layer,
          MarginL, MarginR, MarginV);
      }
      else if (lineObj.key && lineObj.key === 'Comment') {
        isComment = true;
        const line = lineObj.value;
        sanitize(line);
        return new SubtitleLine(id, isComment, Start, End, Style, Name, Effect, Text, Layer,
          MarginL, MarginR, MarginV);
      }
      // else if (lineObj.type === 'comment') // this is file comment line, i.e. '; a file line'
      return null;
    }

    for (let k = 0; k < sections.length; k++) {
      if (sections[k].name === 'V4+ Styles') {
        const newBody = {};
        const styles = sections[k].body.slice(1);
        for (const styleObj of styles) {
          const style = createStyleWithSanity(styleObj.value);
          newBody[style.Name] = style;
        }
        sections[k].body = newBody;
      }
      else if (sections[k].name === 'Events') {
        const newBody = {};
        const lines = sections[k].body.slice(1);
        for (const lineObj of lines) {
          // skipping first line, it's the column names
          const line = createSubtitleLineWithSanity(lineObj);
          if (line) {  // could be null, meaning stuff like file comment etc.
            newBody[line.id] = line;
          }
          sections[k].body = newBody;
          // else if (!lineObj.hasOwnProperty('type')) {
          //   // probably illegal line, ignore
          // }
        }
      }
    }
  }

  let m, format, lastPart, parts, key, value, tmp, i, j, body;
  const sections = [];
  const lines = content.split(/[\r\n]+/g);
  for (i = 0; i < lines.length; i++) {
    m = lines[i].match(/^\s*\[(.*)\]$/); // maybe utf8 BOM, shown as a whitespace
    if (m) {
      format = null;
      sections.push({
        name: m[1],
        body: []
      });
    } else {
      if (/^\s*$/.test(lines[i])) continue;
      if (sections.length === 0) continue;
      body = sections[sections.length - 1].body;
      if (lines[i][0] === ';' || lines[i][0] === '!') {
        body.push({
          type: 'comment',
          value: lines[i].substring(1)
        });
      } else {
        parts = lines[i].split(":");
        key = parts[0];
        value = parts.slice(1).join(':').trim();
        if (format || key === 'Format') {
          value = value.split(',');
          if (format && value.length > format.length) {
            lastPart = value.slice(format.length - 1).join(',');
            value = value.slice(0, format.length - 1);
            value.push(lastPart);
          }
          value = value.map(function (s) {
            return s.trim();
          });
          if (format) {
            tmp = {};
            for (j = 0; j < value.length; j++) {
              tmp[format[j]] = value[j];
            }
            value = tmp;
          }
        }
        if (key === 'Format') {
          format = value;
        }
        body.push({
          key: key,
          value: value
        });
      }
    }
  }
  // post process parts of the string data
  postProcess(sections);
  let scriptInfo, styles, events;
  const otherSections = [];
  for (const section of sections) {
    if (section.name === 'Script Info') {
      scriptInfo = section.body;  // keep the raw key value pair structure
    } else if (section.name === 'V4+ Styles') {
      styles = section.body;
    } else if (section.name === 'Events') {
      events = section.body; // TODO: use array of SubtitleLine class
    } else {  // unrecognized sections
      otherSections.push(section);
    }
  }

  const assFile = new AssFile(scriptInfo, styles, events, otherSections);
  console.log("parseAss returned ass file:\n", assFile)
  return assFile;
}

/**
 * Class members have names that are the same as ass file section names, including unknown sections.
 * Can turn/parse file contents into object representation and vice versa.
 */
export class AssFile {
  'Script Info';
  'V4+ Styles';
  'Events';

  /**
   * An object representation of an ass file
   * @param {Array} scriptInfo unchanged from raw parse result
   * @param {Array.<SubtitleStyle>} styles list of SubtitleStyle
   * @param {Object.<SubtitleLine>} events object with id as key mapping to SubtitleLine
   * @param {Array} otherSections unchanged from raw parse result
   */
  constructor(scriptInfo, styles, events, otherSections) {
    this['Script Info'] = scriptInfo;
    this['V4+ Styles'] = styles;
    this['Events'] = events;

    for (const otherSection of otherSections) {
      try {
        this[otherSection.name] = [];
        for (const kvPairs of otherSection.body) {
          this[otherSection.name].push(kvPairs);
          // else if (kvPairs.type === 'comment') {}
        }
        console.log("other section:", this[otherSection.name]);
      } catch (e) {
        console.log("other sections in ass file error", e)
      }
    }
  }

  toAssFileContent() {
    // script info and other sections are raw kv objects list
    // events and styles deal with them accordingly
  }


}

export const scriptInfoSectionDefault = []  // TODO

export const otherSectionDefault = []  // TODO
