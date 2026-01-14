"use client";
import { SectionLabel } from "@/components/section-label";
import { Button } from "@/components/ui/button";
import { Copy, Lock } from "lucide-react";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { atelierSulphurpoolLight } from "react-syntax-highlighter/dist/esm/styles/hljs"; // Example theme
import { toast } from "sonner";

type Props = {
  id: string;
};

function CodeSnippet({ id }: Props) {
  const nextJsPageSnippet = `
  const iframe = document.createElement("iframe");

    const iframeStyles = (styleString) => {
        const style = document.createElement('style');
        style.textContent = styleString;
        document.head.append(style);

    }
    iframeStyles("
    .chat-frame {
        position: fixed;
        bottom: 50px;
        right: 50px;
        border: none;
    }")

    iframe.src = "http://localhost:3000/chatbot"
    iframe.classList.add('chat-frame')
    document.body.appendChild(iframe)


    window.addEventListener("message", (e) => {
        if (e.origin != "http://localhost:3000") return null
        let dimensions = JSON.parse(e.data)

        iframe.width = dimensions.width
        iframe.height = dimensions.height
        iframe.contentWindow.postMessage("${id}", "http://localhost:3000/")

    })`;
  return (
    <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
      <SectionLabel
        icon={Lock}
        label="Code snippet"
        description="Copy and paste."
      />

      <div className=" rounded-xl text-sm relative overflow-hidden">
        <Button
          onClick={() => {
            navigator.clipboard.writeText(nextJsPageSnippet);
            toast("Copied");
          }}
          size="icon-sm"
          className=" absolute right-4 top-4"
        >
          <Copy />
        </Button>
        <SyntaxHighlighter
          language={"javascript"}
          style={atelierSulphurpoolLight}
          customStyle={{
            padding: 0,
          }}
        >
          {nextJsPageSnippet}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

export default CodeSnippet;
