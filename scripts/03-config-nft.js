import sdk from "./01-initialize-sdk.js";
import { readFileSync } from "fs";

import dotenv from "dotenv";
dotenv.config();

const bundleDrop = sdk.getBundleDropModule(
  process.env.BUNDLE_DROP_MODULE,
);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "SpanishDAO",
        description: "This NFT will give you access to SpanishDAO!",
        image: readFileSync("scripts/assets/SpanishDAONFT.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})()