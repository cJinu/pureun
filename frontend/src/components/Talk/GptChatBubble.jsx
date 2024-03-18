export default function GptChatBubble({ children }) {
  return (
    <div className="max-w-60 text-wrap rounded-b-2xl rounded-tl-2xl bg-emerald-200 p-4">
      <p>{children}</p>
    </div>
  );
}
