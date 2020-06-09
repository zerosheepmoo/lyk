/*****************************************
| ItemTypeMap.ts                            
| 2020. 06. 09. created by zerosheepmoo  |
******************************************/

/**
 * 아이템 종류 맵
 * 
 * @remarks
 * 맵 설정을 할 때는 모두 `false` 로 지정한다.
 * 
 * {@link ItemTypes.content} 의 반환 형태와 같다.
 * 
 * @example
 * ```js
 * // 설정 시
 * {
 *      consume: false,
 *      equip: false,
 *      special: false,
 *      story: false,
 *      another: false
 * }
 * ```
 */
export interface ItemTypeMap {

    /**
     * 아이템 타입과 해당 타입의 활성화 여부
     */
    [itemType: string]: boolean;
}
