import { portfolioTool } from "../tools/portfolioTool";

async function run() {
  const result = await portfolioTool.execute({});
  console.log(result);
}

run();