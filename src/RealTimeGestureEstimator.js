import GestureEstimator from "./GestureEstimator";

const handpose = require('@tensorflow-models/handpose');
require('@tensorflow/tfjs-backend-webgl');

export default class RealTimeGestureEstimator extends Event{

  constructor(knownGestures, estimatorOptions = {}) {
    super();
    this.gestureEstimator = new GestureEstimator(knownGestures, estimatorOptions);
  }

  async initialize( { mediaStream, videoWidth, videoHeight }) {
    this.handposeModel = await handpose.load();
    console.log("Handpose model loaded");

    this.videoElement = document.createElement('video')
    this.videoElement.width = videoWidth;
    this.videoElement.height = videoHeight;
    this.videoElement.srcObject = mediaStream;
    this.videoElement.onloadedmetadata = () => {
      this.videoElement.play();
    };

    return new Promise(resolve => {
      this.videoElement.addEventListener("loadeddata", event => {
        resolve();
      });
    });
  }

  async _estimateHands(){
    const predictions = await this.handposeModel.estimateHands(this.videoElement, true);
    for(let i = 0; i < predictions.length; i++) {
      // estimate gestures based on landmarks
      // using a minimum score of 9 (out of 10)
      // gesture candidates with lower score will not be returned
      const est = this.estimate(predictions[i].landmarks, 9);
      if(est.gestures.length > 0) {
        // find gesture with highest match score
        let result = est.gestures.reduce((p, c) => {
          return (p.score > c.score) ? p : c;
        });
        const gesture = result.name;
        this.emit('gesture', gesture);
      }
    }
  }

  startEstimate(fps){
    this.estimateInterval = setInterval(() => { this._estimateHands(); }, 1000 / fps);
  }

  stopEstimate(){
    clearInterval(this.estimateInterval)
  }

}
