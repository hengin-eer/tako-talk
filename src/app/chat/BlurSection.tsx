"use client";

import { FC, ReactNode, useState } from "react";

type Props = {
	title: string;
	children: ReactNode;
	className?: string;
};

const BlurSection: FC<Props> = ({ title, children, className }) => {
	const [isOpen, setIsOpen] = useState<boolean>(true);

	return (
		<div
			className={`p-5 w-max max-w-full rounded-[40px] bg-glass backdrop-blur-lg transition-all duration-300 ${className}`}
			onClick={() => setIsOpen(!isOpen)}
		>
			<div className="w-max text-xl">{title}</div>
			{isOpen && children !== "" && <p className="mt-2">{children}</p>}
		</div>
	);
};

export default BlurSection;
