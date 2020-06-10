/*****************************************
| StoryBoard.ts                            
| 2020. 06. 09. created by zerosheepmoo  |
******************************************/

import { Story } from "./Story";
import { Choice } from "./Choice";
import { IStory } from "./interfaces/IStory";
import { IChoice } from "./interfaces/IChoice";
import { Flow } from "./Flow";
import { clone } from "../utils/util";

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

    constructor(stories: IStory[], choices: IChoice[]) {
        this._init();
        this._parse(stories, choices);
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
     * 스토리를 스토리 데이터 셋에 추가한다.
     * 
     * @param story - 추가할 스토리
     */
    addStory(story: IStory) {
        const sty = this._createStory(story);
        this._stories[sty.name] = sty;
    }

    /**
     * 스토리를 스토리 데이터 셋에서 제거한다.
     * 
     * @param story - 제거할 스토리명
     */
    removeStory(story: string) {
        delete this._stories[story]
    }

    /**
     * 현재 플로우를 앞으로의 시나리오에서 제거한다.
     */
    endFlow() {
        this.now.close = true;
        delete this._scenario[this._nowFlow];
    }

    /**
     * 해당 플로우를 시나리오에 다시 넣는다.
     * @param name - 플로우 명
     */
    reopenFlow(name: string) {
        const sce = this._scenario;
        if (!sce[name]) {
            const flow = this._flows[name];
            flow.open = true;
            sce[name] = flow;
        }
    }

    applyFlows() {
        this._scenario = clone(this._flows);
    }

    private _init() {
        const defaultFlow = new Flow(this._introFlow);
        const defaultStory = new Story(this._introFlow);
        defaultStory.text = `Please, set main flow`;
        defaultFlow.story = defaultStory;
        this._flows[this._introFlow] = defaultFlow;
        this.applyFlows();
    }

    private _parse(stories: IStory[], choices: IChoice[]) {
        for (let i = 0, len = stories.length; i < len; i++) {
            const sty = this._createStory(stories[i]);
            this._stories[sty.name] = sty;
        }

        for (let i = 0, len = choices.length; i < len; i++) {
            const cho = this._createChoice(choices[i]);
            this._choices[cho.name] = cho;
        }
    }

    private _createStory(story: IStory) {
        const sty = new Story(story.name);
        sty.text = story.text;
        return sty;
    }

    private _createChoice(choice: IChoice) {
        const cho = new Choice(choice.name);
        cho.text = choice.text;
        return cho;
    }
}