import { Finger, FingerCurl, FingerDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';
import thumbsDownDescription from "./ThumbsDown";


// describe thumbs up gesture 👍
const raisedFistHandDescription = new GestureDescription('raised_fist_hand');

raisedFistHandDescription.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
raisedFistHandDescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);

// all fingers
for(let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  raisedFistHandDescription.addCurl(finger, FingerCurl.FullCurl, 1.0);
  raisedFistHandDescription.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  raisedFistHandDescription.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
  raisedFistHandDescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
}
// index finger some times is identified as half curl
raisedFistHandDescription.addCurl(Finger.Index, FingerCurl.HalfCurl, 0.9);

export default raisedFistHandDescription;
