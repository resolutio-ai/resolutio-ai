"use client"


import { useRouter } from "next/navigation";
// import { ChatCompletionRequestMessage } from "openai";




export default function Message() {
  const router = useRouter();

    //   try {
    //     const userMessage: ChatCompletionMessage = { role: "user", content: values.prompt };
    //     const newMessages = [...messages, userMessage];
        
    //     const response = await axios.post('/api/conversation', { messages: newMessages });
    //     setMessages((current) => [...current, userMessage, response.data]);
        
    //     form.reset();
    //   } catch (error: any) {
    //     if (error?.response?.status === 403) {
    //       // proModal.onOpen();
    //     } else {
    //       // toast.error("Something went wrong.");
    //     }
    //   } finally {
    //     router.refresh();
    //   }
    // }

  return (
    <div>
         

     

      <div className="space-y-4 mt-4 md:pt-40">
            content
      </div>

    </div>
  )
}
