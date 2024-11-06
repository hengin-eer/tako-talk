import { Metadata } from "next";
import PageSection from "./PageSection";

export const metadata: Metadata = {
	title: "チャットを始める | Tako Talk",
	description: "ター●ルトークのような様々な雑談を楽しもう!",
};

export default function ChatPage() {
	return <PageSection />;
}
