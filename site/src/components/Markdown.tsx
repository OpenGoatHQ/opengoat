import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function Markdown({ children }: { children: string }) {
  return (
    <div className="prose prose-invert max-w-none prose-headings:font-semibold prose-h1:text-3xl prose-h2:text-2xl prose-h2:mt-10 prose-h3:text-xl prose-pre:bg-black prose-pre:border prose-pre:border-border prose-code:bg-panel prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-li:my-1">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
