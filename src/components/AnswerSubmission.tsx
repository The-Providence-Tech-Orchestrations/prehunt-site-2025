import { checkAnswer } from "@/lib/checker";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect } from "react";

interface AnswerSubmissionProps {
  encoded_answer: string;
  encoded_keep_going: Record<string,string>;
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
  slug
}: AnswerSubmissionProps) {

  const [history, setHistory] = useLocalStorage<[string, string][]>(`${slug}_history`, []);

  const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
  
    const input = cleanInputAnswer(((e.target as any)[0] as HTMLInputElement).value);

    checkAnswer(input, encoded_answer, encoded_keep_going, slug, history, setHistory);
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <h1>Submit Answers for {slug}</h1>
      <input type="text" id="answerInput" placeholder="Enter your answer" />
      <button type="submit">submit</button>
      <div id="status"></div>
      <div id="log">
        <h2>Submission Log</h2>
        {history.map((submission, i) => (
          <div key={`submission_${i}`}>
            <p>Submission: {submission[0]}</p>
            <p>Result: {submission[1]}</p>
          </div>
        ))}
      </div>
    </form>
  );
}
