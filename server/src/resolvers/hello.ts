import { MyContext } from "../types/MyContext";
import { Ctx, Query, Resolver } from "type-graphql";

@Resolver()
export class HelloResolver {
    @Query(() => String)
    hello(@Ctx() {req} : MyContext) {
        console.log(req.session.userId);
        return "Hello World!";
    }
}