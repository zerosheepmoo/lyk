/*****************************************
| IItem.ts                            
| 2020. 06. 08. created by zerosheepmoo  |
******************************************/

import { IItemType } from "./IItemType";

/**
 * 등록을 위한 아이템 인터페이스
 */
export interface IItem {

    /**
     * 아이템 이름
     */
    name: string;

    /**
     * 아이템 종류
     */
    type: IItemType;

    /**
     * 소유 가능 아이템 최대 갯수
     */
    maxCount?: number;

    /**
     * 소유 가능 아이템 최소 갯수
     */
    minCount?: number;

    /**
     * 고정 개수를 가질지 여부 (개수를 안변하게 할지 여부)
     */
    isFixedCount?: boolean;

    /**
     * 시작 아이템 갯수
     */
    startCount?: number;
}