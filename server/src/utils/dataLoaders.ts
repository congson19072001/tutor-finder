import { Tutor } from "../entities/Tutor";
import DataLoader from "dataloader";
import { In } from "typeorm"
import { SubjectTutor } from "../entities/SubjectTutor"
import { Subject } from "../entities/Subject";
import { SpecialityTutor } from "../entities/SpecialityTutor";
import { Speciality } from "../entities/Speciality";

const batchGetSubjectTutors = async (subjectIds: string[]) => {
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

const batchGetSpecialityTutors = async (specialityIds: string[]) => {
    const specialityTutors = await SpecialityTutor.find({
        join: {
            alias: "specialityTutor",
            innerJoinAndSelect: {
                tutor: "specialityTutor.tutor",
            }
        },
        where: {
            specialityId: In(specialityIds)
        }
    });

    const specialityIdToTutors: { [key: string]: Tutor[] } = {};


    specialityTutors.forEach(specialityTutor => {
        if (specialityTutor.specialityId in specialityIdToTutors) {
            specialityIdToTutors[specialityTutor.specialityId].push((specialityTutor as any).__tutor__);
        } else {
            specialityIdToTutors[specialityTutor.specialityId] = [(specialityTutor as any).__tutor__];
        }
    });

    return specialityIds.map(specialityId => specialityIdToTutors[specialityId]);

};

const batchGetTutorSubjects = async (tutorIds: string[]) => {
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
const batchGetTutorSpecialities = async (tutorIds: string[]) => {
    const specialityTutors = await SpecialityTutor.find({
        join: {
            alias: "specialityTutor",
            innerJoinAndSelect: {
                speciality: "specialityTutor.speciality",
            }
        },
        where: {
            tutorId: In(tutorIds)
        }
    });

    const tutorIdToSpecialities: { [key: string]: Speciality[] } = {};


    specialityTutors.forEach(specialityTutor => {
        if (specialityTutor.tutorId in tutorIdToSpecialities) {
            tutorIdToSpecialities[specialityTutor.tutorId].push((specialityTutor as any).__speciality__);
        } else {
            tutorIdToSpecialities[specialityTutor.tutorId] = [(specialityTutor as any).__speciality__];
        }
    });

    return tutorIds.map(tutorId => tutorIdToSpecialities[tutorId]);

};
export const buildDataLoaders = () => ({
    subjectTutorsLoader: new DataLoader<string, Tutor[] | undefined>(subjectIds => batchGetSubjectTutors(subjectIds as string[])),
    tutorSubjectsLoader: new DataLoader<string, Subject[] | undefined>(tutorIds => batchGetTutorSubjects(tutorIds as string[])),
    specialityTutorsLoader: new DataLoader<string, Tutor[] | undefined>(subjectIds => batchGetSpecialityTutors(subjectIds as string[])),
    tutorSpecialitiesLoader: new DataLoader<string, Speciality[] | undefined>(tutorIds => batchGetTutorSpecialities(tutorIds as string[])),
})