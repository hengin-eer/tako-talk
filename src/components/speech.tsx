"use client";

import { FC, useState, useRef } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

type Props = {};

const Speech: FC<Props> = () => {
	const [isRecording, setIsRecording] = useState<boolean>(false);
	const [text, setText] = useState<string>("Hello, world");
	const [transcript, setTranscript] = useState<string>("");

	// `useRef` を使って `recognition` インスタンスを保持する
	const recognitionRef = useRef<SpeechRecognition | null>(null);

	if (typeof window !== "undefined" && !recognitionRef.current) {
		recognitionRef.current = new webkitSpeechRecognition();
		recognitionRef.current.lang = "ja-JP";
		recognitionRef.current.continuous = true;
		recognitionRef.current.interimResults = true;
	}

	const handleListen = () => {
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
					setText((prevText) => prevText + results[i][0].transcript);
					setTranscript("");
				} else {
					setTranscript(results[i][0].transcript);
				}
			}
		};
	};

	return (
		<div className="flex flex-col gap-5 text-white">
			<Label>isRecording: {String(isRecording)}</Label>
			<Label>途中経過： {transcript}</Label>
			<Label>全文： {text}</Label>
			<Button onClick={handleListen}>
				{isRecording ? "停止" : "録音開始"}
			</Button>
		</div>
	);
};

export default Speech;
