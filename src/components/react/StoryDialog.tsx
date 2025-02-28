import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect } from "react";

import art from "@/assets/art/story.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const StoryDialog = () => {
  const [hasSeenStory, setHasSeenStory] = useLocalStorage("2025_prehunt/has-seen-story", false);

  useEffect(() => {
    if (!hasSeenStory) {
      setHasSeenStory(true);
    }
  }, []);

  return (
    <Dialog defaultOpen={!hasSeenStory}>
      <DialogTrigger className="rounded-full border border-zinc-400 transition-all blur-[0.5px] hover:border-zinc-800">
        <div className="flex px-2 py-1 text-center">📖</div>
      </DialogTrigger>
      <DialogContent className="dark bg-[black]">
        <DialogHeader>
          {/* <DialogTitle className="pt-4">THE STORY</DialogTitle> */}
          <DialogDescription className="text-white text-left">
            <img src={art.src} alt="Story" />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default StoryDialog;
