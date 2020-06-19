/*****************************************
| ItemManager.ts                            
| 2020. 06. 09. created by zerosheepmoo  |
******************************************/

import { Item } from "./Item";
import { IItem } from "./interfaces/IItem";
import { IItemSet } from "./interfaces/IItemSet";
import { ItemTypeMap } from "./interfaces/ItemTypeMap";
import { clone } from "../utils/Util";
import { IItemOpts } from "./interfaces/IItemOpts";
import { DataManager } from "../data/DataManager";

/**
 * 아이템 매니저 클래스
 */
export class ItemManager {
    private _dm: DataManager | null;
    private _list: {[code: number]: Item};
    private _multipleList: {[id: string]: {[code: number]: Item}}

    constructor() {
        this._list = {};
        this._multipleList = {};
    }

    /**
     * 데이터 매니저를 연결한다.
     * @param dm - 데이터 매니저
     */
    linkDataManager(dm: DataManager) {
        this._dm = dm;
        dm.isItemLinked = true;
        this.initItems();
    }

    /**
     * 데이터 매니저의 연결을 끊는다.
     */
    unlinkDataManager() {
        if (this._dm) {
            this._dm.isItemLinked = false;
            this._dm = null;
            this._clearItems();
        }
    }

    /**
     * 아이템 모델들의 리스트
     */
    get itemSingleList() {
        return this._list;
    }

    /**
     * 아이템 모델들의 리스트 (다중 아이템셋 동시 사용 가능 모드 때 만 사용)
     */
    get itemMultiList() {
        return this._multipleList;
    }

    /**
     * 아이템들 갯수 초기화 및 셋에 맞춘 모델 생성
     */
    initItems() {
        if (this._dm) {
            this._clearItems();
            const dm = this._dm;
            if(dm.multipleItemSetMode) {
                const wholeSet = dm.itemSetCollection;
                for (let id in wholeSet) {
                    const set = wholeSet[id];
                    for (let code in set) {
                        const item = this._createItem(Number(code), set[code])
                        this._multipleList[id][code] = item;
                    }
                }
            }
            else {
                if(dm) {
                    const curSet = dm.getCurrentItemSet();
                    for (let code in curSet) {
                        const item = this._createItem(Number(code), curSet[code]);
                        this._list[code] = item;
                    }
                }
            }
        }
    }

    /**
     * 아이템 가져오기
     * @param code - 코드
     */
    getItem(code: number) {
        return this._list[code];
    }

    /**
     * 다중 아이템 셋 모드일 겨우 사용가능한 아이템 가져오기
     * 
     * @param id - 아이템 셋 아이디
     * @param code - 코드
     */
    getItemFromSet(id: string, code: number) {
        return this._multipleList[id][code];
    }

    /**
     * 아이템 갯수를 더하거나 뺀다
     * 
     * @param nameOrCode - 이름 또는 코드
     * @param count - 추가할 아이템 갯수, 음수를 입력하면 제거
     * @param id - 아이템 셋의 아이디, 다중 아이템 셋 모드일 경우만 사용가능, 입력하지 않으면 'default'
     */
    addItemNumber(code: number, count: number, id: string = 'default') {
        if (this._dm?.multipleItemSetMode && id) {
            if (this._multipleList[id][code]) {
                this._multipleList[id][code].count += count;
                return this._multipleList[id][code].count;
            }
        }
        else {
            if(this._list[code]) {
                this._list[code].count += count;
                return this._list[code].count;
            }    
        }
        throw Error('There is no such item model!');
    }

    /**
     * 아이템 갯수를 해당 갯수로 설정한다.
     * 
     * @param nameOrCode - 이름 또는 코드
     * @param count - 설정할 갯수
     * @param id - 아이템 셋의 아이디, 다중 아이템 셋 모드일 경우만 사용가능, 입력하지 않으면 'default'
     */
    setItemNumber(code: number, count: number, id: string = 'default') {
        if (this._dm?.multipleItemSetMode && id) {
            if (this._multipleList[id][code]) {
                this._multipleList[id][code].count = count;
                return this._multipleList[id][code].count;
            }
        }
        else { 
            if(this._list[code]) {
                this._list[code].count = count;
                return this._list[code].count;
            }
        }
        throw Error('There is no such item!');
    }

    ////////// ANCHOR: inner Method //////////

    /**
     * 아이템을 생성한다.
     * 
     * @param code - 아이템의 코드
     * @param item - 설정용 아이템 인터페이스
     */
    private _createItem(code: number, item: IItem) {
        if (this._dm) {
            const map = this._dm.itemTypeMap;
            const opts: IItemOpts = {
                max: item.maxCount,
                min: item.minCount,
                isFixed: item.isFixedCount,
                start: item.startCount
            }
            return new Item(map, item.type, code, item.name, opts);
        }
        else {
            throw new Error('You should link DataManager to ItemManager first');
        }
    }

    ///////////////// inner Method ///////////////////
    /**
     * 아이템 모델들 클리어
     */
    private _clearItems() {
        const list = this._list
        for (let code in list) {
            delete list[code];
        }

        const multiList = this._multipleList
        for (let id in multiList) {
            delete this._multipleList[id];
        }
    }
}
