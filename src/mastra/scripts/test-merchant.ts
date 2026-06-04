import { merchantTool } from "../tools/merchantTool";

async function run() {
  const result = await merchantTool.execute({
    merchant: "APOLLO",
  });

  console.log(result);
}

run();