#### Component structure

- text edit box
- subtitle lines area
  - line
    - **ID**
    - layer
    - speaker
    - style
    - effect
    - …
    - **text**



Redux store:

- `selectedLines`: `[lineID]` (selected lines are under editing), basically any setting operation like set Text set Style are batch operation, **undoable**
- `activeLine`: a single line, different from selected lines, NO NEED for undoable
- `lineList`: `[lineID]` (ordering of all lines in edit box, this includes swapping and insertion deletion of lines), **undoable**
- `idLinesMap`: object of `lineID` to object of `SubtitleLine`, **undoable**
- `idRefMap`: object of `lineID` to the react `ref`

Text Edit Box:

*when a line is added, also add the line ref (or perhaps the respective states and setters?)*

- selected lines: set on user input

- Set Text/speaker/effect/etc: controlled, `onChange`: set Text/etc for each line ID in `selectedLines`
  - how do I set text/etc? 
- Change order of lines: via context menu action like **swap lines** etc.
  - how to change order and re-render? 

##### Notes to self:

for `useSelector` on a state, I can pass in as a 2nd argument function that always returns true, to make the component never re-renders even when the state changes. **Or scratch it, use `useStore().getState()` to get the singleton state object directly**

If I’m using a `map` from ID to ref, I can just call the setters of the components, how do I undo though? At least I need to know the editing action performed before undo. I then need to perform a reverse of that action, based on the undid states by calling undo on the subtitle object, or otherwise maybe not ().

If I’m using `useSelector` on every field, it’s O(n), but much easier to write, and especially for undo. *`useSelector` auto unsubscribes when component unmount*

I’ll just call undo and the states will change back, and everything will just re-render accordingly.

### parse ass

returns a list:

[

{name: `'$SectionName$', body:[{type: 'comment', value: '$some value$'}, {key: '$key$', value: {...}}]`}, {…}, …

]

##### for styles:

``{
  key: 'Style',
  value: {
    Name: '侦探华生',
    Fontname: '思源黑体 CN Bold',
    Fontsize: '90',
    PrimaryColour: '&H00CEE9FF',
    SecondaryColour: '&H00FFFFFF',
    OutlineColour: '&H006E7FA0',
    BackColour: '&H0065B3D4',
    Bold: '0',
    Italic: '0',
    Underline: '0',
    StrikeOut: '0',
    ScaleX: '100',
    ScaleY: '100',
    Spacing: '0',
    Angle: '0',
    BorderStyle: '1',
    Outline: '6',
    Shadow: '2',
    Alignment: '2',
    MarginL: '10',
    MarginR: '10',
    MarginV: '50',
    Encoding: '1'
  }
}``

##### for subtitle lines:

``{
  key: 'Dialogue',
  value: {
    Layer: '0',
    Start: '0:00:00.18',
    End: '0:00:01.40',
    Style: '侦探华生',
    Name: '',
    MarginL: '0',
    MarginR: '0',
    MarginV: '0',
    Effect: '',
    Text: '全在直播窥屏杀我'
  }
}``



### Actions payload:

#### setting line stuff like `Text, Name, Effect`:

`{ids, value}`

#### setting style stuff like `Fontname, PrimaryColor`

`{styleName, value}`