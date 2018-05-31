export const setCaretPosition = (el, n, abs=false) => {
  let pos = abs ? n : el.selectionStart + n
  if (pos < 0) pos = 0
  el.focus()
  el.setSelectionRange(pos, pos)
}