import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Availability } from "./Availability";
import { Certification } from "./Certification";
import { Diploma } from "./Diploma";
import { Review } from "./Review";
import { Schedule } from "./Schedule";
import { Speciality } from "./Speciality";
import { SpecialityTutor } from "./SpecialityTutor";
import { Subject } from "./Subject";
import { SubjectTutor } from "./SubjectTutor";
import { TutorBalance } from "./TutorBalance";
import { TutorProfile } from "./TutorProfile";


@ObjectType()
@Entity()
export class Tutor extends BaseEntity {

    @Field(_type=>ID)
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Field(_type=>String)
    @Column({ unique: true })
    username!: string;

    @Field(_type=>String)
    @Column({ unique: true })
    email!: string;

    @Column({ unique: true })
    password!: string;

    @Field(_type=>String)
    @Column()
    fullName: string;

    @Field(_type=> Boolean)
    @Column({ default: false })
    isOnline!: boolean;

    @Field({nullable: true})
    @Column({nullable: true})
    salary: number;

    @Field()
    @OneToOne(() => TutorProfile, { cascade: true })
    @JoinColumn()
    profile: TutorProfile;

    @Field()
    @OneToOne(() => TutorBalance, { cascade: true })
    @JoinColumn()
    balance: TutorBalance;

    @OneToMany(() => SubjectTutor, st => st.tutor)
    subjectConnection: SubjectTutor[];

    @OneToMany(() => SubjectTutor, st => st.tutor)
    specialityConnection: SpecialityTutor[];

    @Field(_type => [Certification], { nullable: true })
    @OneToMany(() => Certification, c => c.tutor, { cascade: true, nullable: true })
    certifications: Certification[];

    @Field(_type => [Diploma], { nullable: true })
    @OneToMany(() => Diploma, d => d.tutor, { cascade: true, nullable: true })
    diplomas: Diploma[];

    @Field(_type => [Subject],{ nullable: true })
    subjects: Subject[];

    @Field(_type => [Speciality],{ nullable: true })
    specialities: Speciality[];


    @Field(_type => [Schedule], { nullable: true })
    schedules: Schedule[];

    @Field(_type => [Availability], { nullable: true })
    availabilities: Availability[];

    @Field(_type => [Review], { nullable: true })
    reviews: Review[];

    @Field()
    @CreateDateColumn({type: 'timestamptz'})
    createdAt: Date;

    @Field()
    @UpdateDateColumn({type: 'timestamptz'})
    updatedAt: Date;
}