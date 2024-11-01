"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import getVoicevox from "@/lib/getVoicevox"

// zodによるフォームスキーマ設定
const FormSchema = z.object({
	chatMessage: z.string().max(500, {
		message: "相談は500文字以内にしてくれよぉ～",
	}),
})

// 会話の型定義
interface Conversation {
	responseText?: string;
	lastQuestion?: string;
}

export function ChatArea() {
	const [conversation, setConversation] = useState<Conversation>({
		responseText: "...🤔🐙",
		lastQuestion: "", // 全開の質問（初回は未定義）
	});

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			chatMessage: conversation.lastQuestion,
		},
	})

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		try {
			if (data.chatMessage === "") {
				alert("おいおい、まだ何も入力しちゃいないぜぇ～");
				return;
			};
			// 前回の質問の記録
			setConversation((prev) => ({
				...prev,
				lastQuestion: data.chatMessage,
			}));
			// テキストエリアの値を初期化
			form.reset({ chatMessage: "" });

			const geminiResponse = await fetch("/api/gemini-api", {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					message: data.chatMessage,
				}),
				referrerPolicy: 'no-referrer-when-downgrade',
			});

			if (!geminiResponse.ok) {
				throw new Error('Network response was not ok');
			}

			const responseData = await geminiResponse.json();
			const responseMsg: string = responseData.message;

			getVoicevox(responseMsg); // VOICEVOXによる読み上げのAPI
			setConversation((prev) => ({ // 返答のみを更新
				...prev,
				responseText: responseMsg,
			}));
		} catch (error) {
			console.error("Failed to fetch Gemini API:", error);
		}
	}


	return (
		<div className="mx-auto xl:w-3/5 sm:w-full">
			<div className="mb-8 grid gap-2">
				{(conversation.lastQuestion === "") ? "" : (
					<div>
						<Label className="text-white">質問だぜぇ～</Label>
						<p className="p-4 mt-2 max-h-[128px] overflow-y-scroll text-black text-base rounded-md bg-slate-100">
							{conversation?.lastQuestion}
						</p>
					</div>
				)}
				<div>
					<Label className="text-white">回答だぜぇ～</Label>
					<p className="p-4 mt-2 max-h-[128px] overflow-y-scroll text-black text-base rounded-md bg-slate-100">
						{conversation?.responseText}
					</p>
				</div>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} onChange={() => console.log(form.getValues().chatMessage)} className="w-full space-y-6">
					<FormField
						control={form.control}
						name="chatMessage"
						render={({ field }) => (
							<FormItem>
								<FormLabel
									className="text-white"
								>
									🐙どんどん質問してくれぇ～
								</FormLabel>
								<FormControl>
									<Textarea
										placeholder="なにか入力してくれぇ～"
										{...field}
									/>
								</FormControl>
								<FormDescription>
									世間一般の常識に沿っているなら何でも答えるぜぇ～
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						className="bg-emerald-500 hover:bg-emerald-600 text-white"
						type="submit"
					>
						送信だ！
					</Button>
				</form>
			</Form>
		</div>
	)
}
