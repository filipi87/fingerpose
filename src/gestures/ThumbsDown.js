import { Finger, FingerCurl, FingerDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


// describe thumbs up gesture 👍
const thumbsDownDescription = new GestureDescription('thumbs_down');

// thumb:
// - curl: none (must)
// - direction vertical up (best)
// - direction diagonal up left / right (acceptable)
thumbsDownDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
thumbsDownDescription.addDirection(Finger.Thumb, FingerDirection.VerticalDown, 1.0);
thumbsDownDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalDownLeft, 1.0);
thumbsDownDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalDownRight, 1.0);
thumbsDownDescription.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.9);
thumbsDownDescription.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.9);

// all other fingers:
// - curled (best)
// - half curled (acceptable)
// - pointing down is NOT acceptable
for(let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  thumbsDownDescription.addCurl(finger, FingerCurl.FullCurl, 1.0);
  thumbsDownDescription.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}

export default thumbsDownDescription;
