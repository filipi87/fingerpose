import { Finger, FingerCurl, FingerDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


// describe thumbs up gesture 👍
const whiteUpPointingDescription = new GestureDescription('white_up_pointing');

whiteUpPointingDescription.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);

whiteUpPointingDescription.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
whiteUpPointingDescription.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);

// all fingers
for(let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
  whiteUpPointingDescription.addCurl(finger, FingerCurl.FullCurl, 1.0);
  whiteUpPointingDescription.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  whiteUpPointingDescription.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  whiteUpPointingDescription.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
}

export default whiteUpPointingDescription;
