/*****************************************
| ItemType.ts                            
| 2020. 06. 09. created by zerosheepmoo  |
******************************************/

import { ItemTypeMap } from "./interfaces/ItemTypeMap";
import { copyObj } from "../utils/util";

/**
 * 아이템 종류 결정자 클래스
 */
export class ItemTypes {

    private _isUnique: boolean;
    private _itemTypes: ItemTypeMap;

    constructor(content: ItemTypeMap) {
        this._itemTypes = copyObj(content);
    }

    /**
     * 타입을 하나만 갖는지 여부
     * 
     * @remarks
     * 타입이 multi 거나, 하나도 지정되어있지 않으면 `true` 로 설정할 수 없다.
     * {@link IItemType} 참조.
     */
    get isUnique(): boolean {
        return this._isUnique
    }
    set isUnique(value: boolean) {
        if (this._isUnique !== value) {
            if (this._validateUnique(this._itemTypes)) {
                this._isUnique = value;
            }
        }
    }

    /**
     * 아이템 종류 설정 내용
     */
    get content() {
        return this._itemTypes;
    }
    set content(value: ItemTypeMap) {
        if(value['isUnique']) {
            throw new Error('"isUnique" is cannot be set as the key of itemTypes')
        }
        this._itemTypes = value;
    }

    /////////////////// method ////////////////////

    /**
     * 아이템 종류를 설정한다.
     * 
     * @param typeName - 아이템 타입 이름
     * @param value - 해당 타입 활성화 여부
     */
    setItemType(typeName: string, value: boolean) {
        const tp = this._itemTypes[typeName];
        if (tp !== undefined && tp !== value) {
            // unique 일 때
            if (this._isUnique) {
                if (value === true) {
                    for (let t in this._itemTypes) {
                        this._itemTypes[t] = false;
                    }
                }
                else {
                    throw new Error('Unique ItemTypes cannot be set as non-single type')
                }
            }
            this._itemTypes[typeName] = value;
        }
    }

    /**
     * 해당 itemTypes 가 유니크한지 검증한다.
     * 
     * @param map - 아이템 타입 맵
     */
    private _validateUnique(map: ItemTypeMap) {
        let ban = 0;
        for (let type in map) {
            if (map[type] === true) {
                ban++;
            }
            if (ban > 1) {
                throw new Error('The multiple type cannot be set isUnique as true!');
            }
        }
        if (ban === 0) {
            throw new Error('There is no Type!');
        }
        return true;
    }
}