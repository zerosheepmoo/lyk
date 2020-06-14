/*****************************************
| Item.ts                            
| 2020. 06. 08. created by zerosheepmoo  |
******************************************/

import { IItemType } from './interfaces/IItemType';
import { ItemTypes } from "./ItemType";
import { ItemTypeMap } from './interfaces/ItemTypeMap';
import { IItemOpts } from './interfaces/IItemOpts';


/**
 * 아이템 모델 클래스
 */
export class Item {
    private _code: number;
    private _types: ItemTypes;
    private _name: string;

    private _count: number;
    private _maxCount: number = 3;
    private _minCount: number = 0;
    private _isFixedCount: boolean = false;

    constructor(map: ItemTypeMap | string, type: IItemType, code: number, name: string, others: any) {
        this._types = new ItemTypes(map);
        this._parseType(type);
        this._code = code;
        this._name = name;
        this._parseOthers(others);
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

    /**
     * 아이템 갯수 고정여부
     */
    get isFixedCount(): boolean {
        return this._isFixedCount;
    }
    set isFixedCount(value: boolean) {
        if (this._isFixedCount !== value) {
            this._isFixedCount = value;
        }
    }

    ////////// inner Method //////////
    private _parseType(value: IItemType) {
        const itemTypes = this._types;
        let unique;
        for (let itemType in value) {
            if (itemType === 'isUnique') {
                unique = true;
                delete value[itemType];
            }
            else {
                itemTypes.setItemType(itemType, value[itemType]);
            }
        }
        if (unique) {
            itemTypes.isUnique = true;
        }
    }

    private _parseOthers(value: IItemOpts) {
        if (value.isFixed !== undefined) {
            this.isFixedCount = value.isFixed;
        }
        
        if(value.max !== undefined) {
            this.maxCount = value.max;
        }

        if(value.min !== undefined) {
            this.minCount = value.min;
        }

        if(value.start !== undefined) {
            this.count = value.start
        }
        else {
            this.count = this._minCount;
        }
    }
}