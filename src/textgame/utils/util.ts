/*****************************************
| Util.ts                            
| 2020. 06. 08. created by zerosheepmoo  |
******************************************/

/**
 * 유연한 오브젝트
 */
interface FlexibleObj {
    [key: string]: any
}

/**
 * 인스턴스 클론 (shallow copy)
 * 
 * @param obj - 오브젝트
 */
export function clone(obj: any, hardcopy = false) {
    if (null == obj || "object" != typeof obj) return obj;
    let copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) {
            if(hardcopy) {
                if(typeof obj[attr] === 'object') {
                    copy[attr] = clone(obj[attr]);
                }
                else {
                    copy[attr] = obj[attr];
                }
            }
            else {
                copy[attr] = obj[attr];
            }
        }
    }
    return copy;
}

/**
 * 인스턴스 아닌 오브젝트 카피
 * 
 * @param obj - 오브젝트
 */
export function copyObj(obj: FlexibleObj) {
    let newObj: FlexibleObj = {};
    for (let prop in obj) {
        if(typeof prop === 'object') {
            newObj[prop] = copyObj(prop);
        }
        newObj[prop] = obj[prop]
    }
    return newObj
}

/**
 * 무작위 넘버 혹은 대상을 반환하는 함수
 * 
 * @param target - 대상이 되는 array 또는 object
 */
export function randomOut(target: any) {
    let num;
    let time = Date.now();
    if (target.length) {
        num = target.length;
        let idx = time % num;
        return target[idx];
    }
    else if (typeof target === 'object') {
        let keys = Object.keys(target);
        num = keys.length;
        let idx = time % num;
        return target[keys[idx]];
    }
    return -1;
}