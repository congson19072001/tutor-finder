import { Box, Button, Flex, Spinner, useToast } from "@chakra-ui/react";
import { Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/router";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { MeDocument, MeQuery, RegisterInput, useRegisterMutation } from "../generated/graphql";
import { mapFieldErrors } from "../helpers/mapFieldErrors";
import useCheckAuth from "../utils/useCheckAuth";

const Register = () => {
    const router = useRouter();
    const {data:authData, loading:authLoading} = useCheckAuth();

    const toast = useToast();

    const initialValues: RegisterInput  = {
        username: '', 
        password: '', 
        email: '', 
        // confirmPassword: '',
        firstName: '',
        lastName: ''
    }
    const [registerUser, {loading: _registerUserLoading, error}] = useRegisterMutation();

    
    const onRegisterSubmit = async (values: RegisterInput, {setErrors}: FormikHelpers<RegisterInput> )=> {
        const response = await registerUser({
            variables:{
                registerInput: values
            },
            update(cache, {data}) {
                if(data?.register.success) {
                    cache.writeQuery<MeQuery>({
                        query: MeDocument,
                        data: {
                            me: data.register.user
                        }
                    })
                }
            }
        });
        if(response.data?.register.errors){
            setErrors(mapFieldErrors(response.data.register.errors));
        } else if(response.data?.register.user){
            toast({
                title: 'Welcome',
				description: `${response.data.register.user.username}`,
				status: 'success',
				duration: 3000,
				isClosable: true
            })
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
                    onSubmit={onRegisterSubmit}
                >
                    {({isSubmitting}) => (
                        <Form>
                                <InputField 
                                    name="username"  
                                    placeholder="Username" 
                                    label="Username"
                                    type="text"
                                />
                                <Box mt={4}>
                                    <InputField 
                                        name="email"  
                                        placeholder="Email" 
                                        label="Email"
                                        type="email"
                                    />
                                </Box>
                                <Box mt={4}>
                                    <InputField 
                                        name="firstName"  
                                        placeholder="First Name" 
                                        label="First Name"
                                        type="text"
                                    />
                                </Box>
                                <Box mt={4}>
                                    <InputField 
                                        name="lastName"  
                                        placeholder="Last Name" 
                                        label="Last Name"
                                        type="text"
                                    />
                                </Box>
                                <Box mt={4}>
                                    <InputField 
                                        name="password"  
                                        placeholder="Password" 
                                        label="Password"
                                        type="password"
                                    />
                                </Box> 
                                {/* <Box mt={4}>
                                    <InputField 
                                        name="confirmPassword"  
                                        placeholder="Confirm Password" 
                                        label="Confirm Password"
                                        type="password"
                                    />
                                </Box>   */}
                                <Button type="submit" 
                                    colorScheme='teal' 
                                    mt={4} isLoading={isSubmitting}
                                >
                                    Register
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

export default Register;