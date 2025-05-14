import { ARCHIVE_MODE } from "astro:env/client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import localStoragePrefix from "@/lib/localStoragePrefix";

const resetProgress = () => {
  console.log("clearing site progress!!!");
  if (ARCHIVE_MODE) {
    // Only reset keys with the localStoragePrefix
    const keysToClear = Object.keys(localStorage).filter((key) =>
      key.startsWith(localStoragePrefix),
    );
    keysToClear.forEach((key) => {
      localStorage.removeItem(key);
    });
  } else {
    // On the mitmysteryheist.com site, we can just nuke all local storage
    localStorage.clear();
  }
  window.location.reload();
};

const ResetProgressDialog = () => {
  return (
    <Dialog>
      <DialogTrigger className="rounded-full border border-zinc-400 transition-all blur-[1px] hover:border-zinc-800">
        <div className="flex px-3 py-1  blur-[0.5px] text-center">RESET PROGRESS</div>
      </DialogTrigger>
      <DialogContent className="dark bg-[black]">
        <DialogHeader>
          <DialogTitle className="pt-4">ARE YOU SURE?</DialogTitle>
          <DialogDescription className="text-white sm:blur-[0.5px] blur-[0px]">
            Clicking RESET will clear your solve progress for all puzzles.
            <br></br>
            This action is irreversible.
            <br></br>
            <br></br>
            <button
              className="rounded-full px-4 border border-zinc-400 transition-all blur-[0.5px] hover:border-zinc-800"
              onClick={resetProgress}
            >
              RESET
            </button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ResetProgressDialog;
