export function htmlStringToPlainText(htmlString: string): string {
  // Create a new DOMParser instance
  const parser = new DOMParser();
  // Parse the HTML string into a document
  const doc = parser.parseFromString(htmlString, "text/html");
  // Extract and return the text content
  return doc.body.textContent || "";
}
