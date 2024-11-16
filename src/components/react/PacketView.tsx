import { useLocalStorage } from "@uidotdev/usehooks";
import { useState } from "react";

import dvd1 from "@/assets/puzzles-page/dvd_1.png";
import dvd2 from "@/assets/puzzles-page/dvd_2.png";
import { PuzzleDifficulty } from "@/lib/types";

import PasswordDialog from "./PasswordProtectDialog";

const META_1_SLUG = "building";
const META_2_SLUG = "unfolding";

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

  const [showModal, setShowModal] = useState(false);

  const handleClick = (e) => {
    if (!packet1MetaSolved) {
      e.preventDefault();
      setShowModal(true);
    }
  };

  const closeModal = () => setShowModal(false);

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 sm:flex-nowrap sm:space-y-0 space-y-2">
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
            className="mt-4 rounded-md rounded-xl border border-[white] px-4 py-2 font-mono font-bold blur-[0.5px] transition-all duration-300 ease-in-out hover:border-[#d1d5db] hover:drop-shadow-[0_0_10px_rgba(0,0,0,0.3)]"
          >
            ( VIEW PUZZLES ONLINE )
          </a>
        </div>
      </div>
      <div
        className={`flex basis-full justify-center sm:basis-1/2 ${!packet1MetaSolved && "blur-[10px]"}`}
      >
        <div className="flex flex-col items-center">
          <a
            href={packet1MetaSolved ? `/packets/${difficulty}/packet-2` : "#"}
            onClick={handleClick}
          >
            <img
              className="h-[24rem] transition-transform duration-300 hover:scale-105 hover:drop-shadow-[0_4px_15px_rgba(0,0,0,0.6)]"
              src={dvd2.src}
              alt="DVD Packet 2"
            />
          </a>
          <a
            href={packet1MetaSolved ? `/puzzles/packet2` : "#"}
            onClick={handleClick}
            className="mt-4 rounded-md rounded-xl border border-[white] px-4 py-2 font-mono font-bold blur-[0.5px] transition-all duration-300 ease-in-out hover:border-[#d1d5db] hover:drop-shadow-[0_0_10px_rgba(0,0,0,0.3)]"
          >
            ( VIEW PUZZLES ONLINE )
          </a>
        </div>
      </div>
      {showModal && (
        <PasswordDialog
          correctPassword={"BYSWIPINGRIGHT"}
          closeModal={closeModal}
          message="Finster knows the perfect team for this job - all he has to do is make contact. How has Finster attracted such a committed crew?"
        />
      )}
    </div>
  );
}
