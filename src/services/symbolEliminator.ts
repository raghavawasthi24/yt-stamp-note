export function convertNewlineSymbols(text:any) {
  // Replace \n\n with two actual new lines
  let formattedText = text.replace(/\\n\\n/g, "\n\n");

  // Replace \n with a single new line
  formattedText = formattedText.replace(/\\n/g, "\n");

  return formattedText;
}