import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Speciality } from "./Speciality";
import { Tutor } from "./Tutor";

@Entity()
export class SpecialityTutor extends BaseEntity {

    @PrimaryColumn()
    tutorId!: string

    @ManyToOne(_to => Tutor, tutor => tutor.specialityConnection, { primary: true })
    @JoinColumn({ name: "tutorId" })
    tutor!: Promise<Tutor>

    @PrimaryColumn()
    specialityId!: string

    @ManyToOne(_to => Speciality, speciality => speciality.tutorConnection)
    @JoinColumn({ name: "specialityId" })
    speciality!: Promise<Speciality>




}