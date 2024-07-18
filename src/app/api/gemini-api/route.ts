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
  systemInstruction: "あなたはディズニーのタートルトークです。語尾を「タコォ～」", // プロンプトでっす
});

const generationConfig = {
  temperature: 0.5,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

type Req = {
	message: string;
}

async function POST(req: { body: Req }, res: Response) {
	const chatMessage: string = req.body.message;
  const chatSession = model.startChat({
    generationConfig,
  });

  const result = await chatSession.sendMessage(chatMessage); // チャットの送信メッセージ
  const response = result.response;
	console.log(response.text());
	
	return NextResponse.json({
		message: response.text()
	});
}
