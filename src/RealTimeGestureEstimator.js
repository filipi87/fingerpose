import GestureEstimator from "./GestureEstimator";
import regeneratorRuntime from "regenerator-runtime";
import * as Events from "events";
const handpose = require('@tensorflow-models/handpose');
require('@tensorflow/tfjs-backend-webgl');

export default class RealTimeGestureEstimator extends Events{

  constructor(knownGestures, estimatorOptions = {}) {
    super();
    this.gestureEstimator = new GestureEstimator(knownGestures, estimatorOptions);
  }

  async initialize(videoElement) {
    this.handposeModel = await handpose.load();
    this.videoElement = videoElement
    console.log("Handpose model loaded", this.videoElement);
  }

  async _estimateHands(){
    const predictions = await this.handposeModel.estimateHands(this.videoElement, true);
    for(let i = 0; i < predictions.length; i++) {
      // estimate gestures based on landmarks
      // using a minimum score of 9 (out of 10)
      // gesture candidates with lower score will not be returned
      const est = this.gestureEstimator.estimate(predictions[i].landmarks, 9);
      if(est.gestures.length > 0) {
        // find gesture with highest match score
        let result = est.gestures.reduce((p, c) => {
          return (p.score > c.score) ? p : c;
        });
        const gesture = result.name;
        //TODO we could include business logic to just emit events when the gesture changes
        this.emit('gesture', gesture);
      }
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
