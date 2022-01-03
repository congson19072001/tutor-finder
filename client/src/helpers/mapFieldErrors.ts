import { FieldError } from "../generated/graphql";

export const mapFieldErrors = (fieldErrors: FieldError[]): {[key:string]:string} => {
    return fieldErrors.reduce((acc, fieldError) => ({
            ...acc,
            [fieldError.field]: fieldError.message
        
    }),{});
}