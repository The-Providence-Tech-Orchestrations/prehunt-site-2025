import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";

import logo from "@/assets/landing/logo-white.png";

interface InfoDrawerProps {
  children?: React.ReactNode;
  className?: string;
  openButton?: React.ReactNode;
}

const InfoDrawer: React.FC<InfoDrawerProps> = ({ children, openButton, className }) => {

  return (
    <Drawer>
      <DrawerTrigger className="rounded-full border-2 border-zinc-400 transition-all blur-[1px] hover:blur-none hover:border-4">
        <div className="flex text-6xl text-zinc-200 px-4 py-1  blur-[1px]">?</div>
      </DrawerTrigger>
      <DrawerContent className="dark">
        <DrawerHeader>
          <DrawerDescription className="text-center text-xl">Crime boss Papa Finster knows everything that goes on in MITropolis. So when he hears about a run-down bank with lax security and a vault containing a particularly valuable coin, he starts planning the…</DrawerDescription>
          <div className="flex items-center justify-center blur-[0.5px]">
            <img src={logo.src} className="h-20"/>
            <img src={logo.src} className="h-20"/>
            <img src={logo.src} className="h-20"/>
            <img src={logo.src} className="h-20"/>
            <img src={logo.src} className="h-20"/>
            <img src={logo.src} className="h-20"/>

          </div>
          <Separator className="my-4"/>
          <DrawerTitle>WHAT IS THIS?</DrawerTitle>
          <DrawerDescription>MIT Mystery Heist was written as a recruiting tool to help increase the number of MIT students interested and involved in MIT Mystery Hunt. The plot acts as a precursor to MIT Mystery Hunt 2025 but does not contain spoilers, content, or answers related to the Hunt.
          <br></br><br></br>
          Mystery Heist was released to MIT students on October 14th and will be made public on <b className="text-white blur-[0.5px]">November 16th at noon ET</b>.
          <br></br><br></br>
          Because this isn't a true hunt, there will be no team registration or leaderboards. You may check your answers on this site, and all solutions will be published immediately.
          <br></br><br></br>
          </DrawerDescription>
          <DrawerTitle>HUNT LENGTH & DIFFICULTY LEVEL</DrawerTitle>
          <DrawerDescription>This hunt is composed of 12 puzzles, including 2 metas and 1 supermeta. It was written for teams of ~4 people who may or may not have puzzling experience. The puzzles are meant to be solved using no tech other than phones and in no more than 6 hours. Puzzle difficulty is similar to Star Rats, BAPHL, or DASH.
          <br></br><br></br>
          There are Expert and Casual versions of this hunt. The puzzles are mostly identical, but Casual versions typically have more flavor text or additional helpful instructions.
          <br></br><br></br>
          <b className="text-white blur-[0.5px]">This page is not a puzzle.</b>
          </DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  )
}

export default InfoDrawer;