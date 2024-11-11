import { useLocalStorage } from "@uidotdev/usehooks";

function ModePicker() {
  const [isCasual, setIsCasual] = useLocalStorage("puzzle-mode", true);

  return (
    <div className="flex gap-2 py-4">
      <p className="font-bold">Casual</p>
      <input
        className="appearance-none w-14 h-6 rounded-full relative cursor-pointer outline-none transition-all duration-200 ease-in-out bg-gray-300 checked:bg-[#0ebeff] after:content-[''] after:absolute after:w-6 after:h-6 after:rounded-full after:bg-white after:left-0 after:transition-all after:duration-200 after:ease-in-out after:checked:left-[calc(100%_-_1.5rem)]"
        type="checkbox"
        onChange={() => {
          setIsCasual(!isCasual);
        }}
      />
      <p className="font-bold">Expert</p>
    </div>
  );
}

export default ModePicker;
