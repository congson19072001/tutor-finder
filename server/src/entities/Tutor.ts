import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Availability } from "./Availability";
import { Resume } from "./Resume";
import { Schedule } from "./Schedule";
import { Subject } from "./Subject";
import { SubjectTutor } from "./SubjectTutor";
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

    @Field({nullable: true})
    @Column({nullable: true})
    salary: number;

    @Field()
    @OneToOne(() => TutorProfile, { cascade: true })
    @JoinColumn()
    profile: TutorProfile;

    @OneToMany(() => SubjectTutor, st => st.tutor)
    subjectConnection: SubjectTutor[];

    @Field(_type => [Resume], { nullable: true })
    @OneToMany(() => Resume, r => r.tutor, { cascade: true, nullable: true })
    resumes: Resume[];

    @Field(_type => [Subject],{ nullable: true })
    subjects: Subject[];

    @Field(_type => [Schedule], { nullable: true })
    schedules: Schedule[];

    @Field(_type => [Availability], { nullable: true })
    availabilities: Availability[];

    @Field()
    @CreateDateColumn({type: 'timestamptz'})
    createdAt: Date;

    @Field()
    @UpdateDateColumn({type: 'timestamptz'})
    updatedAt: Date;
}