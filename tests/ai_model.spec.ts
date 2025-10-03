// tests/system.test.ts
import dotenv from "dotenv";
import MLProductPrediction from "../src/models";
dotenv.config();

describe("System Checks", () => {
  it.only("should make a request to OpenAI using model 4.1.0", async () => {
    jest.unmock("openai"); // <- Bypass the mock for this test
    const OpenAI = (await import("openai")).default; // Import after unmocking

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        {
          role: "user",
          content: "Say 'Hello World!'",
        },
      ],
    });

    expect(response.choices[0].message.content).toMatch(/Hello World!/i);
  });
});
