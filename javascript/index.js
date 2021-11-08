import { initMap } from './adminvision/map/init.js';
import { goToRegion } from './adminvision/map/goToRegion.js'
import {showLayer } from './adminvision/map/layer/showLayer.js';
import { openNav, closeNav } from './adminvision/map/menu.js';
import { callModel } from './adminvision/map/exportCsv.js'

callModel();
initMap();

buildMap();

openNav();
closeNav();


