/*****************************************
| MainView.ts                            
| 2020. 06. 09. created by zerosheepmoo  |
******************************************/

import { Section } from './Section';
import { SectionType, SectionClassName } from '../Type';
import { ItemContainer } from './ItemContainer';
import { ContainerSection } from './ContainerSection'
import { UnexpectedError } from '../utils/Errors';


/**
 * 메인 화면 dom 클래스
 * 
 * @remarks
 * 모든 코드를 지정할 때 `-1 금지하기
 */
export class MainView extends Section {
    
    private _statusTab: Section;
    private _storyTab: Section;
    private _choiceTab: Section;
    private _itemTab: ItemContainer;

    private _auto: boolean;

    constructor(eleID: string, auto: boolean, styleName?: string) {
        super(undefined, SectionType.MAIN_CON, styleName, undefined, eleID);
        this._setStyle(styleName);
        this._auto = auto;
        if (auto) {
            // this._statusTab = this.addChild(SectionType.STAT_CON, -1);
            this._itemTab = this.addChild(SectionType.ITEM_CON, -1) as ItemContainer;
        }
    }

    /**
     * 아이템 탭
     */
    get itemTab() {
        return this._itemTab;
    }

    /**
     * 스테이터스 탭
     */
    get statusTab() {
        return this._statusTab
    }

    render(): void {
        this._statusTab.render();
        this._itemTab.render();
    }

    /**
     * 스테이터스 탭을 생성한다.
     * 
     * @remarks
     * 수동 생성 모드일 때 사용 가능
     */
    createStatusTab() {
        if (!this._auto) {
            this._statusTab = this.addChild(SectionType.STAT_CON, -1);
        }
    }

    /**
     * 아이템 탭을 생성한다.
     * 
     * @remarks
     * 수동 생성 모드일 때 사용 가능
     */
    createItemTab() {
        if (!this._auto) {
            this._itemTab = this.addChild(SectionType.ITEM_CON, -1) as ItemContainer;
        }
    }

    /**
     * 자식 섹션을 추가한다.
     * 
     * @param type - 섹션 타입
     * @param code - 컨테이너 코드 (-1)
     * @param className - 커스텀 스타일 클래스 명
     */
    protected addChild(type: SectionType, code: number, className?: string): ContainerSection {
        let child: ContainerSection;
        if (type === SectionType.ITEM_CON) {
            child = new ItemContainer(this, type, className)
        }
        else {
            throw UnexpectedError;
        }
        this._childs.push(child);
        this.dom.appendChild(child.dom);

        return child;
    }
    protected _setStyle(className?: string): void {
        if (className) {
            this.dom.className = className;
        }
        else {
            this.dom.className = SectionClassName.MAIN_CON;
        }
    }

    //// unused ////

    protected _createDom() {
        return null;
    }
}