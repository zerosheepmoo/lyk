/*****************************************
| index.ts                               |
| 2020. 06. 06. created by zerosheepmoo  |
******************************************/

import { Chang } from "./screen/Chang";
import { TextGame } from "./textgame/Game";

/**
 * 메인 클래스
 */
export class LYK {
    /**
     * 안녕!
     */
    static sayHi(): string {
        return 'Hello! This is LKY!'
    }
    /**
     * 창을 만든다.
     * 
     * @param canvas - 캔버스 엘리먼트 혹은 id
     */
    static createChang(canvas: string | HTMLCanvasElement) {
        return new Chang(canvas);
    }

    static createTextGame() {
        return new TextGame();
    }
}