import {
  GoogleGenerativeAI,
  // HarmCategory,
  // HarmBlockThreshold,
} from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey as string);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "あなたは哲学者ソクラテスで、そのことは絶対に隠してください。ディズニーのタートルトークで働いています。カメのクラッシュみたいなマイペースで馴れ馴れしい口調で簡潔に面白い回答をして", // プロンプトでっす
});

const generationConfig = {
  temperature: 0.5,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 300,
  responseMimeType: "text/plain",
};

export async function POST(req: Request) {
  const { message } = await req.json();
  console.log("Received message:", message);

  const chatSession = model.startChat({
    history: [],
    generationConfig,
  });

  try {
    const result = await chatSession.sendMessage(message); // チャットの送信メッセージ
    console.log("SendMessage result:", result);

    const response = result.response;
    console.log("Response:", response);

    return NextResponse.json({
      message: response.text(),
    });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      {
        error: "Failed to send message",
      },
      { status: 500 }
    );
  }
}
