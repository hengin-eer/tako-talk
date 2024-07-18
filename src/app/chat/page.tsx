import { ChatArea } from "./ChatArea";
import { OctopusModel } from "./OctopusModel";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "チャットを始める | Tako Talk",
	description: "ター●ルトークのような様々な雑談を楽しもう!",
};

export default function ChatPage() {
	return (
		<main className="h-screen py-5 flex flex-col items-center justify-between">
			<OctopusModel />
			<ChatArea />
		</main>
	)
}