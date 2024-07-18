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

const FormSchema = z.object({
  chatMessage: z.string().max(500, {
    message: "相談は500文字以内にしてくれよぉ～",
  }),
})

export function ChatArea() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      chatMessage: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
		console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="chatMessage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ご用件</FormLabel>
              <FormControl>
                <Textarea
									placeholder="なにか入力してくれぇ～"
									{...field}
								/>
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">送信だ！</Button>
      </form>
    </Form>
  )
}

