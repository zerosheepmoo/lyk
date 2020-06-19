/*****************************************
| Controller.ts                            
| 2020. 06. 09. created by zerosheepmoo  |
******************************************/

import { ItemManager } from "../items/ItemManager";
import { MainView } from "../dom/MainView";
import { StatusMananger } from "../stats/StatusManager";
import { InnerExp } from "../utils/Parser";
import { SectionType } from "../Type";
import { DataManager } from "../data/DataManager";
import { DMNotExistError } from "../utils/Errors";
import { StoryBoard } from "../storyboard/StoryBoard";

/**
 * 컨트롤러 클래스
 */
export class Controller {
    private _dataManager: DataManager | null;
    private _itemManager: ItemManager;
    private _statusManager: StatusMananger;
    private _storyBoard: StoryBoard;

    private _gameView: MainView;
    private _templates = {
        item: `{{name}}x{{count}}`,
    }

    constructor(gameView: MainView) {
        this._itemManager = new ItemManager();
        this._statusManager = new StatusMananger();
        this._storyBoard = new StoryBoard();
        this._gameView = gameView;
    }

    /**
     * 화면에 표시되는 텍스트를 표현하는 표현식
     * 
     * @remarks
     * 각각 다음과 같은 특별 표현을 사용할 수 있다.
     * 
     * [item]
     * {{code}} 아이템 코드
     * {{name}} 아이템 이름
     * {{count}} 아이템 갯수
     */
    get template() {
        return this._templates;
    }

    // ANCHOR items

    /**
     * 아이템 갯수를 더하거나 빼거나 특정 갯수만큼 얻게한다.
     * 
     * @param nameOrCode - 해당 아이템의 이름 또는 코드
     * @param count - 더하거나 뺄 아이템 갯수, 음수 입력시 빠짐.
     * @param rendering - 렌더링 여부, 기본값 `true`
     */
    addItemCount(nameOrCode: string | number, count: number, rendering: boolean = true) {
        if (this._dataManager) {
            // data
            let code;
            code = typeof nameOrCode === 'string' ? this._dataManager.getItemCode(nameOrCode) : nameOrCode;
            let prevNum = this._itemManager.getItem(code).count;
            let num = this._itemManager.addItemNumber(code, count);
            let name = this._dataManager.getItemName(code);

            // view
            if (prevNum !== num && rendering) {
                this._setItemInnerHTML(name, code, num);
            }
        }
        else {
            throw DMNotExistError;
        }
    }

    /**
     * 아이템 갯수를 특정 갯수만큼으로 설정한다.
     * 
     * @param nameOrCode - 해당 아이템의 이름 또는 코드
     * @param count - 설정할 갯수
     */
    setItemCount(nameOrCode: string | number, count: number) {
        if (this._dataManager) {
            // data
            let code;
            code = typeof nameOrCode === 'string' ? this._dataManager.getItemCode(nameOrCode) : nameOrCode;
            let prevNum = this._itemManager.getItem(code).count;
            let num = this._itemManager.setItemNumber(code, count);
            let name = this._dataManager.getItemName(code);
            // view
            if (prevNum !== num) {
                this._setItemInnerHTML(name, code, num);
            }
        }
        else {
            throw DMNotExistError;
        }
    }

    /////////// ANCHOR model /////////////

    /**
     * 직접 아이템 모델을 가져온다.
     * 
     * @param code - 코드
     */
    getItemModel(code: number) {
        return this._itemManager.getItem(code);
    }

    /**
     * 데이터에 맞추어 아이템 모델을 다시 빌드한다.
     */
    rebuildItemModel() {
        this._itemManager.initItems();
    }

    // ANCHOR View
    /**
     * 아이템 목록을 강제로 렌더링한다.
     * 
     */
    renderItemView() {
        if (!this._dataManager) {
            throw DMNotExistError;
        }
        // view에서 아이템 목록 초기화
        this._gameView.itemTab.removeAllChilds();
        // 데이터에서 읽어온 것으로 set
        let itemList;
        if (this._dataManager.multipleItemSetMode) {
            itemList = this._itemManager.itemMultiList;
            for (let id in itemList) {
                const set = itemList[id];
                for (let code in set) {
                    const name = itemList[id][code].name;
                    const count = itemList[id][code].count;
                    if (count > 0) {
                        this._setItemInnerHTML(name, Number(code), count);
                    }
                }
            }
        }
        else {
            itemList = this._itemManager.itemSingleList;
            for (let code in itemList) {
                const name = itemList[code].name;
                const count = itemList[code].count;
                if (count > 0) {
                    this._setItemInnerHTML(name, Number(code), count);
                }
            }
        }
    }

    renderStoryView() {
        if (this._dataManager) {
            // view에서 스토리 섹션 초기화
            const storyTab = this._gameView.storyTab;
            storyTab.removeAllChilds();
            this._setStoryInnerHTML();
        }
        else {
            throw DMNotExistError;
        }
    }


    /////////////// innerMethod ///////////////

    /**
     * item의 innerhtml 을 설정한다.
     * 
     * @param name - 이름
     * @param code - 코드
     * @param count - 갯수
     */
    private _setItemInnerHTML(name: string, code: number, count: number) {
        let itemTab = this._gameView.itemTab;
        let innerExp: InnerExp = {
            name: name,
            code: String(code),
            itemCount: String(count)
        }
        let template = this._templates.item

        // 없으면 추가 있으면 innerHTML 변경
        let item = itemTab.findChild(code);
        if (item && typeof item !== 'number') {
            if (count === 0) {
                itemTab.removeChild(code);
            }
            else {
                item.setInnerHTML(template, innerExp);
            }
        }
        else {
            this._gameView.itemTab.addChild(SectionType.ITEM, template, code, innerExp);
        }
    }

    private _setStoryInnerHTML(className?: string) {
        const storyTab = this._gameView.storyTab;
        const sb = this._storyBoard;
        const nowFlo = sb.now;
        const storySection = storyTab.findChild();
        if (storySection) {
            storySection.setInnerHTML(nowFlo.story.text);
        }
        else {
            storyTab.addChild(SectionType.STORY, nowFlo.story.text, undefined, undefined, className);
        }
    }

    /**
     * @internal
     * @param dm - 데이터 매니저
     */
    private _linkDataManager(dm: DataManager) {
        this._dataManager = dm;
        this._storyBoard.linkDataManager(dm);
        this._itemManager.linkDataManager(dm);
        this.renderItemView();
        this.renderStoryView();
    }
    /**
     * @internal
     */
    private _unlinkDataManager() {
        const dm = this._dataManager
        if (dm) {
            this._itemManager.unlinkDataManager();
            this._storyBoard.unlinkDataManager();
            this._dataManager = null;
        }
    }
}