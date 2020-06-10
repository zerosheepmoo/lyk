/*****************************************
| Type.ts                            
| 2020. 06. 10. created by zerosheepmoo  |
******************************************/

/**
 * {@link Section."type"} 의 종류
 */
export enum SectionType {
    ITEM = 'item',
    ITEM_CON = 'itemContainer',
    STAT  = 'status',
    STAT_CON = 'statusContainer',
    CHOICES = 'choiceContainer',
    CHOICE = 'choice',
    STORY = 'story',
    MAIN_CON = 'mainContainer',
    NONE = 'none'
}

export enum SectionClassName {
    ITEM = 'lyk-item',
    ITEM_CON = 'lyk-item-container'
}