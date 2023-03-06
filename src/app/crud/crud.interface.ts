export interface Subject {
    id: number;
    name: string;
    workload: number;
    group: string;
    coursesIds: any;
    professorsIds: any;
}

export interface Professors {
    id: number;
    name: string;
    course: any;
    subjects: any;
}

export interface Room {
    id: number;
    name: string;
    block: number;
    isAcessible: boolean;
    hasAirConditioner: boolean;
    hasFan: boolean;
    hasProjector: boolean;
    capacity: number;
    key: any;
    // key": {
    //   "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    // },
    available: boolean;
    note: string;
}

export interface Course {
    id: number;
    name: string;
    shift: number;
    subjects: Subject;
    professors: Professors;
}

export interface pdfClass {
    id: number;
    day: number;
    startTime: string;
    endTime: string;
    roomName: string;
    subjectCode: string;
    subjectGroup: string;
    professors: any;
    isSelected: boolean;
}
