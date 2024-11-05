"use client";

import { FC, useState, useRef, FormEvent, Dispatch, SetStateAction } from "react";

type Props = {
	onTextUpdate: (text: string) => void; // NOTE: 親コンポーネントに最新のテキストを返す
	isRecording: boolean;
	setIsRecording: Dispatch<SetStateAction<boolean>>;
};

const Speech: FC<Props> = ({ onTextUpdate, isRecording, setIsRecording }) => {
	const [text, setText] = useState<string>("");
	const [transcript, setTranscript] = useState<string>("");

	// `useRef` を使って `recognition` インスタンスを保持する
	const recognitionRef = useRef<SpeechRecognition | null>(null);

	if (typeof window !== "undefined" && !recognitionRef.current) {
		recognitionRef.current = new webkitSpeechRecognition();
		recognitionRef.current.lang = "ja-JP";
		recognitionRef.current.continuous = true;
		recognitionRef.current.interimResults = true;
	}

	const handleListen = (e: FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const recognition = recognitionRef.current;
		if (!recognition) return;

		if (isRecording) {
			recognition.stop();
			setText("");
		} else {
			recognition.start();
		}

		setIsRecording((prev) => !prev);

		recognition.onresult = (event) => {
			const results = event.results;
			for (let i = event.resultIndex; i < results.length; i++) {
				if (results[i].isFinal) {
					setText((prevText) => {
						const updatedText = prevText + results[i][0].transcript;
						onTextUpdate(updatedText);
						return updatedText;
					});
					setTranscript("");
				} else {
					setTranscript(results[i][0].transcript);
				}
			}
		};
	};

	// DEBUG: ログでチェックする用
	console.log("🏃🏃🏃isRecording: ", isRecording);
	console.log("🤔🤔🤔途中経過: ", transcript);
	console.log("📝📝📝テキスト全文: ", text);

	return (
		<button
			className={`w-max p-3 rounded-full transition duration-300 ${
				isRecording ? "bg-red-400" : "bg-green-400"
			}`}
			onClick={(e) => handleListen(e)}
		>
			<span
				className={`block text-2xl leading-[0] text-white iconify ${
					isRecording
						? "material-symbols--stop-rounded"
						: "material-symbols--mic-rounded"
				}`}
			/>
		</button>
	);
};

export default Speech;
