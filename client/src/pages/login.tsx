import { Box, Button, Flex, Link, Spinner, useToast } from "@chakra-ui/react";
import { Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/router";
import NextLink from 'next/link'
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { LoginInput, MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { mapFieldErrors } from "../helpers/mapFieldErrors";
import useCheckAuth from "../utils/useCheckAuth";
import { initializeApollo } from "../lib/apolloClient";

const Login = () => {
    const router = useRouter();
    const {data:authData, loading:authLoading} = useCheckAuth();
    const initialValues: LoginInput  = {
        usernameOrEmail:'', 
        password: '',
    }
    const [loginUser, {loading: _loginUserLoading, error}] = useLoginMutation();

    const toast = useToast();
    
    const onLoginSubmit = async (values: LoginInput, {setErrors}: FormikHelpers<LoginInput> )=> {
        const response = await loginUser({
            variables:{
                loginInput: values
            },
            update(cache, {data}) {
                if(data?.login.success) {
                    cache.writeQuery<MeQuery>({
                        query: MeDocument,
                        data: {
                            me: data.login.user
                        }
                    })
                }
            }
        });
        if(response.data?.login.errors){
            setErrors(mapFieldErrors(response.data.login.errors));
        } else if(response.data?.login.user){
            toast({
                title: 'Welcome',
				description: `${response.data.login.user.username}`,
				status: 'success',
				duration: 3000,
				isClosable: true
            })

            const apolloClient = initializeApollo();
            apolloClient.resetStore();
            
            // redirect to index
            router.push("/");
        }
            
    }

    return(
        <>
        {
            (authLoading || (!authLoading && authData?.me)) 
            ? (
            <Flex justifyContent='center' alignItems='center' minH='100vh'>
                <Spinner />
            </Flex>
            ) 
            : (
            <Wrapper size="small">
                {error && <Box>{error.message}</Box>}
                <Formik 
                    initialValues={initialValues} 
                    onSubmit={onLoginSubmit}
                >
                    {({isSubmitting}) => (
                        <Form>
                                <InputField 
                                    name="usernameOrEmail"  
                                    placeholder="Username or email" 
                                    label="Username or email"
                                    type="text"
                                />
                                <Box mt={4}>
                                    <InputField 
                                        name="password"  
                                        placeholder="Password" 
                                        label="Password"
                                        type="password"
                                    />
                                </Box> 
                                <Flex mt={2}>
                                    <NextLink href='/forgot-password'>
                                        <Link ml='auto'>Forgot Password</Link>
                                    </NextLink>
                                </Flex>
                                <Button type="submit" 
                                    colorScheme='teal' 
                                    mt={4} isLoading={isSubmitting}
                                >
                                    Login
                                </Button>
                                
                        </Form>
                    )
                    }
                    
                </Formik>
            </Wrapper>)
        }
        </>
    )
}

export default Login;