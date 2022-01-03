import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Subject } from "./Subject";
import { SubjectTutor } from "./SubjectTutor";


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
    firstName: string;

    @Field(_type=>String)
    @Column()
    lastName: string;

    @Field({nullable: true})
    @Column({nullable: true})
    salary: number;

    @OneToMany(() => SubjectTutor, st => st.tutor)
    subjectConnection: SubjectTutor[];

    @Field(_type => [Subject],{ nullable: true })
    subjects: Subject[];

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}