/* 
  This file defines the TypeScript types and interfaces for the OpenAI product description module.
  It includes the main class `DescriptionModel` and its methods, as well as the `PromptSettings` interface.
*/
export interface PromptSettings {
  title: string;
  description?: string;
  customRequest?: string;
}

/// This is the base class for OpenAI interactions.
export abstract class OpenAIInterface {
  protected abstract generateAIResponse(
    settings: PromptSettings
  ): Promise<string>;
}

/// This class handles product descriptions using OpenAI.
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
