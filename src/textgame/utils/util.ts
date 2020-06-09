/*****************************************
| util.ts                            
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
function clone(obj: any) {
    if (null == obj || "object" != typeof obj) return obj;
    let copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) {
            if(typeof obj[attr] === 'object') {
                copy[attr] = clone(obj[attr]);
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