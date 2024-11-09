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
import VisibilityButton from "./VisibilityButton";
import ControllKeyAction from "./ControllKeyAction";

type Props = {
	setActionName: Dispatch<SetStateAction<ActionName>>;
};

type Conversation = {
	responseText: string;
	lastQuestion: string;
};

const ChatForm: FC<Props> = ({ setActionName }) => {
	const [question, setQuestion] = useState<string>("");
	const [isRequesting, setIsRequesting] = useState<boolean>(false);
	const [conversation, setConversation] = useState<Conversation>({
		responseText: "",
		lastQuestion: "",
	});
	const [isQuestionVisible, setIsQuestionVisible] = useState<boolean>(true);
	const [isAnswerVisible, setIsAnswerVisible] = useState<boolean>(true);

	const [isRecording, setIsRecording] = useState<boolean>(false);

	async function onSubmit(e?: FormEvent<HTMLButtonElement>) {
		e?.preventDefault();
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

			const responseData = await geminiResponse.json();
			let responseMsg: string;
			const status = await responseData.status;

			if (status === 500 || status === 504) {
				console.log("🌏🌏🌏", status)
				console.log("🌏🌏🌏", responseData)
				responseMsg = `
					...おーい、聞こえているかー？
					どうやらハイドロフォンの調子が悪いみたいだ...すまない。
					もう1回試してみてダメだったら3分ほど待ってみてくれ
				`;
			} else {
				console.log("🌏🌏🌏", status)
				responseMsg = responseData.message;
				console.log("🌏🌏🌏", responseData)
			}

			getVoicevox(responseMsg);
			setConversation((prev) => ({ ...prev, responseText: responseMsg }));
		} catch (error) {
			console.error("Failed to fetch Gemini API:", error);
		} finally {
			setQuestion("");
			setIsRequesting(false);
		}
	}

	const handleListen = (e?: FormEvent<HTMLButtonElement>) => {
		e?.preventDefault();
		setIsRecording(!isRecording);
	};

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
				{isAnswerVisible && (
					<BlurSection title="🐙回答" className="mb-4">
						{conversation.responseText}
					</BlurSection>
				)}
				{isQuestionVisible && (
					<BlurSection title="🤔質問">
						{question === "" ? conversation.lastQuestion : question}
					</BlurSection>
				)}
			</div>
			<footer className="flex items-center gap-6">
				<div className="flex items-center gap-3">
					<VisibilityButton
						text="🤔"
						isVisible={isQuestionVisible}
						setIsVisible={setIsQuestionVisible}
					/>
					<VisibilityButton
						text="🐙"
						isVisible={isAnswerVisible}
						setIsVisible={setIsAnswerVisible}
					/>
				</div>

				<div className="flex items-center gap-4 w-max px-4 py-3 rounded-full bg-white shadow-sm">
					<Speech
						onTextUpdate={setQuestion}
						isRecording={isRecording}
						handleListen={(e) => handleListen(e)}
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
				</div>

				<ControllKeyAction firstAction={handleListen} secondAction={onSubmit} />
			</footer>
		</form>
	);
};

export default ChatForm;
