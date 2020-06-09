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
    private _now: Story;
    private _after: Choice[];
    private _before: Choice[];

    /**
     * 이 흐름에 해당하는 스토리
     */
    get now() {
        return this._now;
    }
    set now(value: Story) {
        if (this._now !== value) {
            this._now = value;
        }
    }

    /**
     * 이 흐름의 스토리와 연결된 선택지들. 다음으로 넘어가기 위한 것이다.
     */
    get after() {
        return this._after;
    }
    set after(value: Choice[]) {
        if (this._after !== value) {
            this._after = value;
        }
    }

    /**
     * 이 흐름으로 들어오기 위한 선택지들
     */
    get before() {
        return this._before;
    }
    set before(value: Choice[]) {
        if (this._before !== value) {
            this._before = value;
        }
    }
}