import mlProductPrediction from "./models/";
export interface IProduct {
  id: string;
  title: string;
  description: string;
  descriptionHtml: string;
  tags: string[];
  images: string;
  variants: string[];
  seo: string[];
}

export interface IPromptSettings {
  product: IProduct;
  customRequest?: string;
  format?: "shopify_remix" | "plain_text";
}
export default new mlProductPrediction();
