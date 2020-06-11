/*****************************************
| IStory.ts                            
| 2020. 06. 10. created by zerosheepmoo  |
******************************************/

/**
 * 입력용 스토리 인터페이스
 * 
 * @example
 * ```js
 * 
 * {
 *      name: 'story1',
 *      text: `엔터가 적용되려면.
 * 백틱을 이용하여
 * 이와 같이 써야합니다.`
 * }
 * 
 * ```
 */
export interface IStory {
    /**
     * 스토리 이름
     */
    name: string;
    
    /**
     * 스토리 내용
     */
    text: string;
}