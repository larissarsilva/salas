export interface SubjectClass {
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
    subjects: SubjectClass;
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

export interface Class {
    id: number;
    roomId: number;
    professors: any;
    subject: any;
    subjectId: number;
    day: number;
    startTime: string;
    endTime: string;
  }

export interface classInProgress {
    id: number;
    classId: number;
    roomName: string;
    roomBlock: number;
    subjectCode: string;
    subjectName: string;
    subjectGroup: string;
    responsibleProfessorName: string;
    note: string;
}

export interface Users {
    id: number;
    name: string;
    surname: string;
    email: string;
    role: number;
}

