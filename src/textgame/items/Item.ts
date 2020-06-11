/*****************************************
| Item.ts                            
| 2020. 06. 08. created by zerosheepmoo  |
******************************************/

import { IItemType } from './interfaces/IItemType';
import { ItemTypes } from "./ItemType";
import { ItemTypeMap } from './interfaces/ItemTypeMap';


/**
 * 아이템 클래스
 */
export class Item {
    private _code: number;
    private _types: ItemTypes;
    private _name: string;

    private _count: number;
    private _maxCount: number = 3;
    private _minCount: number = 0;

    constructor(map: ItemTypeMap | string, type: IItemType, code: number, name: string, count?: number) {
        this._types = new ItemTypes(map);
        this._parse(type);
        this._code = code;
        this._name = name;
        this._count = count || 0;
    }

    /**
     * 아이템 코드
     */
    get code() {
        return this._code;
    }
    set code(value: number) {
        if (this._code !== value) {
            this._code = value;
        }
    }

    /**
     * 아이템 종류
     */
    get type() {
        return this._types;
    }
    set type(value: ItemTypes) {
        if (this._types !== value) {
            this._types = value;
        }
    }

    /**
     * 아이템 이름
     */
    get name(): string {
        return this._name;
    }
    set name(value: string) {
        if (this._name !== value) {
            this._name = value;
        }
    }

    /**
     * 아이템 갯수
     */
    get count(): number {
        return this._count;
    }
    set count(value: number) {
        if (this._count !== value) {
            if (value > this._maxCount) {
                this._count = this._maxCount;
            }
            else if (value < this.minCount) {
                this._count = this._minCount;
            }
            else {
                this._count = value;
            }     
        }
    }
    
    /**
     * 최대 아이템 갯수
     */
    get minCount(): number {
        return this._minCount;
    }
    set minCount(value: number) {
        if (this._minCount !== value) {
            this._minCount = value;
        }
    }

    /**
     * 최소 아이템 갯수
     */
    get maxCount(): number {
        return this._maxCount;
    }
    set maxCount(value: number) {
        if (this._maxCount !== value) {
            this._maxCount = value;
        }
    }

    ////////// inner Method //////////
    private _parse(value: IItemType) {
        const itemTypes = this._types;
        let unique;
        for (let itemType in value) {
            if (itemType === 'isUnique') {
                unique = true;
            }
            else {
                itemTypes.setItemType(itemType, value[itemType]);
            }
        }
        if (unique) {
            itemTypes.isUnique = true;
        }
    }
}