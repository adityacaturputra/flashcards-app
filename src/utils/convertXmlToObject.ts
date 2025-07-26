export default function convertXmlToObject(
  xmlData: string,
): { frontMatch: string; backMatch: string }[] {
  const output: { frontMatch: string; backMatch: string }[] = [];

  const cardRegex = /<card>([\s\S]*?)<\/card>/g; // Use [\s\S] instead of .
  let match: RegExpExecArray | null;

  console.log({ xmlData });

  while ((match = cardRegex.exec(xmlData)) !== null) {
    const cardContent = match[1];
    const frontMatch = cardContent.match(
      /<text name="Front">([\s\S]*?)<\/text>/,
    ); // Use [\s\S] instead of .
    const backMatch = cardContent.match(/<text name="Back">([\s\S]*?)<\/text>/); // Use [\s\S] instead of .

    if (frontMatch && backMatch) {
      output.push({
        frontMatch: frontMatch[1].trim(),
        backMatch: backMatch[1].trim(),
      });
    }
  }
  console.log({ output });
  return output;
}
