export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type BasicAddress = {
  __typename?: 'BasicAddress';
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  isMailingAddressDifferentFromRegisteredAddress?: Maybe<Scalars['Boolean']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Scalars['String']['output']>;
  zipCode?: Maybe<Scalars['String']['output']>;
};

export type BasicAddressInput = {
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  state: Scalars['String']['input'];
  street: Scalars['String']['input'];
  zipCode: Scalars['String']['input'];
};

export type Company = {
  __typename?: 'Company';
  email?: Maybe<Scalars['String']['output']>;
  facebookCompanyPage?: Maybe<Scalars['String']['output']>;
  fax?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  industry?: Maybe<Scalars['String']['output']>;
  legalName?: Maybe<Scalars['String']['output']>;
  linkedInCompanyPage?: Maybe<Scalars['String']['output']>;
  logoS3Key?: Maybe<Scalars['String']['output']>;
  mailingAddress?: Maybe<BasicAddress>;
  numberOfFullTimeEmployees?: Maybe<Scalars['Int']['output']>;
  numberOfPartTimeEmployees?: Maybe<Scalars['Int']['output']>;
  otherInformation?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  primaryContactPerson?: Maybe<Contact>;
  registeredAddress?: Maybe<BasicAddress>;
  stateOfIncorporation?: Maybe<Scalars['String']['output']>;
  totalNumberOfEmployees?: Maybe<Scalars['Int']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

export type Contact = {
  __typename?: 'Contact';
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
};

export type ContactInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCompany: UpdateCompanyResponse;
  updateCompany: UpdateCompanyResponse;
};


export type MutationCreateCompanyArgs = {
  input: UpdateCompanyInput;
};


export type MutationUpdateCompanyArgs = {
  companyId: Scalars['ID']['input'];
  input: UpdateCompanyInput;
};

export type Query = {
  __typename?: 'Query';
  getCompany: Company;
  getSignedDownloadUrl: SignedLinkData;
  getSignedUploadUrl: SignedLinkData;
};


export type QueryGetCompanyArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetSignedDownloadUrlArgs = {
  s3Key?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetSignedUploadUrlArgs = {
  input?: InputMaybe<SignedFileUploadInput>;
};

export type SignedFileUploadInput = {
  contentType: Scalars['String']['input'];
  fileName: Scalars['String']['input'];
};

export type SignedLinkData = {
  __typename?: 'SignedLinkData';
  key: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type UpdateCompanyInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  facebookCompanyPage?: InputMaybe<Scalars['String']['input']>;
  fax?: InputMaybe<Scalars['String']['input']>;
  industry?: InputMaybe<Scalars['String']['input']>;
  isMailingAddressDifferentFromRegisteredAddress?: InputMaybe<Scalars['Boolean']['input']>;
  legalName?: InputMaybe<Scalars['String']['input']>;
  linkedInCompanyPage?: InputMaybe<Scalars['String']['input']>;
  logoS3Key?: InputMaybe<Scalars['String']['input']>;
  mailingAddress?: InputMaybe<BasicAddressInput>;
  numberOfFullTimeEmployees?: InputMaybe<Scalars['Int']['input']>;
  numberOfPartTimeEmployees?: InputMaybe<Scalars['Int']['input']>;
  otherInformation?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  primaryContactPerson?: InputMaybe<ContactInput>;
  registeredAddress?: InputMaybe<BasicAddressInput>;
  stateOfIncorporation?: InputMaybe<Scalars['String']['input']>;
  totalNumberOfEmployees?: InputMaybe<Scalars['Int']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCompanyResponse = {
  __typename?: 'UpdateCompanyResponse';
  company: Company;
};
