import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

import logo from "@/assets/landing/logo-white.png";

interface InfoDialogProps {
  children?: React.ReactNode;
  className?: string;
  openButton?: React.ReactNode;
}

const InfoDialog: React.FC<InfoDialogProps> = ({ children, openButton, className }) => {

  return (
    <Dialog>
      <DialogTrigger className="rounded-full border-2 border-zinc-400 transition-all blur-[1px] hover:blur-none hover:border-4">
        <div className="flex text-6xl text-zinc-200 px-4 py-1  blur-[1px] text-center">?</div>
      </DialogTrigger>
      <DialogContent className="dark">
        <DialogHeader>
          <DialogDescription className="text-center pt-2">Crime boss Papa Finster knows everything that goes on in MITropolis. So when he hears about a run-down bank with lax security and a vault containing a particularly valuable coin, he starts planning the…</DialogDescription>
          <div className="flex items-center justify-center blur-[0.5px]">
            <img src={logo.src} className="sm:h-40 h-[7rem] blur-[0px]"/>
          </div>
          <Separator className="my-4"/>
          <DialogTitle className="pt-4">WHAT IS THIS?</DialogTitle>
          <DialogDescription>
          Mystery Heist was released to MIT students on October 14th and will be made public on <b className="text-white blur-[0.5px]">November 16th at noon ET</b>. The plot acts as a precursor to MIT Mystery Hunt 2025 but does not contain spoilers, content, or answers related to the Hunt.
          <br></br><br></br>
          There will be no team registration or leaderboards. You may check your answers on this site, and all solutions will be published immediately.
          <br></br><br></br>
          </DialogDescription>
          <DialogTitle>HUNT LENGTH & DIFFICULTY LEVEL</DialogTitle>
          <DialogDescription>This hunt is composed of 12 puzzles, including 2 metas and 1 supermeta. It was written for teams of ~4 people to solve in no more than 6 hours. Puzzle difficulty is similar to Star Rats, BAPHL, or DASH.
          <br></br><br></br>
          <b className="text-white blur-[0.5px]">This page is not a puzzle.</b>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default InfoDialog;