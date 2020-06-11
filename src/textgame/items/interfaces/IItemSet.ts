/*****************************************
| IItemSet.ts                            
| 2020. 06. 09. created by zerosheepmoo  |
******************************************/

import { IItem } from "./IItem";


/**
 * {@link ItemSet} 에서 등록하는 목록 정보의 형태
 * 
 * @example
 * ```js
 * {
 *      1: {
 *          name: '총', 
 *          type: {equip: true}
 *      },
 *      2: {
 *          name: '빵',
 *          type: {consume: true}
 *      }
 * }
 * ```
 */
export interface IItemSet {
    [code: number]: IItem;
}