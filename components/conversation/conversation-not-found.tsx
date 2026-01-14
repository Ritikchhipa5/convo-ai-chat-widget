export default function ConversationNotFound() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="text-center space-y-2">
        <h2 className="text-lg font-semibold">Conversation not found</h2>
        <p className="text-sm text-muted-foreground">
          This conversation may have been deleted or you don’t have access.
        </p>
      </div>
    </div>
  );
}
