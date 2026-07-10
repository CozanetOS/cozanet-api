import { APIProvider } from '../types';

export const openAIProvider: APIProvider = {
  id: 'openai',
  name: 'OpenAI Platform',
  baseUrl: 'https://api.openai.com/v1',
  authType: 'bearer'
};

export async function chat(messages: any[], model: string = 'gpt-4o-mini'): Promise<any> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY environment variable is not defined (OpenAI stub).');
  }

  const response = await fetch(`${openAIProvider.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      messages
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`OpenAI API request failed: ${response.status} ${response.statusText} - ${errText}`);
  }

  return response.json();
}
