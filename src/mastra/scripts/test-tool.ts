import { transactionTool } from "../tools/transactionTool";

async function run() {
  const result = await transactionTool.execute({
    category: "food",
  });

  console.log(result);
}

run();