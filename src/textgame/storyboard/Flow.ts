/*****************************************
| Flow.ts                            
| 2020. 06. 09. created by zerosheepmoo  |
******************************************/

import { Story } from "./Story";
import { Choice } from "./Choice";

/**
 * 흐름에 관한 클래스
 */
export class Flow {
    private _story: Story;
    private _choices: Choice[];
    private _name: string;

    private _open: boolean = true;

    constructor(name: string) {
        this._name = name;
    }

    /**
     * 이 흐름에 해당하는 스토리
     */
    get story() {
        return this._story;
    }
    set story(value: Story) {
        if (this._story !== value) {
            this._story = value;
        }
    }

    /**
     * 이 흐름의 스토리와 연결된 선택지들. 다음으로 넘어가기 위한 것이다.
     */
    get choices() {
        return this._choices;
    }
    set choices(value: Choice[]) {
        if (this._choices !== value) {
            this._choices = value;
        }
    }

    /**
     * 해당 흐름의 이름
     */
    get name() {
        return this._name;
    }
    set name(value: string) {
        if (this._name !== value) {
            this._name = value;
        }
    }


    /**
     * 해금 된 스토리 여부
     * 
     * @remarks
     * `true` 여야 StoryBoard 에서 읽어온다.
     */
    get open(): boolean {
        return this._open;
    }
    set open(value: boolean) {
        if (this._open !== value) {
            this._open = value;
        }
    }

    /**
     * 스토리 마침 여부
     * 
     * @remarks
     * `true` 면 다시 StoryBoard에서 읽어오지 않는다.
     */
    get close() {
        return !this._open
    }
    set close(value: boolean) {
        if (this._open === value) {
            this._open = !value;
        }
    }
}