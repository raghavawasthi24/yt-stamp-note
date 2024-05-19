export function formatDate(dateString: Date): string {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  };

  // Get the date parts
  const day = date.toLocaleString("en-US", { day: "2-digit", timeZone: "UTC" });
  const month = date.toLocaleString("en-US", {
    month: "short",
    timeZone: "UTC",
  });
  const year = date.toLocaleString("en-US", {
    year: "numeric",
    timeZone: "UTC",
  });

  // Format the date as "DD MMM, YYYY"
  return `${day} ${month}, ${year}`;
}