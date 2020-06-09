/*****************************************
| index.ts                               |
| 2020. 06. 06. created by zerosheepmoo  |
******************************************/

/**
 * 캔버스 화면 클래스
 */
export class Chang {

    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;
    
    constructor(canvas: string | HTMLCanvasElement) {
        this._setElement(canvas);
    }

    /////////////////////////////////////////////////////////
    // property
    /////////////////////////////////////////////////////////

    /**
     * 캔버스 컨텍스트
     */
    get context(): CanvasRenderingContext2D {
        return this._context;
    }

    /////////////////////////////////////////////////////////
    // innerMethod
    /////////////////////////////////////////////////////////

    /**
     * Chang 에 캔버스 엘리먼트를 설정한다.
     * 
     * @param canvas - 캔바스 오브젝트 또는 문자열
     */
    private _setElement(canvas: string | HTMLCanvasElement) {
        // get Element
        if (typeof canvas === 'string') {
            const cvs = document.getElementById(canvas);
            if(!cvs) {
                throw new Error('There is no such canvas');
            }   
            this._canvas = cvs as HTMLCanvasElement;
        }
        else if(!canvas){
            throw new Error('No parameter!');
        }
        else {
            this._canvas = canvas;
        }
        let ctx = this._canvas.getContext('2d');

        if (ctx) {
            this._context = ctx;
        }
        else {
            // TODO canvas 지원안함 코드 넣기
            throw new Error('canvas-unsupported!');
        }
    }
}