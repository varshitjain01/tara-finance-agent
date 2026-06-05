const questions = [
  "What is my portfolio value?",
  "How much did I spend on food?",
  "How much did I spend on travel?",
];

async function run() {
  let passed = 0;

  for (const question of questions) {
    try {
      const response = await fetch("http://localhost:3000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();
      console.log(data);

      if (data.answer) {
        console.log(`PASS: ${question}`);
        passed++;
      } else {
        console.log(`FAIL: ${question}`);
      }
    } catch {
      console.log(`FAIL: ${question}`);
    }
  }

  console.log("\n----------------------");
  console.log(`Passed: ${passed}/${questions.length}`);
  console.log("----------------------");
}

run();