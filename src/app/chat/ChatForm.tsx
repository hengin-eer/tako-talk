"use client";

import Speech from "@/components/speech";
import getVoicevox from "@/lib/getVoicevox";
import {
	Dispatch,
	FC,
	FormEvent,
	SetStateAction,
	useEffect,
	useMemo,
	useState,
} from "react";
import BlurSection from "./BlurSection";
import { ActionName } from "@/types/Model";

type Props = {
	setActionName: Dispatch<SetStateAction<ActionName>>;
};

type Conversation = {
	responseText: string;
	lastQuestion: string;
	role: "" | "admin" | "user"; // TODO: ここらへんはGeminiのドキュメント呼んでしっかり確認する
};

const ChatForm: FC<Props> = ({ setActionName }) => {
	const [question, setQuestion] = useState<string>("");
	const [isRequesting, setIsRequesting] = useState<boolean>(false);
	const [conversation, setConversation] = useState<Conversation>({
		responseText: "",
		lastQuestion: "",
		role: "",
	});

	const [isRecording, setIsRecording] = useState<boolean>(false);

	async function onSubmit(e: FormEvent<HTMLButtonElement>) {
		e.preventDefault();
		setIsRequesting(true);
		setIsRecording(false); // NOTE: この変更によって音声認識を終了
		try {
			if (question === "") {
				alert("おいおい、まだ何も入力しちゃいないぜぇ～");
				return;
			}
			setConversation((prev) => ({
				...prev,
				lastQuestion: question,
			}));

			const geminiResponse = await fetch("/api/gemini-api", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ message: question }),
				referrerPolicy: "no-referrer-when-downgrade",
			});

			if (!geminiResponse.ok) {
				throw new Error("Network response was not ok");
			}

			const responseData = await geminiResponse.json();
			const responseMsg = responseData.message;

			getVoicevox(responseMsg);
			setConversation((prev) => ({ ...prev, responseText: responseMsg }));
		} catch (error) {
			console.error("Failed to fetch Gemini API:", error);
		} finally {
			setQuestion("");
			setIsRequesting(false);
		}
	}

	// NOTE: 状態ごとにアニメーションを付与する
	useMemo(() => {
		const nextActionName: ActionName = isRecording
			? "[保留アクション]"
			: isRequesting
			? "[保留アクション].002"
			: "[保留アクション].001";
		setActionName(nextActionName);
	}, [isRecording, isRequesting]);

	return (
		<form className="fixed bottom-5 w-full mx-auto px-5 flex flex-col items-center gap-4">
			<div className="w-full lg:max-w-[800px] mb-5 text-black">
				<BlurSection title="🐙回答" className="mb-4">
					{conversation.responseText}
				</BlurSection>
				<BlurSection title="🤔質問">
					{question === "" ? conversation.lastQuestion : question}
				</BlurSection>
			</div>
			<footer className="flex items-center gap-4 w-max px-4 py-3 rounded-full bg-white shadow-sm">
				<Speech
					onTextUpdate={setQuestion}
					isRecording={isRecording}
					setIsRecording={setIsRecording}
				/>
				<button className="p-2" onClick={(e) => onSubmit(e)}>
					<span
						className={`block text-2xl leading-[0] iconify ${
							isRequesting
								? "svg-spinners--gooey-balls-1"
								: "material-symbols--send-outline-rounded"
						}`}
					/>
				</button>
			</footer>
		</form>
	);
};

export default ChatForm;
