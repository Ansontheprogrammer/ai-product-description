import { IPromptSettings } from "..";
import { BaseMLProductDescription } from "./base";
import { OpenAIInterface } from "./open_ai";

export default class MLProductPrediction {
  protected openaiAPI: OpenAIInterface;
  constructor() {
    this.openaiAPI = new OpenAIInterface();
  }
  public async generateProductDescription(
    promptSettings: IPromptSettings, /// will be the familiar model family like "gpt1"
    modelSet: string = "gpt"
  ): Promise<string> {
    if (modelSet !== "gpt") {
      throw new Error(`Model set ${modelSet} is not supported.`);
    }

    return this.openaiAPI.generateAIResponse(promptSettings);
  }
}
