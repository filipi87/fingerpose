# Fingerpose

Finger gesture classifier for hand landmarks detected by [MediaPipe Handpose].

This project is a fork from the Fingerpose: https://github.com/andypotato/fingerpose

# Table of contents

- [How it works](#how-it-works)
- [Installation](#installation)
- [Demo](#demo)
- [Quick start](#quickstart)
- [Known issues and limitations](#known-issues-and-limitations)
- [Credits](#credits)

## How it works

Gesture detection works in three steps:

 1. Detect the hand landmarks inside the video picture
 2. Estimating the direction and curl of each individual finger
 3. Comparing the result to a set of gesture descriptions

Step (1) is performed by MediaPipe Handpose, Step (2) and (3) are handled by this library.

## Installation
```
yarn install
```

## Demo
```
yarn demo
```

## Quick start

### Include the dist inside your project
```
<script src="/dist/fingerpose.js" type="text/javascript"></script>
or
import { RealTimeGestureEstimator, Gestures as PossibleGestures } from './fingerpose';
```

### Estimate the gestures
```
const knownGestures = [
    fp.Gestures.VictoryGesture,
    fp.Gestures.ThumbsUpGesture,
    fp.Gestures.ThumbsDownGesture,
    fp.Gestures.RaisedBackHandGesture,
    fp.Gestures.RaisedFistHandGesture,
    fp.Gestures.WhiteUpPointing,
];

const GE = new fp.RealTimeGestureEstimator(knownGestures);
GE.on('gesture', (gesture) => {
    console.log('gesture', gesture)
});
await GE.initialize(video);
GE.startEstimate(config.video.fps)
```

## Known issues and limitations
 - Currently only one hand is supported at the same time. This is a limitation of the underlying `handpose` model and may or may not change in the future.
 - The `handpose` model has issues detecting a single stretched out finger (for example index finger). It will occasionally not detect a finger going from "curled" to "not curled" or vice-versa.

## Credits

The hand gesture recognition module is based on the amazing work by [andypotato](https://github.com/andypotato/fingerpose).
