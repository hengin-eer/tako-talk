"use client";

import Speech from "@/components/speech";
import getVoicevox from "@/lib/getVoicevox";
import { FC, FormEvent, useState } from "react";

type Props = {};

type Conversation = {
	responseText: string;
	lastQuestion: string;
	role: "" | "admin" | "user"; // TODO: ここらへんはGeminiのドキュメント呼んでしっかり確認する
};

const ChatForm: FC<Props> = () => {
	const [question, setQuestion] = useState<string>("");
	const [requesting, setRequesting] = useState<boolean>(false);
	const [conversation, setConversation] = useState<Conversation>({
		responseText: "...🤔🐙",
		lastQuestion: "",
		role: "",
	});

	const [isRecording, setIsRecording] = useState<boolean>(false);

	async function onSubmit(e: FormEvent<HTMLButtonElement>) {
		e.preventDefault();
		setRequesting(true);
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
			setRequesting(false);
		}
	}

	return (
		<form className="flex flex-col items-center gap-4">
			<div className="mb-5 text-white">
				<p>質問: {question === "" ? conversation.lastQuestion : question}</p>
				<p>回答: {conversation.responseText}</p>
			</div>
			<footer className="flex items-center gap-4 w-max px-4 py-3 rounded-full bg-white shadow-sm">
				<Speech onTextUpdate={setQuestion} isRecording={isRecording} setIsRecording={setIsRecording} />
				<button
					className="p-2"
					onClick={(e) => onSubmit(e)}>
					<span
						className={`block text-2xl leading-[0] iconify ${
							requesting
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
