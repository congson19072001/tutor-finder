import { UpdateSubjectInput } from "../types/UpdateSubjectInput";
import { Arg, Ctx, FieldResolver, ID, Int, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { Subject } from "../entities/Subject";
import { SubjectMutationResponse } from "../types/SubjectMutationResponse";
import { CreateSubjectInput } from "../types/CreateSubjectInput";
import { checkAuthAdmin, checkAuthTutor } from "../middleware/checkAuth";
//import { Tutor } from "../entities/Tutor";
import { PaginatedSubjects } from "../types/PaginatedSubjects";
import { LessThan } from "typeorm";
import { MyContext } from "../types/MyContext";
import { UserInputError } from "apollo-server-core";
import { SubjectTutor } from "../entities/SubjectTutor";
import { Tutor } from "../entities/Tutor";

@Resolver(_of => Subject)
export class SubjectResolver {

    @FieldResolver(_return => String)
    textSnippet(@Root() root: Subject){
        return root.description.slice(0, 50);
    }

    @FieldResolver(_return => [Tutor])
    async tutors(
        @Root() root: Subject,
        @Ctx() { dataLoaders : {tutorsLoader}} : MyContext
    ): Promise<Tutor[] | undefined> {
        return await tutorsLoader.load(root.id);
    }

    @Mutation(() => SubjectMutationResponse)
    @UseMiddleware(checkAuthAdmin)
    async createSubject(
        @Arg("createSubjectInput") { title, description }: CreateSubjectInput
        ) : Promise<SubjectMutationResponse> {
        try{
            const newSubject = Subject.create({
                title,
                description,
            });
            await newSubject.save();
            return {
                code: 200,
                success: true,
                message: "Subject created successfully",
                subject: newSubject,
            };
        } catch(err){
            console.log(err);
            return {
                code: 500,
                success: false,
                message: err.message,
            };
        }
        
    }

    @Query(() => PaginatedSubjects, {nullable: true})
    async getSubjects(
        @Arg("limit", _type => Int) limit: number,
        @Arg("cursor", {nullable: true}) cursor?: string
    ) : Promise<PaginatedSubjects | null> {
        try{
            const realLimit = Math.min(10, limit);
            const totalSubjectCount = await Subject.count();
            const findOptions: {[key:string]: any} = {
                order:{
                    createdAt: "DESC",
                },
                take: realLimit,
            }
            let lastSubject: Subject[] = [];
            if(cursor){
                findOptions.where = {
                    createdAt: LessThan(cursor),
                }
                lastSubject = await Subject.find(
                    {
                        order:{
                            createdAt: "ASC",
                        },
                        take: 1
                    }
                );
            }
            const subjects = await Subject.find(findOptions);
            return {
                totalCount: totalSubjectCount,
                cursor: subjects[subjects.length - 1].createdAt,
                hasMore: cursor ? 
                    subjects[subjects.length - 1].createdAt.toString() !== 
                    lastSubject[0].createdAt.toString() : subjects.length !== totalSubjectCount,
                paginatedSubjects: subjects,
            }
        }
        catch(err){
            console.log(err);
            return null
        }
    }

    @Query(() => Subject, { nullable: true })
    async getSubject(
        @Arg("id", _type => ID) id: string
    ) : Promise<Subject | undefined> {
        try{
            const subject = await Subject.findOne(id);
            return subject;
        }
        catch(err){
            console.log(err);
            return undefined;
        }
    }

    @Query(() => Subject, { nullable: true })
    async getSubjectByTitle(
        @Arg("title", _type => String) title: string
    ) : Promise<Subject | undefined> {
        try{
            const subject = await Subject.findOne({
                where: {
                    title: title,
                }
            });
            return subject;
        }
        catch(err){
            console.log(err);
            return undefined;
        }
    }

    @Mutation(() => SubjectMutationResponse)
    @UseMiddleware(checkAuthAdmin)
    async updateSubject(
        @Arg("updateSubjectInput") { id, title, description }: UpdateSubjectInput
    ) : Promise<SubjectMutationResponse> {
        try{
            const existingSubject = await Subject.findOne(id);
            if(!existingSubject){
                return {
                    code: 404,
                    success: false,
                    message: "Subject not found",
                };
            }
            existingSubject.title = title;
            existingSubject.description = description;
            await existingSubject.save();
            return {
                code: 200,
                success: true,
                message: "Subject updated successfully",
                subject: existingSubject,
            };
        }
        catch(err){
            console.log(err);
            return {
                code: 500,
                success: false,
                message: err.message,
            };
        }
    }

    @Mutation(() => SubjectMutationResponse)
    @UseMiddleware(checkAuthAdmin)
    async deleteSubject(
        @Arg("id", _type => ID) id: string
    ) : Promise<SubjectMutationResponse> {
        try{
            const existingSubject = await Subject.findOne(id);
            if(!existingSubject){
                return {
                    code: 404,
                    success: false,
                    message: "Subject not found",
                };
            }
            await existingSubject.remove();
            return {
                code: 200,
                success: true,
                message: "Subject deleted successfully",
            };
        }
        catch(err){
            console.log(err);
            return {
                code: 500,
                success: false,
                message: err.message,
            };
        }
    }

    @Mutation(_return => SubjectMutationResponse)
    @UseMiddleware(checkAuthTutor)
    async connectSubjectToTutor(
        @Arg("subjectId", _type => ID) subjectId: string,
        @Ctx() {req: {session: {tutorId}}, connection}: MyContext
    ) : Promise<SubjectMutationResponse> {
        return await connection.transaction(async transactionEntityManager =>{
            let subject = await transactionEntityManager.findOne(Subject, subjectId);
            if(!subject){
                throw new UserInputError('Subject not found')
            }

            const subjectTutor = await transactionEntityManager.findOne(SubjectTutor, {
                subjectId,
                tutorId
            })

            if(!subjectTutor){
                const newST = transactionEntityManager.create(SubjectTutor, {
                    tutorId,
                    subjectId
                })
                await transactionEntityManager.save(newST);
                subject.numberOfTutors = subject.numberOfTutors + 1;
                await transactionEntityManager.increment(Subject, {id : subject.id}, "numberOfTutors", 1);
            }

            return {
                code: 200,
                success: true,
                message: "Subject connected to tutor successfully",
                subject
            }

        })
    }

}