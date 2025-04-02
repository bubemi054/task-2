// import React from "react";

// export interface HandleChangeEvent {
//   target: {
//     name: string;
//     value: string;
//   };
// }

// export interface HandleSubmitEvent {
//   preventDefault: () => void;
// }

// export interface PrimaryContactPerson {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
// }

// export interface Address {
//   country: string | null;
//   state: string | null;
//   city: string;
//   street: string;
//   zipCode: string;
// }

// export interface FormData {
//   legalName: string;
//   stateOfIncorporation: string;
//   industry: string;
//   totalNumberOfEmployees: string;
//   numberOfPartTimeEmployees: string;
//   numberOfFullTimeEmployees: string;
//   linkedInCompanyPage: string;
//   facebookCompanyPage: string;
//   website: string;
//   logoS3Key: string | null;
//   phone: string;
//   fax: string;
//   email: string;
//   otherInformation: string;
//   primaryContactPerson: PrimaryContactPerson;
//   registeredAddress: Address;
//   mailingAddress: Address;
//   isMailingAddressDifferentFromRegisteredAddress: boolean;
// }

// export interface HandleChangeEvent {
//   name: string;
//   value: any;
// }

// export interface HandleSubmitEvent extends React.FormEvent<HTMLFormElement> {}

// export interface CreateCompanyResponse {
//   createCompany: {
//     company: Record<string, any>;
//   };
// }

// export interface Company {
//   legalName: string;
//   industry: string;
//   email: string;
// }