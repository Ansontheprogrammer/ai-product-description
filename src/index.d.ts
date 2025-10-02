// index.d.ts

export interface PromptSettings {
  title: string;
  description?: string;
  customRequest?: string;
}

export abstract class OpenAIInterface {
  protected abstract generateAIResponse(
    settings: PromptSettings
  ): Promise<string>;
}

export class DescriptionModel extends OpenAIInterface {
  create(shopifyStoreID: string, text: string): Promise<any>;

  protected generateAIResponse(settings: PromptSettings): Promise<string>;
  verifyUserUsage(storeID: string): Promise<boolean>;

  getByStoreID(shopifyStoreID: string): Promise<
    Array<{
      id: string;
      [key: string]: any;
    }>
  >;

  getProductDescription(
    settings: PromptSettings,
    storeID: string
  ): Promise<string>;
}

export const descriptionModel: DescriptionModel;
