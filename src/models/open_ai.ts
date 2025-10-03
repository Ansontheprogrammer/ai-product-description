import * as dotenv from "dotenv";
import OpenAI from "openai";
import { BaseMLProductDescription, IPromptSettings } from "./base";

dotenv.config();
export class OpenAIInterface extends BaseMLProductDescription {
  openai: OpenAI;
  constructor() {
    super();
    this.initializeClient();
  }
  initializeClient() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateAIResponse(promptSettings: IPromptSettings): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4.1",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that writes short product descriptions.",
          },
          {
            role: "user",
            content: this.generateProductDescriptionPrompt(promptSettings),
          },
        ],
        max_completion_tokens: 1000,
      });

      return response.choices?.[0]?.message?.content ?? "";
    } catch (error) {
      console.error("Error generating AI response:", error);
      throw error;
    }
  }
}
