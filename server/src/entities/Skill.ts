import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export type SkillLevel = "Beginner" | "Intermediate" | "Advanced";
@ObjectType()
@Entity()
export class Skill extends BaseEntity{

    @Field(_type=>ID)
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Field(_type=>String)
    @Column()
    title!: string;

    @Field({nullable: true})
    @Column({nullable: true})
    description: string;

    @Field()
    @Column({
        type: "enum",
        enum: ["Beginner", "Intermediate", "Advanced"],
        default: "Beginner"
    })
    level!: SkillLevel;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;


}