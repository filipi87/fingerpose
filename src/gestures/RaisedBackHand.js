import { Finger, FingerCurl, FingerDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


// describe thumbs up gesture 👍
const raisedBackHandDescription = new GestureDescription('raised_back_hand');

// all fingers
for(let finger of Finger.all) {
  raisedBackHandDescription.addCurl(finger, FingerCurl.NoCurl, 1.0);
}

export default raisedBackHandDescription;
