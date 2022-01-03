import { Tutor } from "../entities/Tutor";
import DataLoader from "dataloader";
import { In } from "typeorm"
import { SubjectTutor } from "../entities/SubjectTutor"
import { Subject } from "../entities/Subject";

const batchGetTutors = async (subjectIds: string[]) => {
    const subjectTutors = await SubjectTutor.find({
        join: {
            alias: "subjectTutor",
            innerJoinAndSelect: {
                tutor: "subjectTutor.tutor",
            }
        },
        where: {
            subjectId: In(subjectIds)
        }
    });

    const subjectIdToTutors: { [key: string]: Tutor[] } = {};


    subjectTutors.forEach(subjectTutor => {
        if (subjectTutor.subjectId in subjectIdToTutors) {
            subjectIdToTutors[subjectTutor.subjectId].push((subjectTutor as any).__tutor__);
        } else {
            subjectIdToTutors[subjectTutor.subjectId] = [(subjectTutor as any).__tutor__];
        }
    });

    return subjectIds.map(subjectId => subjectIdToTutors[subjectId]);

};

const batchGetSubjects = async (tutorIds: string[]) => {
    const subjectTutors = await SubjectTutor.find({
        join: {
            alias: "subjectTutor",
            innerJoinAndSelect: {
                subject: "subjectTutor.subject",
            }
        },
        where: {
            tutorId: In(tutorIds)
        }
    });

    const tutorIdToSubjects: { [key: string]: Subject[] } = {};


    subjectTutors.forEach(subjectTutor => {
        if (subjectTutor.tutorId in tutorIdToSubjects) {
            tutorIdToSubjects[subjectTutor.tutorId].push((subjectTutor as any).__subject__);
        } else {
            tutorIdToSubjects[subjectTutor.tutorId] = [(subjectTutor as any).__subject__];
        }
    });

    return tutorIds.map(tutorId => tutorIdToSubjects[tutorId]);

};
export const buildDataLoaders = () => ({
    tutorsLoader: new DataLoader<string, Tutor[] | undefined>(subjectIds => batchGetTutors(subjectIds as string[])),
    subjectsLoader: new DataLoader<string, Subject[] | undefined>(tutorIds => batchGetSubjects(tutorIds as string[])),
})