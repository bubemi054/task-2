"use client";

import { Formik } from "formik";
import NavBar from "./navbar";
import FormInput from "./general/inputs/FormInput";
import { useApolloClient } from "@apollo/client";
import { useUserSessionCheck } from "../hooks/useCheckToken";
import { useCompany } from "../hooks/useCompany";

const ViewOrEditCompany = () => {
  useUserSessionCheck();

  const client = useApolloClient();
  const {
    formData,
    handleChange,
    handleSubmit,
    handleFileUpload,
    initialFormData,
    validate,
  } = useCompany(client);

  return (
    <div className="w-full overflow-hidden">
      <NavBar />
      <div className="w-[90%] mt-[50px] mb-[50px] m-auto">
        <div className="flex flex-col justify-start items-start">
          <h2 className="text-[48px] text-left font-bold">
            Company Information
          </h2>
          <p className="text-[16px] font-light">
            Fill out the form carefully for registration
          </p>
        </div>
        <div className="max-full mt-[50px] bg-white">
          <Formik
            initialValues={initialFormData}
            validate={validate}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-[30px]"
              >
                <div className="grid grid-cols-3 gap-4">
                  <FormInput
                    label="Legal Name"
                    name="legalName"
                    onChange={handleChange}
                    placeholder="e.g Example Corp"
                    type="text"
                    value={values.legalName || ""}
                    errorMessage={errors.legalName}
                  />

                  <FormInput
                    label="State of Incorporation"
                    name="stateOfIncorporation"
                    onChange={handleChange}
                    placeholder="e.g Delaware"
                    type="text"
                    value={values.stateOfIncorporation || ""}
                    errorMessage={errors.stateOfIncorporation}
                  />

                  <FormInput
                    label="Industry"
                    name="industry"
                    onChange={handleChange}
                    placeholder="e.g Software"
                    type="text"
                    value={values.industry || ""}
                    errorMessage={errors.industry}
                  />
                </div>

                {/* Employee Info */}
                <div className="grid grid-cols-3 gap-4">
                  <FormInput
                    label="Total Number Of Employees"
                    name="totalNumberOfEmployees"
                    onChange={handleChange}
                    placeholder="e.g 100"
                    type="number"
                    value={
                      values.totalNumberOfEmployees
                        ? String(values.totalNumberOfEmployees)
                        : "0"
                    }
                    errorMessage={errors.totalNumberOfEmployees}
                    optional={true}
                  />
                  <FormInput
                    label="Number Of Full-Time Employees"
                    name="numberOfFullTimeEmployees"
                    onChange={handleChange}
                    placeholder="e.g 100"
                    type="number"
                    value={
                      values.numberOfFullTimeEmployees
                        ? String(values.numberOfFullTimeEmployees)
                        : "0"
                    }
                    errorMessage={errors.numberOfFullTimeEmployees}
                    optional={true}
                  />

                  <FormInput
                    label="Number Of Part-Time Employees"
                    name="numberOfPartTimeEmployees"
                    onChange={handleChange}
                    placeholder="e.g 100"
                    type="number"
                    value={
                      values.numberOfPartTimeEmployees
                        ? String(values.numberOfPartTimeEmployees)
                        : "0"
                    }
                    errorMessage={errors.numberOfPartTimeEmployees}
                    optional={true}
                  />
                </div>

                {/* Social Links */}
                <div className="grid grid-cols-3 gap-4">
                  <FormInput
                    label="Website"
                    name="website"
                    onChange={handleChange}
                    placeholder="e.g https://example.com"
                    type="text"
                    value={values.website || ""}
                    errorMessage={errors.website}
                    optional={true}
                  />

                  <FormInput
                    label="LinkedIn Company Page"
                    name="linkedInCompanyPage"
                    onChange={handleChange}
                    placeholder="e.g https://linkedin.com/example"
                    type="text"
                    value={values.linkedInCompanyPage || ""}
                    errorMessage={errors.linkedInCompanyPage}
                    optional={true}
                  />

                  <FormInput
                    label="Facebook Page"
                    name="facebookCompanyPage"
                    onChange={handleChange}
                    placeholder="e.g https://facebook.com/example"
                    type="text"
                    value={values.facebookCompanyPage || ""}
                    errorMessage={errors.facebookCompanyPage}
                    optional={true}
                  />
                </div>

                {/* Contact Details */}
                <div className="grid grid-cols-3 gap-4">
                  <FormInput
                    label="Phone"
                    name="phone"
                    onChange={handleChange}
                    placeholder="e.g +1 (123) 456-7890"
                    type="text"
                    value={values.phone || ""}
                    errorMessage={errors.phone}
                    optional={true}
                  />
                  <FormInput
                    label="Fax"
                    name="fax"
                    onChange={handleChange}
                    placeholder="e.g +1 (123) 456-7890"
                    type="text"
                    value={values.fax || ""}
                    errorMessage={errors.fax}
                    optional={true}
                  />
                  <FormInput
                    label="Email"
                    name="email"
                    onChange={handleChange}
                    placeholder="e.g 6aVcM@example.com"
                    type="email"
                    value={values.email || ""}
                    errorMessage={errors.email}
                  />
                </div>

                {/* Others and Upload Image */}
                <div className="grid grid-cols-3 gap-4">
                  <FormInput
                    label="Other Information"
                    name="otherInformation"
                    onChange={handleChange}
                    type="text"
                    value={values.otherInformation || ""}
                    errorMessage={errors.otherInformation}
                    optional={true}
                  />
                  <FormInput
                    label="Upload File"
                    name="logoS3Key"
                    onChange={handleFileUpload}
                    type="file"
                    value={values.logoS3Key || ""}
                    errorMessage={errors.logoS3Key}
                    optional={true}
                  />
                </div>

                {/* Address */}
                <div className="flex flex-col gap-[30px] mt-[20px]">
                  <h3 className="text-lg font-semibold">
                    Primary Contact Person
                  </h3>

                  <div className="grid grid-cols-3 gap-4">
                    <FormInput
                      label="First Name"
                      name="primaryContactPerson.firstName"
                      onChange={handleChange}
                      type="text"
                      value={values?.primaryContactPerson?.firstName || ""}
                      // @ts-expect-error come back
                      errorMessage={errors.primaryContactPerson?.firstName}
                    />

                    <FormInput
                      label="Last Name"
                      name="primaryContactPerson.lastName"
                      onChange={handleChange}
                      type="text"
                      value={values?.primaryContactPerson?.lastName || ""}
                      // @ts-expect-error come back
                      errorMessage={errors.primaryContactPerson?.lastName}
                    />
                    <FormInput
                      label="Email"
                      name="email"
                      type="email"
                      onChange={handleChange}
                      value={values?.email || ""}
                      errorMessage={errors.email}
                      placeholder="e.g 6aVcM@example.com"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-[30px] mt-[20px]">
                  <h3 className="text-lg font-semibold">Registered Address</h3>

                  <div className="grid grid-cols-3 gap-4">
                    <FormInput
                      label="Country"
                      name="registeredAddress.country"
                      onChange={handleChange}
                      type="text"
                      placeholder="e.g United States"
                      // @ts-expect-error come back
                      errorMessage={errors?.registeredAddress?.country || ""}
                      // @ts-expect-error come back
                      value={formData?.registeredAddress?.country}
                    />
                    <FormInput
                      label="State"
                      name="registeredAddress.state"
                      onChange={handleChange}
                      type="text"
                      placeholder="e.g New York"
                      // @ts-expect-error come back
                      errorMessage={errors?.registeredAddress?.state || ""}
                      // @ts-expect-error come back
                      value={formData?.registeredAddress?.state}
                    />
                    <FormInput
                      label="City"
                      name="registeredAddress.city"
                      onChange={handleChange}
                      type="text"
                      placeholder="e.g New York"
                      // @ts-expect-error come back
                      errorMessage={errors?.registeredAddress?.city || ""}
                      // @ts-expect-error come back
                      value={formData?.registeredAddress?.city}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <FormInput
                      label="Street"
                      name="registeredAddress.street"
                      onChange={handleChange}
                      type="text"
                      placeholder="e.g 123 Main St"
                      // @ts-expect-error come back
                      errorMessage={errors?.registeredAddress?.street || ""}
                      // @ts-expect-error come back
                      value={formData?.registeredAddress?.street}
                    />

                    <FormInput
                      label="Zipcode"
                      name="registeredAddress.zipCode"
                      onChange={handleChange}
                      type="text"
                      placeholder="e.g 12345"
                      // @ts-expect-error come back
                      errorMessage={errors?.registeredAddress?.zipCode || ""}
                      // @ts-expect-error come back
                      value={formData?.registeredAddress?.zipCode}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-[30px] mt-[20px]">
                  <h3 className="text-lg font-semibold">Mailing Address</h3>

                  <div className="grid grid-cols-3 gap-4">
                    <FormInput
                      label="Country"
                      name="mailingAddress.country"
                      onChange={handleChange}
                      type="text"
                      placeholder="e.g United States"
                      value={formData?.mailingAddress?.country || ""}
                    />

                    <FormInput
                      label="State"
                      name="mailingAddress.state"
                      onChange={handleChange}
                      type="text"
                      placeholder="e.g New York"
                      value={formData?.mailingAddress?.state || ""}
                    />

                    <FormInput
                      label="City"
                      name="mailingAddress.city"
                      onChange={handleChange}
                      type="text"
                      placeholder="e.g New York"
                      value={formData?.mailingAddress?.city || ""}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <FormInput
                      label="Street"
                      name="mailingAddress.street"
                      onChange={handleChange}
                      type="text"
                      placeholder="e.g 123 Main St"
                      value={formData?.mailingAddress?.street || ""}
                    />

                    <FormInput
                      label="Zipcode"
                      name="mailingAddress.zipCode"
                      onChange={handleChange}
                      type="text"
                      placeholder="e.g 12345"
                      value={formData?.mailingAddress?.zipCode || ""}
                    />
                  </div>

                  {/* <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      onChange={handleChange}
                      checked={
                        formData.isMailingAddressDifferentFromRegisteredAddress
                      }
                      name="isMailingAddressDifferentFromRegisteredAddress"
                      // required
                    />
                    <label className="text-sm">
                      Use a different mailing address?
                    </label>
                  </div> */}
                </div>

                <button
                  type="submit"
                  className="w-[300px] bg-black text-white px-6 py-2 rounded-md hover:bg-blue-700"
                >
                  Submit
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ViewOrEditCompany;
