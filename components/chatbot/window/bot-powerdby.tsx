import { cn } from "@/lib/utils";

function BotPoweredBy({ className }: { className?: string }) {
  return (
    <div className={cn("text-muted-foreground text-center text-xs", className)}>
      Powered by <a className="text-amber-500 underline">Convo Ai</a>
    </div>
  );
}

export default BotPoweredBy;
