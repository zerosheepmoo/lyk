/*****************************************
| ItemSet.ts                            
| 2020. 06. 09. created by zerosheepmoo  |
******************************************/

import { IItemSet } from "./interfaces/IItemSet";
import { IItemType } from "./interfaces/IItemType";
import { copyObj } from "../utils/Util";

/**
 * 아이템 목록 저장 및 탐색 클래스
 * 
 * @remarks
 * {@link IItemSet} 형식에 맞춰서 목록을 등록한다.
 */
export class ItemSet {
    private _set: IItemSet;

    constructor(preset?: IItemSet) {
        this.registerPreset(preset);
    }

    /**
     * 프리셋 데이터
     */
    get preset() {
        return this._set;
    }

    /**
     * 프리셋을 등록한다.
     * 
     * @param preset - 아이템 프리셋
     */
    registerPreset(preset?: IItemSet) {
        if(preset) {
            this._set = copyObj(preset);
        }
        else {
            this._set = {};
        }
    }

    /**
     * 프리셋에 아이템을 추가 등록한다.
     * 
     * @param items - 아이템 프리셋 형태의 추가할 아이템
     */
    addItems(items: IItemSet) {
        for (let code in items) {
            this._set[code] = items[code];
        }
    }

    /**
     * 프리셋의 아이템을 제거한다.
     * 
     * @param codeOrName - 아이템 코드 혹은 이름
     */
    removeItems(codeOrNames: (number | string) | (number | string)[]) {
        if (Array.isArray(codeOrNames)) {
            for (let i = 0, len = codeOrNames.length; i < len; i++) {
                this._removeItem(codeOrNames[i]);
            }
        }
        else {
            this._removeItem(codeOrNames);
        }
    }
    private _removeItem(cOrN: number | string) {
        let code: number;
        if (typeof cOrN === 'string') {
            code = Number(this.getItemCode(cOrN));
        }
        else {
            code = cOrN;
        }
        delete this._set[code];
    }

    /**
     * 아이템의 이름을 반환한다.
     * 
     * @param code - 아이템 코드
     */
    getItemName(code: number): string {
        return this._set[code].name;
    }

    /**
     * 아이템의 코드를 반환한다.
     * 
     * @param name - 아이템 이름
     */
    getItemCode(name: string): number {
        const preset = this._set
        for (let code in preset) {
            if(preset[code].name === name) {
                return Number(code);
            }
        }
        throw new Error('there is no such item: ' + name);
    }

    /**
     * 아이템의 타입을 반환한다.
     * 
     * @param code - 아이템 코드
     */
    getItemType(code: number): IItemType {
        return this._set[code].type;
    }
}