import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Admin = {
  __typename?: 'Admin';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type AdminMutationResponse = IMutationResponse & {
  __typename?: 'AdminMutationResponse';
  admin?: Maybe<Admin>;
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type ChangePasswordInput = {
  newPassword: Scalars['String'];
};

export type CreateSubjectInput = {
  description: Scalars['String'];
  title: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type ForgotPasswordInput = {
  email: Scalars['String'];
};

export type IMutationResponse = {
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type LoginInput = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserMutationResponse;
  connectSubjectToTutor: SubjectMutationResponse;
  createSubject: SubjectMutationResponse;
  deleteSubject: SubjectMutationResponse;
  forgotPassword: Scalars['Boolean'];
  login: UserMutationResponse;
  loginAdmin: AdminMutationResponse;
  loginTutor: TutorMutationResponse;
  logout: Scalars['Boolean'];
  register: UserMutationResponse;
  registerAdmin: AdminMutationResponse;
  registerTutor: TutorMutationResponse;
  updateSubject: SubjectMutationResponse;
};


export type MutationChangePasswordArgs = {
  changePasswordInput: ChangePasswordInput;
  token: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationConnectSubjectToTutorArgs = {
  subjectId: Scalars['ID'];
};


export type MutationCreateSubjectArgs = {
  createSubjectInput: CreateSubjectInput;
};


export type MutationDeleteSubjectArgs = {
  id: Scalars['ID'];
};


export type MutationForgotPasswordArgs = {
  forgotPasswordInput: ForgotPasswordInput;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationLoginAdminArgs = {
  loginInput: LoginInput;
};


export type MutationLoginTutorArgs = {
  loginInput: LoginInput;
};


export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};


export type MutationRegisterAdminArgs = {
  registerInput: RegisterInput;
};


export type MutationRegisterTutorArgs = {
  registerInput: RegisterInput;
};


export type MutationUpdateSubjectArgs = {
  updateSubjectInput: UpdateSubjectInput;
};

export type PaginatedSubjects = {
  __typename?: 'PaginatedSubjects';
  cursor: Scalars['DateTime'];
  hasMore: Scalars['Boolean'];
  paginatedSubjects: Array<Subject>;
  totalCount: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  getSubject?: Maybe<Subject>;
  getSubjectByTitle?: Maybe<Subject>;
  getSubjects?: Maybe<PaginatedSubjects>;
  hello: Scalars['String'];
  me?: Maybe<User>;
  meAdmin?: Maybe<Admin>;
  meTutor?: Maybe<Tutor>;
};


export type QueryGetSubjectArgs = {
  id: Scalars['ID'];
};


export type QueryGetSubjectByTitleArgs = {
  title: Scalars['String'];
};


export type QueryGetSubjectsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};

export type RegisterInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Subject = {
  __typename?: 'Subject';
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  numberOfTutors: Scalars['Float'];
  textSnippet: Scalars['String'];
  title: Scalars['String'];
  tutors: Array<Tutor>;
  updatedAt: Scalars['DateTime'];
};

export type SubjectMutationResponse = IMutationResponse & {
  __typename?: 'SubjectMutationResponse';
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  subject?: Maybe<Subject>;
  success: Scalars['Boolean'];
};

export type Tutor = {
  __typename?: 'Tutor';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  salary?: Maybe<Scalars['Float']>;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type TutorMutationResponse = IMutationResponse & {
  __typename?: 'TutorMutationResponse';
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  tutor?: Maybe<Tutor>;
};

export type UpdateSubjectInput = {
  description: Scalars['String'];
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UserMutationResponse = IMutationResponse & {
  __typename?: 'UserMutationResponse';
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type FieldErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type UserMutationStatusesFragment = { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null | undefined };

export type SubjectMutationStatusesFragment = { __typename?: 'SubjectMutationResponse', code: number, success: boolean, message?: string | null | undefined };

export type SubjectInfoFragment = { __typename?: 'Subject', id: string, title: string, textSnippet: string, description: string, numberOfTutors: number };

export type SubjectInfoWithTutorsFragment = { __typename?: 'Subject', id: string, title: string, textSnippet: string, description: string, numberOfTutors: number, tutors: Array<{ __typename?: 'Tutor', id: string, firstName: string, lastName: string, salary?: number | null | undefined }> };

export type SubjectMutationResponseFragment = { __typename?: 'SubjectMutationResponse', code: number, success: boolean, message?: string | null | undefined, subject?: { __typename?: 'Subject', id: string, title: string, textSnippet: string, description: string, numberOfTutors: number } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined };

export type UserInfoFragment = { __typename?: 'User', id: string, username: string, email: string, createdAt: any, updatedAt: any };

export type UserMutationResponseFragment = { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null | undefined, user?: { __typename?: 'User', id: string, username: string, email: string, createdAt: any, updatedAt: any } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined };

export type ChangePasswordMutationVariables = Exact<{
  userId: Scalars['String'];
  token: Scalars['String'];
  changePasswordInput: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null | undefined, user?: { __typename?: 'User', id: string, username: string, email: string, createdAt: any, updatedAt: any } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type ConnectSubjectToTutorMutationVariables = Exact<{
  subjectId: Scalars['ID'];
}>;


export type ConnectSubjectToTutorMutation = { __typename?: 'Mutation', connectSubjectToTutor: { __typename?: 'SubjectMutationResponse', code: number, success: boolean, message?: string | null | undefined, subject?: { __typename?: 'Subject', id: string, title: string, textSnippet: string, description: string, numberOfTutors: number } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type CreateSubjectMutationVariables = Exact<{
  createSubjectInput: CreateSubjectInput;
}>;


export type CreateSubjectMutation = { __typename?: 'Mutation', createSubject: { __typename?: 'SubjectMutationResponse', code: number, success: boolean, message?: string | null | undefined, subject?: { __typename?: 'Subject', id: string, title: string, description: string, createdAt: any } | null | undefined } };

export type ForgotPasswordMutationVariables = Exact<{
  forgotPasswordInput: ForgotPasswordInput;
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null | undefined, user?: { __typename?: 'User', id: string, username: string, email: string, createdAt: any, updatedAt: any } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null | undefined, user?: { __typename?: 'User', id: string, username: string, email: string, createdAt: any, updatedAt: any } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, username: string, email: string, createdAt: any, updatedAt: any } | null | undefined };

export type GetSubjectByTitleQueryVariables = Exact<{
  title: Scalars['String'];
}>;


export type GetSubjectByTitleQuery = { __typename?: 'Query', getSubjectByTitle?: { __typename?: 'Subject', id: string, title: string, textSnippet: string, description: string, numberOfTutors: number, tutors: Array<{ __typename?: 'Tutor', id: string, firstName: string, lastName: string, salary?: number | null | undefined }> } | null | undefined };

export type SubjectTitlesQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type SubjectTitlesQuery = { __typename?: 'Query', getSubjects?: { __typename?: 'PaginatedSubjects', paginatedSubjects: Array<{ __typename?: 'Subject', title: string, textSnippet: string }> } | null | undefined };

export type GetSubjectsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type GetSubjectsQuery = { __typename?: 'Query', getSubjects?: { __typename?: 'PaginatedSubjects', totalCount: number, cursor: any, hasMore: boolean, paginatedSubjects: Array<{ __typename?: 'Subject', id: string, title: string, textSnippet: string, description: string, numberOfTutors: number }> } | null | undefined };

export const SubjectInfoWithTutorsFragmentDoc = gql`
    fragment subjectInfoWithTutors on Subject {
  id
  title
  textSnippet
  description
  numberOfTutors
  tutors {
    id
    firstName
    lastName
    salary
  }
}
    `;
export const SubjectMutationStatusesFragmentDoc = gql`
    fragment subjectMutationStatuses on SubjectMutationResponse {
  code
  success
  message
}
    `;
export const SubjectInfoFragmentDoc = gql`
    fragment subjectInfo on Subject {
  id
  title
  textSnippet
  description
  numberOfTutors
}
    `;
export const FieldErrorFragmentDoc = gql`
    fragment fieldError on FieldError {
  field
  message
}
    `;
export const SubjectMutationResponseFragmentDoc = gql`
    fragment subjectMutationResponse on SubjectMutationResponse {
  ...subjectMutationStatuses
  subject {
    ...subjectInfo
  }
  errors {
    ...fieldError
  }
}
    ${SubjectMutationStatusesFragmentDoc}
${SubjectInfoFragmentDoc}
${FieldErrorFragmentDoc}`;
export const UserMutationStatusesFragmentDoc = gql`
    fragment userMutationStatuses on UserMutationResponse {
  code
  success
  message
}
    `;
export const UserInfoFragmentDoc = gql`
    fragment userInfo on User {
  id
  username
  email
  createdAt
  updatedAt
}
    `;
export const UserMutationResponseFragmentDoc = gql`
    fragment userMutationResponse on UserMutationResponse {
  ...userMutationStatuses
  user {
    ...userInfo
  }
  errors {
    ...fieldError
  }
}
    ${UserMutationStatusesFragmentDoc}
${UserInfoFragmentDoc}
${FieldErrorFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($userId: String!, $token: String!, $changePasswordInput: ChangePasswordInput!) {
  changePassword(
    userId: $userId
    token: $token
    changePasswordInput: $changePasswordInput
  ) {
    ...userMutationResponse
  }
}
    ${UserMutationResponseFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      token: // value for 'token'
 *      changePasswordInput: // value for 'changePasswordInput'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ConnectSubjectToTutorDocument = gql`
    mutation ConnectSubjectToTutor($subjectId: ID!) {
  connectSubjectToTutor(subjectId: $subjectId) {
    ...subjectMutationResponse
  }
}
    ${SubjectMutationResponseFragmentDoc}`;
export type ConnectSubjectToTutorMutationFn = Apollo.MutationFunction<ConnectSubjectToTutorMutation, ConnectSubjectToTutorMutationVariables>;

/**
 * __useConnectSubjectToTutorMutation__
 *
 * To run a mutation, you first call `useConnectSubjectToTutorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConnectSubjectToTutorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [connectSubjectToTutorMutation, { data, loading, error }] = useConnectSubjectToTutorMutation({
 *   variables: {
 *      subjectId: // value for 'subjectId'
 *   },
 * });
 */
export function useConnectSubjectToTutorMutation(baseOptions?: Apollo.MutationHookOptions<ConnectSubjectToTutorMutation, ConnectSubjectToTutorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConnectSubjectToTutorMutation, ConnectSubjectToTutorMutationVariables>(ConnectSubjectToTutorDocument, options);
      }
export type ConnectSubjectToTutorMutationHookResult = ReturnType<typeof useConnectSubjectToTutorMutation>;
export type ConnectSubjectToTutorMutationResult = Apollo.MutationResult<ConnectSubjectToTutorMutation>;
export type ConnectSubjectToTutorMutationOptions = Apollo.BaseMutationOptions<ConnectSubjectToTutorMutation, ConnectSubjectToTutorMutationVariables>;
export const CreateSubjectDocument = gql`
    mutation CreateSubject($createSubjectInput: CreateSubjectInput!) {
  createSubject(createSubjectInput: $createSubjectInput) {
    code
    success
    message
    subject {
      id
      title
      description
      createdAt
    }
  }
}
    `;
export type CreateSubjectMutationFn = Apollo.MutationFunction<CreateSubjectMutation, CreateSubjectMutationVariables>;

/**
 * __useCreateSubjectMutation__
 *
 * To run a mutation, you first call `useCreateSubjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubjectMutation, { data, loading, error }] = useCreateSubjectMutation({
 *   variables: {
 *      createSubjectInput: // value for 'createSubjectInput'
 *   },
 * });
 */
export function useCreateSubjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateSubjectMutation, CreateSubjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSubjectMutation, CreateSubjectMutationVariables>(CreateSubjectDocument, options);
      }
export type CreateSubjectMutationHookResult = ReturnType<typeof useCreateSubjectMutation>;
export type CreateSubjectMutationResult = Apollo.MutationResult<CreateSubjectMutation>;
export type CreateSubjectMutationOptions = Apollo.BaseMutationOptions<CreateSubjectMutation, CreateSubjectMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($forgotPasswordInput: ForgotPasswordInput!) {
  forgotPassword(forgotPasswordInput: $forgotPasswordInput)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      forgotPasswordInput: // value for 'forgotPasswordInput'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    ...userMutationResponse
  }
}
    ${UserMutationResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($registerInput: RegisterInput!) {
  register(registerInput: $registerInput) {
    ...userMutationResponse
  }
}
    ${UserMutationResponseFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerInput: // value for 'registerInput'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...userInfo
  }
}
    ${UserInfoFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const GetSubjectByTitleDocument = gql`
    query GetSubjectByTitle($title: String!) {
  getSubjectByTitle(title: $title) {
    ...subjectInfoWithTutors
  }
}
    ${SubjectInfoWithTutorsFragmentDoc}`;

/**
 * __useGetSubjectByTitleQuery__
 *
 * To run a query within a React component, call `useGetSubjectByTitleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSubjectByTitleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSubjectByTitleQuery({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useGetSubjectByTitleQuery(baseOptions: Apollo.QueryHookOptions<GetSubjectByTitleQuery, GetSubjectByTitleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSubjectByTitleQuery, GetSubjectByTitleQueryVariables>(GetSubjectByTitleDocument, options);
      }
export function useGetSubjectByTitleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSubjectByTitleQuery, GetSubjectByTitleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSubjectByTitleQuery, GetSubjectByTitleQueryVariables>(GetSubjectByTitleDocument, options);
        }
export type GetSubjectByTitleQueryHookResult = ReturnType<typeof useGetSubjectByTitleQuery>;
export type GetSubjectByTitleLazyQueryHookResult = ReturnType<typeof useGetSubjectByTitleLazyQuery>;
export type GetSubjectByTitleQueryResult = Apollo.QueryResult<GetSubjectByTitleQuery, GetSubjectByTitleQueryVariables>;
export const SubjectTitlesDocument = gql`
    query SubjectTitles($limit: Int!, $cursor: String) {
  getSubjects(limit: $limit, cursor: $cursor) {
    paginatedSubjects {
      title
      textSnippet
    }
  }
}
    `;

/**
 * __useSubjectTitlesQuery__
 *
 * To run a query within a React component, call `useSubjectTitlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubjectTitlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubjectTitlesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useSubjectTitlesQuery(baseOptions: Apollo.QueryHookOptions<SubjectTitlesQuery, SubjectTitlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SubjectTitlesQuery, SubjectTitlesQueryVariables>(SubjectTitlesDocument, options);
      }
export function useSubjectTitlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SubjectTitlesQuery, SubjectTitlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SubjectTitlesQuery, SubjectTitlesQueryVariables>(SubjectTitlesDocument, options);
        }
export type SubjectTitlesQueryHookResult = ReturnType<typeof useSubjectTitlesQuery>;
export type SubjectTitlesLazyQueryHookResult = ReturnType<typeof useSubjectTitlesLazyQuery>;
export type SubjectTitlesQueryResult = Apollo.QueryResult<SubjectTitlesQuery, SubjectTitlesQueryVariables>;
export const GetSubjectsDocument = gql`
    query GetSubjects($limit: Int!, $cursor: String) {
  getSubjects(limit: $limit, cursor: $cursor) {
    totalCount
    cursor
    hasMore
    paginatedSubjects {
      ...subjectInfo
    }
  }
}
    ${SubjectInfoFragmentDoc}`;

/**
 * __useGetSubjectsQuery__
 *
 * To run a query within a React component, call `useGetSubjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSubjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSubjectsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetSubjectsQuery(baseOptions: Apollo.QueryHookOptions<GetSubjectsQuery, GetSubjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSubjectsQuery, GetSubjectsQueryVariables>(GetSubjectsDocument, options);
      }
export function useGetSubjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSubjectsQuery, GetSubjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSubjectsQuery, GetSubjectsQueryVariables>(GetSubjectsDocument, options);
        }
export type GetSubjectsQueryHookResult = ReturnType<typeof useGetSubjectsQuery>;
export type GetSubjectsLazyQueryHookResult = ReturnType<typeof useGetSubjectsLazyQuery>;
export type GetSubjectsQueryResult = Apollo.QueryResult<GetSubjectsQuery, GetSubjectsQueryVariables>;