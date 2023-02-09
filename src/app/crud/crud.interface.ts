export interface Subject {
    id: number;
    name: string;
    hours: number;
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
