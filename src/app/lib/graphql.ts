import { gql } from "@apollo/client";
import {
  QueryGetSignedUploadUrlArgs,
  MutationCreateCompanyArgs,
  SignedLinkData,
  UpdateCompanyResponse,
} from "./graphql-types";

export const GET_SIGNED_UPLOAD_URL = gql`
  query GetSignedUploadUrl($input: SignedFileUploadInput!) {
    getSignedUploadUrl(input: $input) {
      url
      key
    }
  }
`;

export const CREATE_COMPANY = gql`
  mutation CreateCompany($input: UpdateCompanyInput!) {
    createCompany(input: $input) {
      company {
        id
        legalName
        stateOfIncorporation
        industry
        totalNumberOfEmployees
        numberOfFullTimeEmployees
        numberOfPartTimeEmployees
        website
        linkedInCompanyPage
        facebookCompanyPage
        otherInformation
        primaryContactPerson {
          firstName
          lastName
          email
          phone
        }
        logoS3Key
        phone
        fax
        email
        registeredAddress {
          country
          state
          city
          street
          zipCode
        }
        mailingAddress {
          country
          state
          city
          street
          zipCode
        }
      }
    }
  }
`;

export type GetSignedUploadUrlResponse = {
  getSignedUploadUrl: SignedLinkData;
};

export type GetSignedUploadUrlVariables = QueryGetSignedUploadUrlArgs;

export type CreateCompanyResponse = {
  createCompany: UpdateCompanyResponse;
};

export type CreateCompanyVariables = MutationCreateCompanyArgs;
