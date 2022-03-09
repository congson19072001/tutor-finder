import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tutor } from "./Tutor";

export type DiplomaType = "Teaching_Degree" | "Subject_Degree" | "Other";

@ObjectType()
@Entity()
export class Diploma extends BaseEntity{

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
    university!: string;

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


    @Field(_type => Tutor, { nullable: true })
    @ManyToOne(_type => Tutor, tutor => tutor.diplomas)
    @JoinColumn({ name: "tutorId" })
    tutor: Promise<Tutor>;


}