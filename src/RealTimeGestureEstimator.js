import GestureEstimator from "./GestureEstimator";
import regeneratorRuntime from "regenerator-runtime";
import * as Events from "events";
const handpose = require('@tensorflow-models/handpose');
require('@tensorflow/tfjs-backend-webgl');

export default class RealTimeGestureEstimator extends Events{

  constructor(knownGestures, estimatorOptions = {}) {
    super();
    this.gestureEstimator = new GestureEstimator(knownGestures, estimatorOptions);
    this.lastGesturePredicted = undefined
  }

  async initialize(videoElement) {
    this.handposeModel = await handpose.load();
    this.videoElement = videoElement
    console.log("Handpose model loaded", this.videoElement);
  }

  async _estimateHands(){
    //the handpose model currently only support one hand, so It is always returning one prediction
    const predictions = await this.handposeModel.estimateHands(this.videoElement, true);
    let currentGesturePrediction = undefined
    if(predictions.length > 0){
      // using a minimum score of 9 (out of 10)
      const est = this.gestureEstimator.estimate(predictions[0].landmarks, 9);
      if(est.gestures.length > 0) {
        // find gesture with highest match score
        let result = est.gestures.reduce((p, c) => {
          return (p.score > c.score) ? p : c;
        });
        currentGesturePrediction = result.name;
      }
    }
    if(this.lastGesturePredicted !== currentGesturePrediction){
      this.emit('gesture', currentGesturePrediction);
      this.lastGesturePredicted = currentGesturePrediction
    }
  }

  startEstimate(fps){
    console.log('startEstimate')
    this.estimateInterval = setInterval(this._estimateHands.bind(this), 1000 / fps);
  }

  stopEstimate(){
    clearInterval(this.estimateInterval)
  }

}
