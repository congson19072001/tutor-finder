import { Alert, AlertIcon, AlertTitle, Box, Button, Flex, Link, Spinner } from "@chakra-ui/react"
import { Form, Formik, FormikHelpers } from "formik"
import { useRouter } from "next/router"
import { useState } from "react"
import InputField from "../components/InputField"
import Wrapper from "../components/Wrapper"
import NextLink from 'next/link'
import { ChangePasswordInput, MeDocument, MeQuery, useChangePasswordMutation } from "../generated/graphql"
import { mapFieldErrors } from "../helpers/mapFieldErrors"
import useCheckAuth from "../utils/useCheckAuth"

const changePassword = () => {
    const router = useRouter()
    const [changePassword, _] = useChangePasswordMutation();
    const [tokenError, setTokenError] = useState("");
    const {data:authData, loading:authLoading} = useCheckAuth();

    const initialValues = {newPassword: ''}
    const onChangePasswordSubmit = async(values: ChangePasswordInput, {setErrors}: FormikHelpers<ChangePasswordInput>)=>{
        if(router.query.userId && router.query.token){
            const response = await changePassword({
                variables: {
                    userId: router.query.userId as string,
                    token: router.query.token as string,
                    changePasswordInput: values

                },
                update(cache, {data}) {
                    if(data?.changePassword.success) {
                        cache.writeQuery<MeQuery>({
                            query: MeDocument,
                            data: {
                                me: data.changePassword.user
                            }
                        })
                    }
                }
            });

            if(response.data?.changePassword.errors){
                const fieldErrors = mapFieldErrors(response.data.changePassword.errors);
                if('token' in fieldErrors){
                    setTokenError(fieldErrors.token);
                }
                setErrors(fieldErrors);
            } else if(response.data?.changePassword.user){
                
                router.push('/');
            }
        }
    }

    if (authLoading || (!authLoading && authData?.me)) {
		return (
			<Flex justifyContent='center' alignItems='center' minH='100vh'>
				<Spinner />
			</Flex>
		)
	} else if (!router.query.token || !router.query.userId) 
    return (
        <Wrapper size='small'>
            <Alert status='error'>
                <AlertIcon />
                <AlertTitle>Invalid password change request</AlertTitle>
            </Alert>

            <Flex mt={2}>
                <NextLink href='/login'>
                    <Link ml='auto'>Back to Login</Link>
                </NextLink>
            </Flex>
        </Wrapper>
    )
    else return (
        <Wrapper size="small">
            <Formik 
                initialValues={initialValues} 
                onSubmit={onChangePasswordSubmit}
            >
                {({isSubmitting}) =>
                (
                    <Form>
                            <InputField 
                                name="newPassword"  
                                placeholder="New password" 
                                label="New password"
                                type="password"
                            /> 
                            {tokenError && 
                            <Flex>
                            <Box color="red.500" mr={2}>{tokenError}</Box>
                            <NextLink href='/forgot-password'>
                                <Link>Go back to forgot password</Link>
                            </NextLink>
                            </Flex>
                            }
                            <Button type="submit" 
                                colorScheme='teal' 
                                mt={4} isLoading={isSubmitting}
                            >
                                Send Reset Password
                            </Button>
                            
                    </Form>
                )
                }
                
            </Formik>
        </Wrapper>
    )
}

export default changePassword
