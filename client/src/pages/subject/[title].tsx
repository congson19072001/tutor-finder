import { Alert, AlertIcon, AlertTitle, Box, Button, Flex, Heading, Spinner } from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/Layout';
import Wrapper from '../../components/Wrapper';
import { GetSubjectByTitleDocument, GetSubjectByTitleQuery, SubjectTitlesDocument, SubjectTitlesQuery, useGetSubjectByTitleQuery } from '../../generated/graphql';
import { addApolloState, initializeApollo } from '../../lib/apolloClient';


const Subject = () => {
    const router = useRouter();
    const {data, loading, error} = useGetSubjectByTitleQuery(
        {variables: 
            { 
                title: decodeURIComponent(router.query.title as string)  
            }
        });
        if (loading) 
        return (
            <Flex justifyContent='center' alignItems='center' minH='100vh'>
                <Spinner />
            </Flex>
        )
        if(error || !data?.getSubjectByTitle)
        return (
            <Layout>
                <Wrapper size='small'>
                    <Alert status='error'>
                        <AlertIcon />
                        <AlertTitle>{error ? error.message : "Subject not available at the moment"}</AlertTitle>
                    </Alert>
        
                    <Flex mt={2}>
                        <NextLink href='/'>
                            <Button ml='auto'>Back to Home page</Button>
                        </NextLink>
                    </Flex>
                </Wrapper>
            </Layout>
        )
        return (
            <Layout>
                <Heading mb={4}>
                    {data?.getSubjectByTitle?.title}
                </Heading>
                <Box mb={4}>
                    {data?.getSubjectByTitle?.description}
                </Box>
            </Layout>
        )
}

export const getStaticPaths: GetStaticPaths = async () => {

	const apolloClient = initializeApollo()

	const { data } = await apolloClient.query<SubjectTitlesQuery>({
		query: SubjectTitlesDocument,
		variables: { limit: 5}
	})

	return {
		paths: data.getSubjects!.paginatedSubjects.map(subject => ({
			params: { title: `${subject.title}` }
		})),
		fallback: 'blocking'
	}
}

export const getStaticProps: GetStaticProps<
	{ [key: string]: any },
	{ title: string }
> = async ({ params }) => {
	const apolloClient = initializeApollo()

	await apolloClient.query<GetSubjectByTitleQuery>({
		query: GetSubjectByTitleDocument,
		variables: { title: decodeURIComponent(params?.title as string) }
	})

	return addApolloState(apolloClient, { props: {} })
}

export default Subject
