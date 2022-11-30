/**
 * ass color tag is in the form of &HAABBGGRR&, basically reverse of HTML color tag
 * @param assColorTag the string in the form of &H
 * @returns normalized result tag, or null if illegal
 */
export function normalizeAssColorTag(assColorTag) {
  assColorTag = assColorTag.toUpperCase();
  const regexStandardTag = /^&H[0-9A-F]{8}&$/;
  const regexNoLast = /^&H?[0-9A-F]{8}$/;
  const regexNoH = /^&[0-9A-F]{8}&$/;

  if (regexNoLast.test(assColorTag)) {
    assColorTag = assColorTag + '&';
  }
  if (regexNoH.test(assColorTag)) {
    assColorTag = assColorTag.slice(0, 1) + 'H' + assColorTag.slice(1);
  }
  if (regexStandardTag.test(assColorTag)) {
    return assColorTag;
  }
  else {
    return null;
  }
}


export default class SubtitleStyle {
  Name;
  Fontname;
  Fontsize;
  PrimaryColour;
  SecondaryColour;
  OutlineColour;
  BackColour;
  Bold;
  Italic;
  Underline;
  StrikeOut;
  ScaleX;
  ScaleY;
  Spacing;
  Angle;
  BorderStyle;
  Outline;
  Shadow;
  Alignment;
  MarginL;
  MarginR;
  MarginV;
  Encoding;
  constructor(Name, Fontname, Fontsize, PrimaryColour, SecondaryColour,
              OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut,
              ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment,
              MarginL, MarginR, MarginV, Encoding) {
    this.Name = Name;
    this.Fontname = Fontname;
    this.Fontsize = Fontsize;
    this.PrimaryColour = PrimaryColour;
    this.SecondaryColour = SecondaryColour;
    this.OutlineColour = OutlineColour;
    this.BackColour = BackColour;
    this.Bold = Bold;
    this.Italic = Italic;
    this.Underline = Underline;
    this.StrikeOut = StrikeOut;
    this.ScaleX = ScaleX;
    this.ScaleY = ScaleY;
    this.Spacing = Spacing;
    this.Angle = Angle;
    this.BorderStyle = BorderStyle;
    this.Outline = Outline;
    this.Shadow = Shadow;
    this.Alignment = Alignment;
    this.MarginL = MarginL;
    this.MarginR = MarginR;
    this.MarginV = MarginV;
    this.Encoding = Encoding;

  }
}

// TODO: store the font file in FS on page load
export const defaultStyle = new SubtitleStyle('Default', 'Source Han Sans CN Bold', 90, '&H00FFFFFF&', '&H000000FF&',
  '&H00000000&', '&H00000000&', 0,0,0,0,100,100,0,0,1, 6, 2,2,10,10,50,1)


/**
 * Either get it from localStorage or provide a singleton list default
 * @returns {Array.<SubtitleStyle>}
 */
export function getStyles() {
  // TODO: fetch from localStorage, or use default if none exist
  const stylesList = [];
  stylesList.push(defaultStyle);
  return stylesList;
}
