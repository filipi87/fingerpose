import { Finger, FingerCurl, FingerDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


// describe thumbs up gesture 👍
const thumbsUpDescription = new GestureDescription('thumbs_up');

// thumb:
// - curl: none (must)
// - direction vertical up (best)
// - direction diagonal up left / right (acceptable)
thumbsUpDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl);
thumbsUpDescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
thumbsUpDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.9);
thumbsUpDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.9);

// all other fingers:
// - curled (best)
// - half curled (acceptable)
// - pointing down is NOT acceptable
for(let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  thumbsUpDescription.addCurl(finger, FingerCurl.FullCurl, 1.0);
  thumbsUpDescription.addCurl(finger, FingerCurl.HalfCurl, 0.9);
  thumbsUpDescription.addDirection(finger, FingerDirection.HorizontalLeft, 1.0);
  thumbsUpDescription.addDirection(finger, FingerDirection.HorizontalRight, 1.0);
  thumbsUpDescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.9);
  thumbsUpDescription.addDirection(finger, FingerDirection.DiagonalUpRight, 0.9);
}

export default thumbsUpDescription;
