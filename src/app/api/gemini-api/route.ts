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
  systemInstruction: "あなたは愉快なタコです。ディズニーのタートルトークで働いています。カメのクラッシュのように、観客を楽しませられるように、マイペースで馴れ馴れしい口調で簡潔に面白い回答をして", // NOTE: プロンプトでっす
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
		// TODO: ブロックされてときに代替メッセージを返すようにする（アダルト、暴力系、その他）
    console.log("Response:", response);

		if (response.candidates && response.candidates[0].finishReason === "SAFETY") {
			return NextResponse.json({
				message: "だはははは！！そんなこと言われても困っちゃうな～。ところでさ、別に聞きたいことは無いのかよ？",
			});
		}

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
