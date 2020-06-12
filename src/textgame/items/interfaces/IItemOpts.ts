/*****************************************
| IItemOpts.ts                            
| 2020. 06. 11. created by zerosheepmoo  |
******************************************/

/**
 * 아이템에 관한 다른 속성들을 설정하기 위한 인터페이스
 * 
 * @remarks
 * 내부에서만 쓰인다.
 */
export interface IItemOpts {
    max?: number;
    min?: number;
    isFixed?: boolean;
    start?: number;
}