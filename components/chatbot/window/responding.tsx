import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Responding() {
  return (
    <div className="self-start flex items-end gap-3">
      <Avatar className="h-8 w-8">
        <AvatarImage src="https://github.com/shcdn.png" />
        <AvatarFallback>E</AvatarFallback>
      </Avatar>

      <div className="flex items-center gap-1 rounded-2xl bg-amber-100 px-3 py-2">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:0ms]" />
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:150ms]" />
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  );
}

export default Responding;
