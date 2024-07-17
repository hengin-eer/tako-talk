import { StartChatBtn } from "./StartChatBtn";
import { TopHeader } from "./TopHeader";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <TopHeader />
      <p className="my-5 text-white text-lg">
        Tako Talkはまるでタートルトークのような会話を楽しむことが出来るAIチャットです。
      </p>

      <StartChatBtn />
    </main>
  );
}
