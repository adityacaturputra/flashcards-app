export default function convertFlashcardsToXml(
  flashcards: {
    question: string;
    answer: string;
    dynamicFields?: { [key: string]: string };
  }[],
): string {
  const xmlData = ['<deck>'];

  flashcards.forEach((flashcard) => {
    xmlData.push('  <card>');
    xmlData.push(`    <text name="Front">${flashcard.question}</text>`);
    xmlData.push(`    <text name="Back">${flashcard.answer}</text>`);

    if (flashcard.dynamicFields) {
      Object.entries(flashcard.dynamicFields).forEach(([key, value]) => {
        xmlData.push(`    <text name="${key}">${value}</text>`);
      });
    }

    xmlData.push('  </card>');
  });

  xmlData.push('</deck>');

  return xmlData.join('\n');
}
