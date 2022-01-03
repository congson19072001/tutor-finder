import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react"
import NextLink from "next/link"
import { MeDocument, MeQuery, useLogoutMutation, useMeQuery } from "../generated/graphql";
const Navbar = () => {

    const {data, loading: useMeQueryLoading} = useMeQuery();
    const [logoutUser, {loading: useLogoutMutationLoading}] = useLogoutMutation();
    const logout = async () => {
        await logoutUser({update(cache, {data}) {
            if (data?.logout) {
                cache.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                        me: null
                    }
                })
            }

        }});
    }

    let body;

    if(useMeQueryLoading) {
        body = null
    }
    else if(!data?.me) {
        body = (<>
            <NextLink href='/login'>
                <Link mr={3}>Login</Link>
            </NextLink>
            <NextLink href='/register'>
                <Link mr={3}>Register</Link>
            </NextLink>
        </>)
    } else {
        body = (
            <Flex>
                <NextLink href='/profile'>
                    <Link mr={3}>Profile</Link>
                </NextLink>
                <Box mr={3}>{data.me.username}</Box>
                <Button
                    onClick={logout}
                    isLoading={useLogoutMutationLoading}
                >
                    Logout
                </Button>
            </Flex>
        )
    }

    return (
        <Box bg='tan' p={4}>
            <Flex maxW= {800} justifyContent='space-between' align='center' m='auto'>
            <NextLink href='/'>
                <Heading>Beematie</Heading>
            </NextLink>
            <Box>
                {body}
            </Box>
            </Flex>
        </Box>
    )
}

export default Navbar
