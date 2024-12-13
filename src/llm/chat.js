const Groq = require("groq-sdk");
const { systemPrompt } = require("../config/prompts");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY }); // eslint-disable-line no-undef

let conversationHistory = [];

async function askLLM(message) {
  // Add user message to history
  conversationHistory.push({
    role: "user",
    content: message
  });

  // Prepare messages array with system prompt and history
  const messages = [
    {
      role: "system",
      content: systemPrompt
    },
    ...conversationHistory
  ];

  // Get completion from Groq
  const completion = await groq.chat.completions.create({
    messages: messages,
    model: "llama3-8b-8192",
    temperature: 0
  });

  // Add assistant response to history
  const response = completion.choices[0]?.message?.content || "";
  conversationHistory.push({
    role: "assistant",
    content: response
  });

  // Keep history to last 10 messages to avoid context length issues
  if (conversationHistory.length > 10) {
    conversationHistory = conversationHistory.slice(-10);
  }

  return response;
}

module.exports = askLLM;