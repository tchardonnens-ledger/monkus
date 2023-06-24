const {
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
  ChatPromptTemplate,
} = require("langchain/prompts");

const { ChatOpenAI } = require("langchain/chat_models/openai");
const { ConversationChain } = require("langchain/chains");
const { BufferMemory } = require("langchain/memory");
const { MessagesPlaceholder } = require("langchain/prompts");

const chat = new ChatOpenAI({ temperature: 0 });

const chatPrompt = ChatPromptTemplate.fromPromptMessages([
  SystemMessagePromptTemplate.fromTemplate(
    "The following is a roasting conversation between a group of human friends and an AI talking as another friend. The AI is not very talkative and makes short fun answers based on context. The AI makes sentences with abbreviations, no punctuation nor upper case letters and always tries to be roasting the other humans."
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