import { ChatGroq } from "@langchain/groq";
import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableWithMessageHistory, RunnableSequence, RunnablePassthrough } from "@langchain/core/runnables";

const model = new ChatGroq({
  model: "mixtral-8x7b-32768",
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  temperature: 0,
  streaming: true,
});

const messageHistories = {};

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are a helpful assistant who remembers all details the user shares with you.`,
  ],
  ["placeholder", "{chat_history}"],
  ["human", "{input}"],
]);

const filterMessages = (input) => {
  if (Array.isArray(input.chat_history)) {
    return input.chat_history.slice(-10);
  }
  return input.chat_history;
};

const chain = RunnableSequence.from([
  RunnablePassthrough.assign({
    chat_history: filterMessages,
  }),
  prompt,
  model,
]);

const withMessageHistory = new RunnableWithMessageHistory({
  runnable: chain,
  getMessageHistory: async (sessionId) => {
    if (messageHistories[sessionId] === undefined) {
      messageHistories[sessionId] = new InMemoryChatMessageHistory();
    }
    return messageHistories[sessionId];
  },
  inputMessagesKey: "input",
  historyMessagesKey: "chat_history",
});

const config = {
  configurable: {
    sessionId: "user_session",
  },
};

export async function* streamOpenAI(message) {
  const stream = await withMessageHistory.stream(
    { input: message },
    config
  );

  for await (const chunk of stream) {
    yield chunk.content;
  }
}

export default async function openai(message) {
  const response = await withMessageHistory.invoke(
    { input: message },
    config
  );
  return response.content;
}

export function getConversationHistory() {
  const history = messageHistories[config.configurable.sessionId]?.getMessages() || [];
  return history.slice(-10);
}