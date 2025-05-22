import * as mobilenet from "@tensorflow-models/mobilenet";
import "@tensorflow/tfjs";

let model = null;

// Load model once and reuse it
export const loadModel = async () => {
  if (!model) {
    model = await mobilenet.load();
  }
  return model;
};

export const classifyImage = async (imageElement) => {
  const model = await loadModel();
  const predictions = await model.classify(imageElement);
  return predictions;
};
