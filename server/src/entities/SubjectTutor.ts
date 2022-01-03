import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Subject } from "./Subject";
import { Tutor } from "./Tutor";

@Entity()
export class SubjectTutor extends BaseEntity {

    @PrimaryColumn()
    tutorId!: string

    @ManyToOne(_to => Tutor, tutor => tutor.subjectConnection, { primary: true })
    @JoinColumn({ name: "tutorId" })
    tutor!: Promise<Tutor>

    @PrimaryColumn()
    subjectId!: string

    @ManyToOne(_to => Subject, subject => subject.tutorConnection)
    @JoinColumn({ name: "subjectId" })
    subject!: Promise<Subject>




}