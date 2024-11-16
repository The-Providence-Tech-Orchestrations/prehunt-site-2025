import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect } from "react";

import { checkAnswer } from "@/lib/checker";

interface AnswerSubmissionProps {
  encoded_answer: string;
  encoded_keep_going: Record<string, string>;
  slug: string;
}

const sha256 = async (answer: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(answer);

  const hash = await crypto.subtle.digest("SHA-256", data);

  const hashArray = Array.from(new Uint8Array(hash));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

  return hashHex;
};

const cleanInputAnswer = (answer: string) => {
  return answer
    .toLocaleUpperCase()
    .trim()
    .split("")
    .filter((char) => "A" <= char && char <= "Z")
    .join("");
};

export default function AnswerSubmission({
  encoded_answer,
  encoded_keep_going,
  slug,
}: AnswerSubmissionProps) {
  const [history, setHistory] = useLocalStorage<[string, string][]>(`${slug}_history`, []);

  const solved = localStorage.getItem(`${slug}_solution`) !== `""`;

  const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const input = cleanInputAnswer(((e.target as any)[0] as HTMLInputElement).value);

    checkAnswer(input, encoded_answer, encoded_keep_going, slug, history, setHistory);
  };

  return (
    <form onSubmit={onSubmitHandler} className="mx-auto">
      <div className="flex gap-4 mt-4">
        <input
          type="text"
          id="answerInput"
          placeholder="GUESS ANSWER"
          className="border-2 rounded blur-[1px] focus:blur-[0.5px] transition-all duration-300 text-transform: uppercase"
          style={{ textTransform: "uppercase" }}
          disabled={solved}
        />

        <button
          type="submit"
          className={`rounded-xl  px-4 py-2 text-white font-semibold  transition duration-100 ${!solved ? "bg-gray-500 hover:bg-gray-600" : "bg-green-100"}`}
          disabled={solved}
        >
          Submit
        </button>
        <a
          className="rounded-xl bg-gray-500 px-4 py-2 text-white font-semibold hover:bg-gray-600 transition"
          href={`/solutions/${slug}`}
        >
          View Solution
        </a>
      </div>
      <div id="status" className="text-[red] mt-4"></div>
      {history.length != 0 && (
        <div
          id="log"
          className="overflow-y-auto max-h-40 my-8 border-4 border-gray-300 rounded p-4"
        >
          {history.map((submission, i) => (
            <div
              key={`submission_${i}`}
              className="flex justify-between items-center py-2 border-b last:border-b-0 border-gray-200"
            >
              <p
                className={`text-left font-mono ${submission[1] == "✅" ? "text-green-800 font-bold" : "text-gray-800"}`}
              >
                {submission[0]}
              </p>
              <p className="text-right text-gray-600">{submission[1]}</p>
            </div>
          ))}
        </div>
      )}
    </form>
  );
}
