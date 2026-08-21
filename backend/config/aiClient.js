import OpenAI from 'openai';

const aiClient = new OpenAI({
  apiKey: process.env.OCEANAI_API_KEY,
});

export default aiClient;
