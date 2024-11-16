import { useLocalStorage } from "@uidotdev/usehooks";
import { useState } from "react";

import dvd1 from "@/assets/puzzles-page/dvd_1.png";
import dvd2 from "@/assets/puzzles-page/dvd_2.png";
import supermeta from "@/assets/puzzles-page/supermeta.png";
import { PuzzleDifficulty } from "@/lib/types";

import PasswordDialog from "./PasswordProtectDialog";

const META_1_SLUG = "building";
const META_2_SLUG = "cracking";

export default function PacketView() {
  const [isExpert, setisExpert] = useLocalStorage("puzzle-mode", true);
  const difficulty: string = isExpert ? PuzzleDifficulty.Expert : PuzzleDifficulty.Casual;

  console.log(localStorage.getItem(`casual/${META_1_SLUG}_solution`));
  console.log(localStorage.getItem(`casual/${META_1_SLUG}_solution`) !== `""`);

  const packet1MetaSolved =
    (localStorage.getItem(`casual/${META_1_SLUG}_solution`) !== `""` &&
      localStorage.getItem(`casual/${META_1_SLUG}_solution`)) ||
    (localStorage.getItem(`expert/${META_1_SLUG}_solution`) !== `""` &&
      localStorage.getItem(`expert/${META_1_SLUG}_solution`));

  const packet2MetaSolved =
    (localStorage.getItem(`casual/${META_2_SLUG}_solution`) !== `""` &&
      localStorage.getItem(`casual/${META_2_SLUG}_solution`)) ||
    (localStorage.getItem(`expert/${META_2_SLUG}_solution`) !== `""` &&
      localStorage.getItem(`expert/${META_2_SLUG}_solution`));

  const [showPacket2Modal, setShowPacket2Modal] = useState(false);
  const [showSupermetaModal, setShowSuperMetaModal] = useState(false);

  const handlePacket2Click: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (!packet1MetaSolved) {
      e.preventDefault();
      setShowPacket2Modal(true);
    }
  };

  const handleSupermetaClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (!packet2MetaSolved) {
      e.preventDefault();
      setShowSuperMetaModal(true);
    }
  };

  const closeModal = (setModal: React.Dispatch<React.SetStateAction<boolean>>) => setModal(false);

  return (
    <div className="flex flex-wrap items-center justify-center gap-0 sm:flex-nowrap sm:space-y-0 space-y-2">
      <div className="flex basis-full justify-center sm:basis-1/2">
        <div className="flex flex-col items-center">
          <a href={`/packets/${difficulty}/packet-1`}>
            <img
              className="h-[24rem] transition-transform duration-300 hover:scale-105 hover:drop-shadow-[0_4px_15px_rgba(0,0,0,0.6)]"
              src={dvd1.src}
              alt="DVD Packet 1"
            />
          </a>
          <a
            href="/puzzles/packet1"
            className="mt-4 rounded-xl border border-white px-4 py-2 font-mono font-bold blur-[0.5px] transition-all duration-300 ease-in-out hover:border-[#d1d5db] hover:drop-shadow-[0_0_10px_rgba(0,0,0,0.3)]"
          >
            VIEW PUZZLES ONLINE
          </a>
        </div>
      </div>
      {packet1MetaSolved && (
        <div className={`flex justify-center basis-full ${!packet2MetaSolved && "blur-[10px]"}`}>
          <div className="flex flex-col items-center">
            <a
              href={packet2MetaSolved ? `/packets/${difficulty}/supermeta` : "#"}
              onClick={handleSupermetaClick}
            >
              <img
                className="h-[24rem] transition-transform duration-300 hover:scale-105 hover:drop-shadow-[0_4px_15px_rgba(0,0,0,0.6)]"
                src={supermeta.src}
                alt="Supermeta"
              />
            </a>
            <a
              href={packet2MetaSolved ? `/puzzles/supermeta` : "#"}
              onClick={handleSupermetaClick}
              className="mt-4 rounded-xl border border-white px-4 py-2 font-mono font-bold
            blur-[0.5px] transition-all duration-300 ease-in-out hover:border-[#d1d5db]
            hover:drop-shadow-[0_0_10px_rgba(0,0,0,0.3)]"
            >
              VIEW PUZZLE ONLINE
            </a>
          </div>
        </div>
      )}
      <div
        className={`flex basis-full justify-center sm:basis-1/2 ${!packet1MetaSolved && "blur-[10px]"}`}
      >
        <div className="flex flex-col items-center">
          <a
            href={packet1MetaSolved ? `/packets/${difficulty}/packet-2` : "#"}
            onClick={handlePacket2Click}
          >
            <img
              className="h-[24rem] transition-transform duration-300 hover:scale-105 hover:drop-shadow-[0_4px_15px_rgba(0,0,0,0.6)]"
              src={dvd2.src}
              alt="DVD Packet 2"
            />
          </a>
          <a
            href={packet1MetaSolved ? `/puzzles/packet2` : "#"}
            onClick={handlePacket2Click}
            className="mt-4 rounded-xl border border-white px-4 py-2 font-mono font-bold blur-[0.5px] transition-all duration-300 ease-in-out hover:border-[#d1d5db] hover:drop-shadow-[0_0_10px_rgba(0,0,0,0.3)]"
          >
            VIEW PUZZLES ONLINE
          </a>
        </div>
      </div>
      {showPacket2Modal && (
        <PasswordDialog
          slug="building"
          correctPassword={"BYSWIPINGRIGHT"}
          closeModal={() => closeModal(setShowPacket2Modal)}
          message="Finster knows the perfect team for this job - all he has to do is make contact. How has Finster attracted such a committed crew?"
        />
      )}
      {showSupermetaModal && (
        <PasswordDialog
          slug="cracking"
          correctPassword={"LEFTTHEDOORAJAR"}
          closeModal={() => closeModal(setShowSuperMetaModal)}
          message="At last, you make it to the vault room. Benny Candy pulls out his lockpicking tools and gets to work. Stethoscope in hand, he turns the dials and tries to crack the combo. The bank manager once boasted that this vault was uncrackable. What didn't he anticipate?"
        />
      )}
    </div>
  );
}
