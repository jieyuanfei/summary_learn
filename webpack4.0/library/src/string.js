import _ from 'lodash';
export function getString(a, b) {
    return a + b + "";
}

export function join(a,b){
    return _.join([a,b], "_");
}