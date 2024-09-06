import { useLocalStorage } from "@uidotdev/usehooks";

interface AnswerSubmissionProps {
  answerHash: string;
  fuzzyMatches?: Set<string>;
  onSuccess?: () => void;
  onFuzzyMatch?: () => void;
  onFailure?: () => void;
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
  answerHash,
  fuzzyMatches,
  onSuccess,
  onFuzzyMatch,
  onFailure,
}: AnswerSubmissionProps) {
  //! useLocalStorage is a client-side only hook, and will throw an error on the server
  //! To get around this make sure to load the component using the `client:only` astro directive
  const [answers, setAnswers] = useLocalStorage("submittedAnswers", new Set<string>());

  // TODO: Add logic to handle incorrect answers and fuzzy matches,
  // could be done via toasts (see https://react-hot-toast.com/)
  // Could also use react-hook-form or something for form validation
  const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const input = cleanInputAnswer(((e.target as any)[0] as HTMLInputElement).value);

    if (input == "") {
      return;
    }

    const inputHash = await sha256(input);

    if (answerHash == inputHash) {
      setAnswers(new Set([...answers, input]));
      onSuccess && onSuccess();
    } else if (fuzzyMatches && fuzzyMatches.has(input)) {
      onFuzzyMatch && onFuzzyMatch();
    } else {
      onFailure && onFailure();
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <input type="text" />
      <button type="submit">Submit</button>
    </form>
  );
}
