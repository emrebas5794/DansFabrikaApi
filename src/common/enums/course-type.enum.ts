export enum ECourseTypes {
    WORKSHOP = 0,
    KIDS = 1,
    ACADEMY = 2,
    EVENT = 3
}

export enum ECourseTypeNames {
    WORKSHOP = 'Workshop',
    KIDS = 'Kids',
    ACADEMY = 'Akademi',
    EVENT = 'Event'
}


export function getCourseTypeName(type: number): string {
    return ECourseTypeNames[Object.keys(ECourseTypeNames)[type]];
}