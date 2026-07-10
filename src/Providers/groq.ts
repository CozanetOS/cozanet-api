import { APIProvider } from '../types';

export const groqProvider: APIProvider = {
  id: 'groq',
  name: 'Groq Cloud',
  baseUrl: 'https://api.groq.com/openai/v1',
  authType: 'bearer'
};

export async function chat(messages: any[], model: string = 'mixtral-8x7b-32768'): Promise<any> {
  const apiKey = process.env.GROQ_API_KEY_1;
  if (!apiKey) {
    throw new Error('GROQ_API_KEY_1 environment variable is not defined.');
  }

  const response = await fetch(`${groqProvider.baseUrl}/chat/completions`, {
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
    throw new Error(`Groq API request failed: ${response.status} ${response.statusText} - ${errText}`);
  }

  return response.json();
}
