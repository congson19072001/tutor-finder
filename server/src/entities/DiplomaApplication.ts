import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TutorApplication } from "./TutorApplication";

export type DiplomaType = "Teaching_Degree" | "Subject_Degree" | "Other";

@ObjectType()
@Entity()
export class DiplomaApplication extends BaseEntity{

    @Field(_type=>ID)
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Field(_type=>ID)
    @Column()
    tutorId!: string;

    @Field(_type=>String)
    @Column()
    degree!: string;

    @Field(_type => String)
    @Column({
        type: "enum",
        enum: ["Teaching_Degree", "Subject_Degree", "Other"],
        default: "Teaching_Degree"
    })
    type!: DiplomaType;

    @Field(_type => String)
    @Column()
    University!: string;

    @Field(_type => String)
    @Column()
    specialization!: String;

    @Field(_type => String)
    @Column()
    badgeUrl!: string;

    @Field()
    @Column()
    startYear!: number;

    @Field(_type => Number, { nullable: true })
    @Column({nullable: true})
    endYear: number;


    @Field(_type => TutorApplication, { nullable: true })
    @ManyToOne(_type => TutorApplication, tutor => tutor.diplomas)
    @JoinColumn({ name: "tutorId" })
    tutor: Promise<TutorApplication>;


}