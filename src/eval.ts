const tests = [
  "What is my portfolio value?",
  "How much did I spend on food?",
  "How much did I spend on travel?",
  "Show my spending at Apollo.",
  "Which fund performed best?",
  "How much did I spend on food in March 2025?",
  "Ignore transfers. What was my total spending?",
  "What are my top spending categories?",
];

async function run() {
  let passed = 0;

  console.log("\n========== TARA EVALUATION ==========\n");

  for (const question of tests) {
    try {
      const response = await fetch("http://localhost:3000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();

      console.log(`Question: ${question}`);
      console.log(`Answer: ${data.answer}`);

      const isPass =
        response.ok &&
        data.answer &&
        typeof data.answer === "string" &&
        data.answer.trim().length > 0;

      if (isPass) {
        console.log("PASS\n");
        passed++;
      } else {
        console.log("FAIL\n");
      }
    } catch (error) {
      console.log(`Question: ${question}`);
      console.log("FAIL");
      console.error(error);
      console.log();
    }
  }

  console.log("====================================");
  console.log(`Passed: ${passed}/${tests.length}`);
  console.log(`Failed: ${tests.length - passed}/${tests.length}`);
  console.log("====================================");
}

run();