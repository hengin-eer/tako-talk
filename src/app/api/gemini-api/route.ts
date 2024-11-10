import { chatSession } from "@/lib/geminiModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const { message } = await req.json();
	console.log("Received message:", message);

	try {
		const result = await chatSession.sendMessage(message); // チャットの送信メッセージ
		console.log("SendMessage result:", result);

		const response = result.response;
		console.log("Response:", response);

		if (
			response.candidates &&
			response.candidates[0].finishReason === "SAFETY"
		) {
			return NextResponse.json({
				message: `
						だはははは！！そんなこと言われても困っちゃうな～。ところでさ、別に聞きたいことは無いのかよ？
						画面を再読み込みして、会話をやり直してくれ！
					`,
				status: 501,
			});
		}

		return NextResponse.json({
			message: response.text(),
			status: 200,
		});
	} catch (error: any) {
		console.error("Error sending message:", error);
		return NextResponse.json({
			error: error,
			status: error.status,
		});
	}
}
