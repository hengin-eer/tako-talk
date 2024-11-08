"use client";

import { FC, KeyboardEvent, useMemo, useState } from "react";
import { useKeyPress } from "react-use";

type keyState = "waiting" | "listening" | "ready";

type Props = {
	firstAction: Function;
	secondAction: Function;
	thirdAction: Function;
};

const ControllKeyAction: FC<Props> = ({
	firstAction,
	secondAction,
	thirdAction,
}) => {
	const [keyState, setKeyState] = useState<keyState>("waiting");
	const [pressed, keyEvent] = useKeyPress("Enter");

	const keyStateToJP = {
		waiting: "入力待ち",
		listening: "音声認識",
		ready: "送信待ち",
	};

	console.log(keyEvent);

	useMemo(() => {
		if (pressed) {
			if (keyState == "waiting") {
				firstAction();
				setKeyState("listening");
			}

			if (keyState === "listening") {
				secondAction();
				setKeyState("ready");
			}

			if (keyState === "ready") {
				thirdAction();
				setKeyState("waiting");
			}
		}
	}, [pressed, keyEvent]);

	return (
		<div className="flex items-center gap-1 px-4 py-2 rounded-full bg-white">
			<div className="text-lg iconify svg-spinners--gooey-balls-2" />
			<div>{keyStateToJP[keyState]}</div>
		</div>
	);
};

export default ControllKeyAction;
