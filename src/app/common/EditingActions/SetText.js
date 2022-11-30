import {assFileActions} from "../../AssFileSlice";
import {store} from "../../store";


export default function setTextAction(text) {
  const state = store.getState(), dispatch = store.dispatch;
  dispatch(assFileActions.setText(state.selectedLines, text));
}
