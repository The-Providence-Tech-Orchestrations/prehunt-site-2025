import { useLocalStorage } from "@uidotdev/usehooks";

import ModePickDialog from "./ModePickDialog";
import ResetProgressDialog from "./ResetProgressDialog";
import StoryDialog from "./StoryDialog";

function ModePicker() {
  const [isExpert, setisExpert] = useLocalStorage("puzzle-mode", true);

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 py-4 space-x-2">
      <StoryDialog />
      <div>|</div>
      <div className="flex gap-2 sm:w-auto">
        <p className={`font-bold ${!isExpert && "blur-[0.5px]"}`}>Casual</p>
        <input
          className="appearance-none w-14 h-6 rounded-full relative cursor-pointer outline-none transition-all duration-200 ease-in-out bg-gray-300 checked:bg-[#63268a] after:content-[''] after:absolute after:w-6 after:h-6 after:rounded-full after:bg-white after:left-0 after:transition-all after:duration-200 after:ease-in-out after:checked:left-[calc(100%_-_1.5rem)]"
          type="checkbox"
          checked={isExpert}
          onChange={() => {
            setisExpert(!isExpert);
          }}
        />
        <p className={`font-bold ${isExpert && "blur-[0.5px]"}`}>Expert</p>
      </div>
      <div>|</div>
      <ModePickDialog />
      <div className="sm:hidden block">
        <ResetProgressDialog />
      </div>
    </div>
  );
}

export default ModePicker;
