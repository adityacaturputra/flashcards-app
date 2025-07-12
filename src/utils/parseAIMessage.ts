/* eslint-disable @typescript-eslint/no-explicit-any */
function parseAIMessage(message: string): any[] | null {
  try {
    // Find the start and end of the JSON content within the message
    const jsonStart = message.indexOf('```json') + '```json'.length;
    const jsonEnd = message.indexOf('```', jsonStart);

    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error('JSON content not found in the message.');
    }

    // Extract the JSON string
    const jsonString = message.substring(jsonStart, jsonEnd).trim();

    // Parse the JSON string
    const parsedData: any[] = JSON.parse(jsonString);
    return parsedData;
  } catch (error) {
    // Handle JSON parsing errors
    console.error(`Error decoding JSON: ${error}`);
    return null;
  }
}

export default parseAIMessage;
