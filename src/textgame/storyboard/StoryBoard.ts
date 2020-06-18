/*****************************************
| StoryBoard.ts                            
| 2020. 06. 09. created by zerosheepmoo  |
******************************************/

import { Story } from "./Story";
import { Choice } from "./Choice";
import { IStory } from "./interfaces/IStory";
import { IChoice } from "./interfaces/IChoice";
import { Flow } from "./Flow";
import { clone } from "../utils/Util";
import { IStories } from "./interfaces/IStories";
import { IChoices } from "./interfaces/IChoices";
import { DataManager } from "../data/DataManager";
import { DMNotExistErrorCore } from '../utils/Errors'

/**
 * 스토리 보드 클래스
 */
export class StoryBoard {
    private _stories: {[name: string]: Story};
    private _choices: {[name: string]: Choice};
    private _flows: {[name: string]: Flow};
    private _introFlow: string = 'intro';
    private _nowFlow: string = 'intro';
    private _scenario: {[name: string]: Flow};
    private _dm: DataManager | null;

    constructor() {
        this._init();
    }

    /**
     * 맨 처음 등장할 플로우 오브젝트
     */
    get introFlow() {
        return this.findFlow(this._introFlow);
    }

    /**
     * 맨 처음에 등장할 Flow 의 이름
     */
    get introFlowName() {
        return this._introFlow;
    }
    set introFlowName(value: string) {
        if (this._introFlow !== value) {
            this._introFlow = value;
        }
    }

    /**
     * 현재 플로우
     */
    get now() {
        return this.findFlow(this._nowFlow);
    }

    /**
     * 현재 플로우의 이름
     */
    get nowFlow() {
        return this._nowFlow;
    }
    set nowFlow(value: string) {
        if (this._nowFlow !== value) {
            this._nowFlow = value;
        }
    }

    /**
     * Flow 를 생성한다.
     * 
     * @param story - 스토리명
     * @param choices - 다음이야기로 이어질 선택지들
     * @param name - 플로우 명, 미지정 시 story 이름으로 Flow 명이 설정된다.
     */
    createFlow(story: string, choices: string[], name?: string) {
        const sty = this.findStory(story);
        const flow = new Flow(name || story);
        flow.story = sty;
        for (let i = 0, len = choices.length; i < len; i++) {
            const aCho = this.findChoice(choices[i]);
            flow.choices.push(aCho);
        }
        this._flows[flow.name] = flow;
    }

    /**
     * 스토리 찾기
     * 
     * @param name - 스토리 명
     */
    findStory(name: string) {
        const sty = this._stories[name];
        if (sty) {
            return sty;
        }
        else {
            throw new Error('There is no such Story!')
        }
    }

    /**
     * 선택지 찾기
     * 
     * @param name - 선택지 명
     */
    findChoice(name: string) {
        const cho =  this._choices[name];
        if (cho) {
            return cho;
        }
        else {
            throw new Error('There is no such Choice!')
        }
    }

    /**
     * 플로우 찾기
     * 
     * @param flow - 플로우 명
     */
    findFlow(flow: string) {
        const flo =  this._flows[name];
        if (flo) {
            return flo;
        }
        else {
            throw new Error('There is no such Flow!')
        }
    }

    /**
     * 현재 플로우를 앞으로의 시나리오에서 제거한다.
     */
    endFlow(name?: string) {
        if (name) {
            const flo = this.findFlow(name)
            flo.isClosed = true;
            delete this._scenario[flo.name];
        }
        else {
            this.now.isClosed = true;
            delete this._scenario[this._nowFlow];
        }
    }

    /**
     * 해당 플로우를 시나리오에 다시 넣는다.
     * @param name - 플로우 명
     */
    reopenFlow(name: string) {
        const sce = this._scenario;
        if (!sce[name]) {
            const flow = this._flows[name];
            flow.isOpened = true;
            sce[name] = flow;
        }
    }

    /**
     * 현재 설정된 플로우들을 모두 시나리오로 적용
     */
    applyFlows() {
        this._scenario = clone(this._flows);
    }


    /**
     * 데이터 매니저를 연결한다.
     * @param dm - 데이터 매니저
     */
    linkDataManager(dm: DataManager) {
        this._dm = dm;
        dm.isStyLinked = true;
        this._init;
    }

    /**
     * 데이터 매니저의 연결을 끊는다.
     */
    unlinkDataManager(dm: DataManager) {
        if (this._dm) {
            this._dm.isStyLinked = false;
            this._dm = null;
            this._clear();
        }
    }

    ////// inner method //////

    private _init() {
        if (this._dm) {
            const defaultFlow = new Flow(this._introFlow);
            const introSty = this.findStory(this._introFlow);
            if (introSty) {
                defaultFlow.story = introSty;
            }
            else {
                throw new Error('there is no intro story: ' + this._introFlow);
            }
        }
        else {
            throw DMNotExistErrorCore
        }
        
    }

    private _parse(stories: IStories, choices: IChoices) {
        for (let name in stories) {
            const sty = this._createStory(name, stories[name]);
            this._stories[name] = sty;
        }

        for (let name in choices) {
            const cho = this._createChoice(name, choices[name]);
            this._choices[name] = cho;
        }
    }

    private _clear() {
        
    }

    private _createStory(storyName: string, story: IStory) {
        const sty = new Story(storyName);
        sty.text = story.text;
        return sty;
    }

    private _createChoice(choiceName: string, choice: IChoice) {
        const cho = new Choice(choiceName);
        cho.text = choice.text;
        return cho;
    }
}