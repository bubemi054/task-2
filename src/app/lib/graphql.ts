import { gql } from "@apollo/client";

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

export const GET_COMPANY = gql`
  query GetCompany($id: String) {
    getCompany(id: $id) {
      id
      legalName
      email
      phone
      industry
      website
      facebookCompanyPage
      linkedInCompanyPage
      fax
      logoS3Key
      numberOfFullTimeEmployees
      numberOfPartTimeEmployees
      totalNumberOfEmployees
      stateOfIncorporation
      otherInformation
      registeredAddress {
        street
        city
        state
        country
        zipCode
      }
      mailingAddress {
        street
        city
        state
        country
        zipCode
      }
      primaryContactPerson {
        firstName
        lastName
        email
        phone
      }
    }
  }
`;

export const GET_SIGNED_DOWNLOAD_URL = gql`
  query GetSignedDownloadUrl($s3Key: String) {
    getSignedDownloadUrl(s3Key: $s3Key) {
      url
      key
    }
  }
`;
