import { geoDistance } from 'd3-geo';
import { interpolateNumber } from 'd3-interpolate';

export function calculatePathDistanceMiles(arr) {
    const earthRadius = 3959;
    let distances = [];
    for(let i = 0; i < arr.length - 1; i++){
        distances.push(geoDistance(arr[i], arr[i + 1]))
    }
   
    return distances.reduce((result, i) => result + i, 0) * earthRadius;
}
