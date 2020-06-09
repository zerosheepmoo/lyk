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
}