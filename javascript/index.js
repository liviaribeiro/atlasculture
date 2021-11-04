import { coco } from './adminvision/test.js';



import { loadDynamicBannerText } from './adminvision/components/banner.js';
import _ from 'lodash';

const component = () => {
  const element =  _.join(['Hello', 'lodash'], ' ');
  return element;
}
coco()
console.log(component());
console.log('fkjdhf')
loadDynamicBannerText();
