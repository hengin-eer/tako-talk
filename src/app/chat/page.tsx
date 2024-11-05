import { ChatArea } from "./ChatArea";
import { Metadata } from "next";
import { ModelArea } from "./ModelArea";
import ChatForm from "./ChatForm";

export const metadata: Metadata = {
	title: "チャットを始める | Tako Talk",
	description: "ター●ルトークのような様々な雑談を楽しもう!",
};

export default function ChatPage() {
	return (
		<main className="min-h-[100svh] h-full pt-5 pb-8 flex flex-col items-center justify-between">
			<ModelArea />
			{/* <ChatArea /> */}
			<ChatForm />
		</main>
	)
}
