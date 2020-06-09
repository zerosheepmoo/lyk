/*****************************************
| Preset.ts                            
| 2020. 06. 08. created by zerosheepmoo  |
******************************************/

import { IItemSet } from "./items/interfaces/IItemSet";

export const FantasyItems: IItemSet = {
    1: {
        name: '총', 
        type: {equip: true}
    },
    2: {
        name: '빵',
        type: {consume: true}
    },
    3: {
        name: '지팡이', 
        type: {equip: true}
    },
    4: {
        name: '검', 
        type: {equip: true}
    },
    5: {
        name: '지팡이', 
        type: {equip: true}
    },
    6: 
        {name: '체력 포션', 
        type: {consume: true}
    },
    7: {
        name: '마나 포션', 
        type: {consume: true}
    },
    8: {
        name: '방패',
        type: {equip: true}
    },
    9: {
        name: '단검',
        type: {equip: true}
    },
    10: {
        name: '보석',
        type: {special: true}
    },
    11: {
        name: '열쇠',
        type: {story: true}
    },
    12: {
        name: '고양이귀',
        type: {special: true}
    }
}

export const DefaultItemMap = {
    /**
     * 소모용 아이템인지의 여부
     */
    consume: false,

    /**
     * 장비용 아이템인지의 여부
     */
    equip: false,

    /**
     * 특별한 용도의 아이템인지의 여부
     */
    special: false,

    /**
     * 스토리 용 아이템인지의 여부
     */
    story: false
}