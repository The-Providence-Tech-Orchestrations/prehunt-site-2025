import React, { useEffect, useRef, useState } from "react";

import localStoragePrefix from "@/lib/localStoragePrefix";
import { cleanInputAnswer } from "@/lib/utils";

interface PasswordDialogProps {
  children?: React.ReactNode;
  closeModal: () => void;
  message: string;
  slug: string;
  correctPassword: string;
}

function validatePassword(inputPassword: string, correctPassword: string) {
  if (!inputPassword) {
    return { isValid: false, message: "" };
  }

  // console.log(inputPassword, correctPassword);

  if (inputPassword !== correctPassword) {
    return { isValid: false, message: "Incorrect answer. Please try again." };
  }

  return { isValid: true, message: "Correct! Unlocking packet..." };
}

const PasswordDialog: React.FC<PasswordDialogProps> = ({
  children,
  closeModal,
  message,
  slug,
  correctPassword,
}) => {
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Automatically focus the input field when the dialog opens
    inputRef.current?.focus();

    // Close modal if clicking outside
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [closeModal]);

  const handleSubmit = () => {
    const result = validatePassword(cleanInputAnswer(password), correctPassword);

    if (result.isValid) {
      setFeedback(null);
      localStorage.setItem(`${localStoragePrefix}casual/${slug}_solution`, correctPassword);
      localStorage.setItem(`${localStoragePrefix}expert/${slug}_solution`, correctPassword);
      closeModal();
    } else {
      setFeedback(result.message);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div
      role="dialog"
      aria-describedby="password-modal-description"
      aria-labelledby="password-modal-title"
      data-state="open"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
      style={{ pointerEvents: "auto" }}
    >
      <div
        ref={modalRef}
        className="relative z-10 grid w-full max-w-lg gap-4 border p-6 shadow-lg bg-black sm:rounded-lg"
      >
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <h2
            id="password-modal-title"
            className="text-lg font-semibold leading-none tracking-tight text-white blur-[0.75px] text-center pt-4"
          >
            🔒🔒🔒
          </h2>
          <p
            id="password-modal-description"
            className="text-xs sm:text-sm text-center text-white blur-[0.75px] pt-2"
          >
            {message}
          </p>
        </div>
        <input
          ref={inputRef}
          type="text"
          id="answerInput"
          placeholder="ANSWER"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          className="border-2 rounded blur-[0.5px] focus:blur-[0.25px] transition-all duration-300 text-transform: uppercase"
        />
        {feedback && <p className="text-red-500 text-sm mt-2">{feedback}</p>}
        <div className="mt-4 flex justify-end blur-[0.5px]">
          <button
            className="rounded-full ml-2 px-4 py-2 text-white border border-zinc-400 transition-all blur-[0.5px] hover:border-zinc-800 blur-[0.75px]"
            onClick={handleSubmit}
          >
            SUBMIT
          </button>
        </div>
        <button
          type="button"
          onClick={closeModal}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-white"
          >
            <path
              d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close</span>
        </button>
      </div>
    </div>
  );
};

export default PasswordDialog;