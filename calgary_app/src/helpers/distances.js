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

export function runDistance(v1, v2){
    let interpolator = interpolateNumber(v1, v2);
    let intervalDistances = [];
    for(let i = 0; i < 1000; i++){
        intervalDistances.push(interpolator(i/1000))
    }
    return intervalDistances;
}
