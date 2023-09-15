// --- langchain implementation ---
import { StreamingTextResponse, LangChainStream, Message } from "ai";
import { CallbackManager } from "langchain/callbacks";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { AIChatMessage, HumanChatMessage } from "langchain/schema"; // ! this information is outdated or not availabe anymroe

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages, context, langchain } = await req.json();

  const { stream, handlers } = LangChainStream();

  const llm = new ChatOpenAI({
    streaming: true,
    callbacks: CallbackManager.fromHandlers(handlers),
  });

  llm
    .call(
      (messages as Message[]).map((m) =>
        m.role == "user"
          ? new HumanChatMessage(m.content)
          : new AIChatMessage(m.content)
      )
    )
    .catch(console.error);

  return new StreamingTextResponse(stream);
}

// --- first implementation ---
// import { Configuration, OpenAIApi } from "openai-edge";
// import { OpenAIStream, StreamingTextResponse } from "ai";

// const config = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(config);

// export async function POST(req: Request) {
//   const { messages } = await req.json();

//   const response = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     stream: true,
//     messages: messages.map((message: any) => ({
//       content: message.content,
//       role: message.role,
//     })),
//   });

//   const stream = OpenAIStream(response);
//   return new StreamingTextResponse(stream);
// }
