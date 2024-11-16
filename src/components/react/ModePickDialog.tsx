import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ModePickDialog = () => {
  return (
    <Dialog>
      <DialogTrigger className="rounded-full border border-zinc-400 transition-all blur-[1px] hover:border-zinc-800">
        <div className="flex px-3 py-1  blur-[0.5px] text-center">?</div>
      </DialogTrigger>
      <DialogContent className="dark bg-[black]">
        <DialogHeader>
          <DialogTitle className="pt-4">EXPERT AND CASUAL MODES?</DialogTitle>
          <DialogDescription className="text-white blur-[0.75px]">
            <br></br>
            MIT Mystery Heist has two experiences: EXPERT and CASUAL, offering slight differences to puzzle content and flavor text. Both modes are designed to be solvable by all players, regardless of experience level. 
            <br></br><br></br>
            CASUAL mode was made specifically in mind of teams that have never done a puzzle hunt before. Pick whichever you feel most comfortable with, but we expect most teams to be happiest in EXPERT {">"}:{")"}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ModePickDialog;
