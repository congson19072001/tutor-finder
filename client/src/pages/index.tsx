import { NetworkStatus } from "@apollo/client"
import { ChatIcon } from "@chakra-ui/icons"
import { Box, Button, Flex, Heading, IconButton, Link, Spinner, Stack, Text } from "@chakra-ui/react"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import NextLink from "next/link"
import Layout from "../components/Layout"
import { GetSubjectsDocument, useGetSubjectsQuery } from "../generated/graphql"
import { addApolloState, initializeApollo } from "../lib/apolloClient"


const limit = 5;
const Index = () => {
  
  const {data, loading, fetchMore, networkStatus} = useGetSubjectsQuery({variables: { limit },
    notifyOnNetworkStatusChange: true, });

  const loadingMoreSubjects = networkStatus === NetworkStatus.fetchMore;
  
  const loadMoreSubjects = () => fetchMore({variables:{cursor: data?.getSubjects?.cursor}
  });;
  
  return(<Layout>
  {
    loading && !loadingMoreSubjects ? (
    <Flex justifyContent='center' alignItems='center' minH='100vh'>
      <Spinner />
    </Flex>)
    :(
      <Stack spacing={8} >
        {data?.getSubjects?.paginatedSubjects.map(subject => 
          <Flex key={subject.id} p ={5} shadow='md' borderWidth='1px'>
            <Box flex={1}>
              <NextLink href={`/subject/${subject.title}`}>
                <Link>
                  <Flex alignItems='center'>
                    <IconButton icon={<ChatIcon />} aria-label='subject' mr={2} />
                    <Heading fontSize='xl' >
                    {subject.title}
                    </Heading>
                  </Flex>
                </Link>
              </NextLink>
              <Text>Number of tutors: {subject.numberOfTutors}</Text>
              <Flex>
                <Text mt={4}>{subject.textSnippet}</Text>
              </Flex>
            </Box>
          </Flex>)
        }
      </Stack>
    )
  }
  {
    data?.getSubjects?.hasMore && (
      <Flex justifyContent='center' mt={4}>
        <Button m='auto' my={5} isLoading={loadingMoreSubjects}
        onClick={loadMoreSubjects}>
          {loadingMoreSubjects ? 'Loading...' : 'Show More'}
        </Button>
      </Flex>
    )
  }
  </Layout>)
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const apolloClient = initializeApollo({ headers: context.req?.headers });

	await apolloClient.query({
		query: GetSubjectsDocument,
    variables: {
      limit,

    }
		
	})

	return addApolloState(apolloClient, {
		props: {}
	})
}

export default Index
