"use client";

import { ActionName } from "@/types/Model";
import { useState } from "react";
import { ModelArea } from "./ModelArea";
import ChatForm from "./ChatForm";

const PageSection = () => {
	const [actionName, setActionName] =
		useState<ActionName>("[保留アクション].001");

	return (
		<main className="min-h-[100svh] h-full pt-5 pb-8 flex flex-col items-center justify-between">
			<ModelArea actionName={actionName} />
			<ChatForm />
		</main>
	);
};

export default PageSection;
