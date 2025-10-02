import { OpenAIInterface } from "../ai_model";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  Timestamp,
  Firestore,
  CollectionReference,
} from "firebase/firestore";
import { db } from "./client.server";

export class DescriptionModel extends OpenAIInterface {
  private descriptionCollection = collection(db, "descriptions");
  public async create(shopifyStoreID: string, text: string) {
    return await addDoc(this.descriptionCollection, {
      shopifyStoreID: shopifyStoreID,
      text: text,
      datetime: new Date(),
    });
  }

  public async verifyUserUsage(storeID: string) {
    try {
      const descriptions = await this.getByStoreID(storeID);

      // Start and end of today
      const now = new Date();
      const startOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      );
      const endOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1
      );

      // Filter only descriptions created today
      const todaysDescriptions = descriptions.filter((desc: any) => {
        const created =
          desc.datetime instanceof Timestamp
            ? desc.datetime.toDate()
            : new Date(desc.datetime);

        return created >= startOfDay && created < endOfDay;
      });

      /// Limit the user to only 10 descriptions currently.
      if (todaysDescriptions.length >= 10) {
        throw new Error("USAGE_LIMIT_REACHED");
      }

      return true;
    } catch (error) {
      throw error;
    }
  }

  public async getByStoreID(shopifyStoreID: string) {
    const q = query(
      this.descriptionCollection,
      where("shopifyStoreID", "==", shopifyStoreID)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  public async getProductDescription(settings, storeID) {
    try {
      // verify usage limits
      await this.verifyUserUsage(storeID);
      // get description from model.
      const description = await this.generateAIResponse(settings);
      // save description for user.
      await this.create(storeID, description);

      return description;
    } catch (error) {
      console.error("Error generating AI response:", error);
      throw error;
    }
  }
}
