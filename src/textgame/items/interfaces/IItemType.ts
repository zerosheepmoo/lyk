/*****************************************
| IItemType.ts                            
| 2020. 06. 09. created by zerosheepmoo  |
******************************************/

/**
 * 입력을 위한 아이템 종류 인터페이스
 * 
 * @example
 * ```js
 * // unique 할 때
 * {
 *      cousume: true,
 *      isUnique: true
 * }
 * 
 * // single
 * {
 *      special: true
 * }
 * 
 * // multi
 * {
 *      equip: true,
 *      story: true,
 * }
 * ```
 */
export interface IItemType {
    [itemType: string]: boolean;
}