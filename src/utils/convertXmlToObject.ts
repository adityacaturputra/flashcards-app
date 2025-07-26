export default function convertXmlToObject(
  xmlData: string,
): { frontMatch: string; backMatch: string }[] {
  const output: { frontMatch: string; backMatch: string }[] = [];

  // Match all <card>...</card> blocks even within other XML structure
  const cardRegex = /<card>([\s\S]*?)<\/card>/g;
  let match: RegExpExecArray | null;

  while ((match = cardRegex.exec(xmlData)) !== null) {
    const cardContent = match[1];

    // Match <text name="Front">...</text> or <text name='Front'>...</text>
    const frontMatch = cardContent.match(
      /<text name=["']Front["']>([\s\S]*?)<\/text>/,
    );
    const backMatch = cardContent.match(
      /<text name=["']Back["']>([\s\S]*?)<\/text>/,
    );

    if (frontMatch && backMatch) {
      output.push({
        frontMatch: frontMatch[1].trim(),
        backMatch: backMatch[1].trim(),
      });
    }
  }

  return output;
}
