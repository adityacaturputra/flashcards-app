export default function convertXmlToObject(
  xmlData: string,
): { frontMatch: string; backMatch: string }[] {
  const output: { frontMatch: string; backMatch: string }[] = [];

  const cardRegex = /<card>(.*?)<\/card>/g;
  let match: RegExpExecArray | null;

  while ((match = cardRegex.exec(xmlData)) !== null) {
    const cardContent = match[1];
    const frontMatch = cardContent.match(/<text name='Front'>(.*?)<\/text>/);
    const backMatch = cardContent.match(/<text name='Back'>(.*?)<\/text>/);

    if (frontMatch && backMatch) {
      output.push({
        frontMatch: frontMatch[1].trim(),
        backMatch: backMatch[1].trim(),
      });
    }
  }
  return output;
}
