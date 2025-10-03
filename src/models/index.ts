import { BaseMLProductDescription } from "./base";
import { OpenAIInterface } from "./open_ai";

export default class MLProductPrediction {
  public openaiAPI: OpenAIInterface;
  constructor() {
    this.openaiAPI = new OpenAIInterface();
  }
  public async generateProductDescription(
    promptSettings: {
      title: string;
      description?: string;
      customRequest?: string;
    }, /// will be the familiar model family like "gpt1"
    modelSet: string = "gpt"
  ): Promise<string> {
    if (modelSet !== "gpt") {
      throw new Error(`Model set ${modelSet} is not supported.`);
    }

    return this.openaiAPI.generateAIResponse(promptSettings);
  }
}
