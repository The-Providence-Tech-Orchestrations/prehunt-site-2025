import { useLocalStorage } from "@uidotdev/usehooks";
import { useState } from "react";

import clipboard from "@/assets/puzzles-page/clipboard.png";
import clipboard_expert from "@/assets/puzzles-page/clipboard_expert.png";
import dvd1 from "@/assets/puzzles-page/dvd_1.png";
import dvd2 from "@/assets/puzzles-page/dvd_2.png";
import { PacketSlug, PuzzleDifficulty } from "@/lib/types";

import PasswordDialog from "./PasswordProtectDialog";

const META_1_SLUG = "building";
const META_2_SLUG = "cracking";

const GOOGLE_DRIVE_MIRRORS: Record<PuzzleDifficulty, Record<PacketSlug, string>> = {
  [PuzzleDifficulty.Casual]: {
    [PacketSlug.One]:
      "https://drive.google.com/file/d/1g1gSfzomdHqMBCDUvwjNoGKpBzUqonS1/view?usp=sharing",
    [PacketSlug.Two]:
      "https://drive.google.com/file/d/1dMLBgIRphzgbMLMMRjgmoOQxCH9SoL2u/view?usp=drive_link",
    [PacketSlug.SuperMeta]:
      "https://drive.google.com/file/d/1f9DpImagwVXS8jaYZJTcbYV4jFDA_Dky/view?usp=drive_link",
  },
  [PuzzleDifficulty.Expert]: {
    [PacketSlug.One]:
      "https://drive.google.com/file/d/1bm1CLfOKgRxYVssLGd9LvlJtSibzY4i7/view?usp=drive_link",
    [PacketSlug.Two]:
      "https://drive.google.com/file/d/1KlTJY-So9vcq3KZw2F7LoAdHHbEDJhe4/view?usp=drive_link",
    [PacketSlug.SuperMeta]:
      "https://drive.google.com/file/d/1COw5awVIiYb0SBj2677Sq2gdEwPMtqHh/view?usp=drive_link",
  },
};

function generatePDFLink(
  isMobile: boolean,
  difficulty: PuzzleDifficulty,
  slug: PacketSlug,
): string {
  return !isMobile ? `packets/${difficulty}/${slug}` : GOOGLE_DRIVE_MIRRORS[difficulty][slug];
}

export default function PacketView() {
  const isMobile = import.meta.env.SSR ? false : window.innerWidth <= 768;

  const [isExpert, _setisExpert] = useLocalStorage("2025_prehunt/puzzle-mode", true);
  const difficulty: PuzzleDifficulty = isExpert ? PuzzleDifficulty.Expert : PuzzleDifficulty.Casual;

  const packet1MetaVisible = true;
  const packet2MetaVisible = true;
  const huntFullyVisible = true;

  const packet1MetaSolved =
    (localStorage.getItem(`2025_prehunt/casual/${META_1_SLUG}_solution`) !== `""` &&
      localStorage.getItem(`2025_prehunt/casual/${META_1_SLUG}_solution`)) ||
    (localStorage.getItem(`2025_prehunt/expert/${META_1_SLUG}_solution`) !== `""` &&
      localStorage.getItem(`2025_prehunt/expert/${META_1_SLUG}_solution`));

  const packet2MetaSolved =
    (localStorage.getItem(`2025_prehunt/casual/${META_2_SLUG}_solution`) !== `""` &&
      localStorage.getItem(`2025_prehunt/casual/${META_2_SLUG}_solution`)) ||
    (localStorage.getItem(`2025_prehunt/expert/${META_2_SLUG}_solution`) !== `""` &&
      localStorage.getItem(`2025_prehunt/xpert/${META_2_SLUG}_solution`));

  const huntSolved =
    (localStorage.getItem(`2025_prehunt/casual/supermeta_solution`) !== `""` &&
      localStorage.getItem(`2025_prehunt/casual/supermeta_solution`)) ||
    (localStorage.getItem(`2025_prehunt/expert/supermeta_solution`) !== `""` &&
      localStorage.getItem(`2025_prehunt/expert/supermeta_solution`));

  const [showPacket2Modal, setShowPacket2Modal] = useState(false);
  const [showSupermetaModal, setShowSuperMetaModal] = useState(false);

  const handlePacket2Click: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (!packet1MetaVisible) {
      e.preventDefault();
      setShowPacket2Modal(true);
    }
  };

  const handleSupermetaClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (!packet2MetaVisible) {
      e.preventDefault();
      setShowSuperMetaModal(true);
    }
  };

  const closeModal = (setModal: React.Dispatch<React.SetStateAction<boolean>>) => setModal(false);

  return (
    <div className="flex flex-col justify-center items-center order-1">
      <div className="flex flex-wrap items-center justify-center gap-10 sm:flex-nowrap sm:space-y-0 space-y-2">
        <div className="flex basis-full justify-center sm:basis-1/2 relative">
          <div className="flex flex-col items-center">
            <a href={`puzzles/packet1`}>
              <img
                className="h-[24rem] max-w-max transition-transform duration-300 hover:scale-105 hover:drop-shadow-[0_4px_15px_rgba(0,0,0,0.6)]"
                src={dvd1.src}
                alt="DVD Packet 1"
              />
              {packet1MetaVisible && (
                <div
                  className="absolute text-opacity-80 inset-0 flex transition duration-300 items-center justify-center text-white text-6xl font-bold pointer-events-none blur-[2px]
                invert-[.16] sepia-[.64] saturate-[30.18] hue-rotate-[145deg] brightness-[.88] contrast-[.92]"
                >
                  {packet1MetaSolved && "✅" }
                </div>
              )}
            </a>
            <a
              href={generatePDFLink(isMobile, difficulty, PacketSlug.One)}
              className="mt-4 rounded-xl border border-white px-4 py-2 font-mono font-bold blur-[0.5px] transition-all duration-300 ease-in-out hover:border-[#d1d5db] hover:drop-shadow-[0_0_10px_rgba(0,0,0,0.3)]"
            >
              VIEW PDF
            </a>
          </div>
        </div>

        <hr className="sm:hidden w-full border-t-2 border-gray-300 order-2" />

        {packet1MetaVisible && (
          <div
            className={`flex justify-center basis-full order-7 sm:order-3 relative ${!packet2MetaVisible && "blur-[10px]"}`}
          >
            <div className="flex flex-col items-center">
              <a
                className="px-4 py-2 bg-gray-100 text-white rounded-[0.3rem]"
                href={
                  packet2MetaVisible
                    ? `puzzles/${difficulty}/supermeta`
                    : "#"
                }
                onClick={handleSupermetaClick}
              >
                <img
                  className="h-[18rem] max-w-max transition-transform duration-300 hover:scale-105 drop-shadow-[0_10px_20px_rgba(64,0,64,0.8)]"
                  src={isExpert ? clipboard_expert.src : clipboard.src}
                  alt="Supermeta"
                />
                {huntFullyVisible && (
                  <div
                    className="absolute text-opacity-80 inset-0 flex transition duration-300 items-center justify-center text-white text-6xl font-bold pointer-events-none blur-[2px]
                  invert-[.16] sepia-[.64] saturate-[30.18] hue-rotate-[145deg] brightness-[.88] contrast-[.92]"
                  >
                    {huntSolved && "✅" }
                  </div>
                )}
              </a>
              <a
                href={
                  packet2MetaVisible
                    ? generatePDFLink(isMobile, difficulty, PacketSlug.SuperMeta)
                    : "#"
                }
                onClick={handleSupermetaClick}
                className="mt-4 rounded-xl border border-white px-4 py-2 font-mono font-bold
            blur-[0.5px] transition-all duration-300 ease-in-out hover:border-[#d1d5db]
            hover:drop-shadow-[0_0_10px_rgba(0,0,0,0.3)]"
              >
                VIEW PDF
              </a>
            </div>
          </div>
        )}

        <hr className="sm:hidden w-full border-t-2 border-gray-300 order-6 sm:order-4" />

        <div
          className={`flex basis-full justify-center sm:basis-1/2 relative order-5 ${!packet1MetaVisible && "blur-[10px]"}`}
        >
          <div className="flex flex-col items-center">
            <a href={packet1MetaVisible ? `puzzles/packet2` : "#"} onClick={handlePacket2Click}>
              <img
                className="h-[24rem] max-w-max  transition-transform duration-300 hover:scale-105 hover:drop-shadow-[0_4px_15px_rgba(0,0,0,0.6)]"
                src={dvd2.src}
                alt="DVD Packet 2"
              />
              {packet2MetaVisible && (
                <div
                  className="absolute text-opacity-80 inset-0 flex transition duration-300 items-center justify-center text-white text-6xl font-bold pointer-events-none blur-[2px]
                invert-[.16] sepia-[.64] saturate-[30.18] hue-rotate-[145deg] brightness-[.88] contrast-[.92]"
                >
                  {packet2MetaSolved && "✅" }
                </div>
              )}
            </a>
            <a
              href={packet1MetaVisible ? generatePDFLink(isMobile, difficulty, PacketSlug.Two) : "#"}
              onClick={handlePacket2Click}
              className="mt-4 rounded-xl border border-white px-4 py-2 font-mono font-bold blur-[0.5px] transition-all duration-300 ease-in-out hover:border-[#d1d5db] hover:drop-shadow-[0_0_10px_rgba(0,0,0,0.3)]"
            >
              VIEW PDF
            </a>
          </div>
        </div>
      </div>

      {huntFullyVisible && (
        <>
          <hr className="sm:hidden my-4 w-full border-t-4 border-gray-300 order-6" />
          <a
            className="mt-4 text-xl rounded-xl border-4 border-[#63268a99] px-4 py-2 font-mono font-bold blur-[0.5px] transition-all duration-300 ease-in-out hover:scale-105 hover:border-[#63268aff] hover:drop-shadow-[0_0_10px_rgba(0,0,0,0.3)]
        px-4 py-2 rounded-[0.3rem] order-7"
            href="/2025/heist/Conclusion.pdf"
          >
            📖 CONCLUSION 📖
          </a>
        </>
      )}

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
