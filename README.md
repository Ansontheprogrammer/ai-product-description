# AI Product Description

## 📖 Description

A backend package that manages **product descriptions** using **OpenAI GPT models** and **Firebase Firestore**.  
It can be used with **any sales platform** — Shopify, WooCommerce, custom storefronts, or other e-commerce solutions.

- Generates AI-powered product descriptions.
- Stores descriptions per store in Firestore.
- Enforces daily usage limits per store.

---

## ⚙️ Installation

```
npm install openai-product-description
```

Environment Variables
Create a .env file in your project root:

```
OPENAI_API_KEY=your_openai_key
```

# Firebase

```
FIREBASE_API_KEY=your_firebase_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project_bucket
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

# 🚀 Usage

```
import { descriptionModel } from "openai-product-description";

const promptSettings = {
  title: "Camera",
  description: "A compact and powerful DSLR camera",
  customRequest: "Make it sound luxurious",
};

const storeID = "my_store_123";

const description = await descriptionModel.getProductDescription(
  promptSettings,
  storeID
);

console.log(description);
```

# 🧪 Features

Generates AI-powered product descriptions.

Stores and retrieves descriptions from Firebase Firestore.

Enforces daily usage limits per store.

Works with any sales platform or frontend.

# 📝 Notes

This is backend only; users must provide their own frontend.

Make sure Firebase and OpenAI credentials are configured correctly.
