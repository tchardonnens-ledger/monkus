const {
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
  ChatPromptTemplate,
} = require("langchain/prompts");

const { ChatOpenAI } = require("langchain/chat_models/openai");
const { ConversationChain } = require("langchain/chains");
const { BufferMemory } = require("langchain/memory");
const { MessagesPlaceholder } = require("langchain/prompts");

const chat = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0
});

const chatPrompt = ChatPromptTemplate.fromPromptMessages([
  SystemMessagePromptTemplate.fromTemplate(
    "Join a playful banter session with an AI friend. The AI is a bit reserved, responding with brief, context-based jests. Expect the AI's responses to have a consistent light roasting tone, using abbreviated sentences and lacking punctuation or capital letters."
  ),
  new MessagesPlaceholder("history"),
  HumanMessagePromptTemplate.fromTemplate("{input}"),
]);

const chain = new ConversationChain({
  memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
  prompt: chatPrompt,
  llm: chat,
});

async function askLLM(message) {
  const response = await chain.call({ input: message });
  return response.response;
}

module.exports = askLLM;