/*****************************************
| IStatus.ts                            
| 2020. 06. 09. created by zerosheepmoo  |
******************************************/

/**
 * 입력용 스테이터스 인터페이스
 */
export interface IStatus {
    /**
     * 레벨
     */
    level?: number;
    
    /**
     * 최대레벨
     */
    maxLevel?: number;
    
    /**
     * 최소레벨
     */
    minLevel?: number;

    /**
     * 고정레벨 여부
     */
    fixed?: boolean;
}