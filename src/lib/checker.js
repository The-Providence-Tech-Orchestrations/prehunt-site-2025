const rateLimit = { submissions: 3, timeout: 20 };

// Rate limiting variables
let submissionTimes = [];
let ratelimited = false;
let enabled = true;

export function checkAnswer(
  userAnswer,
  encodedAnswer,
  keepGoingPhrases,
  slug,
  history,
  setHistory,
) {
  const answerInput = document.getElementById("answerInput");
  // const userAnswer = answerInput.value.trim();
  const statusDiv = document.getElementById("status");
  let responseMessage = "";

  if (userAnswer == "" || !enabled || localStorage.getItem(`${slug}_solution`)) {
    return;
  }

  // Check for "keep going" phrases

  for (const [encodedPhrase, encodedMessage] of Object.entries(keepGoingPhrases)) {
    if (atob(encodedPhrase) === userAnswer) {
      responseMessage = atob(encodedMessage);
    }
  }

  // Check for correct answer
  userAnswer.replace(/[^a-zA-Z]/g, "");
  const uppercaseAnswer = userAnswer.toUpperCase();
  if (atob(encodedAnswer) === uppercaseAnswer) {
    responseMessage = "Correct!";
    localStorage.setItem(`${slug}_solution`, uppercaseAnswer);
  } else if (!responseMessage) {
    responseMessage = "Nope!";
  }
  history = [[uppercaseAnswer, responseMessage], ...history];
  // console.log("HISTORY:", history)
  setHistory(history);

  // Check rate limit
  const now = Date.now();
  submissionTimes = submissionTimes.filter((time) => now - time < rateLimit.timeout * 1000);
  submissionTimes.push(now);

  if (submissionTimes.length > rateLimit.submissions) {
    var wait = Math.ceil(rateLimit.timeout - (now - submissionTimes[0]) / 1000);
    if (!ratelimited) {
      // statusDiv.textContent = `This answer checker runs locally in your browser and can be circumvented in any number of ways, but we think you'll have more fun if you don't spam guesses. `;
      ratelimited = true;
    }
    statusDiv.textContent += `Try again in ${wait} seconds.`;
    enabled = false;
    setTimeout(function tick() {
      wait -= 1;
      if (wait > 0) {
        statusDiv.textContent = statusDiv.textContent.replace(/\d+/, `${wait}`);
        setTimeout(tick, 1000);
      } else {
        enabled = true;
        statusDiv.textContent = "";
      }
    }, 1000);
  }

  answerInput.value = "";
}
