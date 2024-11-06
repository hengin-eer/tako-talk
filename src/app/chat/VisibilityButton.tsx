"use client";

import { FC, useState } from "react";

type Props = {
	text: string;
	isVisible: boolean;
	setIsVisible: (isVisible: boolean) => void;
};

const VisibilityButton: FC<Props> = ({ text, isVisible, setIsVisible }) => {
	return (
		<div
			className={`p-2 rounded-full ${isVisible ? "bg-white" : "bg-red-400"}`}
			onClick={() => setIsVisible(!isVisible)}
		>
			<span>{text}</span>
			<span className="iconify material-symbols--close-rounded" />
		</div>
	);
};

export default VisibilityButton;
