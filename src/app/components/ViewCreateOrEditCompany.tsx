"use client";

import { Formik } from "formik";
import FormInput from "./general/inputs/FormInput";
import Header1 from "./general/headers/Header1";
import Heading2 from "./general/headers/Heading2";
import Paragraph1 from "./general/paragraph/Paragraph1";
import Button2 from "./general/buttons/Button2";
import Checkbox1 from "./general/checkboxes/Checkbox1";
import Image1 from "./general/images/Image1";
import { FaSpinner } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useSearchParams } from "next/navigation";
import { useApolloClient } from "@apollo/client";
import { useUserSessionChecker } from "../hooks/useUserSessionChecker";
import { useCreateOrEditCompany } from "../hooks/useCreateOrEditCompany";

const ViewCreateOrEditCompany = () => {
  useUserSessionChecker();

  const searchParams = useSearchParams();
  const companyID = searchParams.get("companyID");
  const client = useApolloClient();
  const {
    formData,
    handleCreate,
    handleUpdate,
    handleFileUpload,
    validate,
    accept,
    formMode,
    fileIsSaving,
    fetchingCompany,
    getFileImage,
    extractFilename,
    viewImg,
    setViewImg,
  } = useCreateOrEditCompany(client, companyID);

  if (fetchingCompany) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <FaSpinner size={50} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      <div className="w-[90%] mt-[50px] mb-[50px] m-auto">
        <div className="max-full mt-[50px] bg-white">
          <Formik
            initialValues={formData}
            validate={validate}
            onSubmit={formMode == "create" ? handleCreate : handleUpdate}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue,
              dirty,
              isValid,
            }) => {
              const handleMailingAddress = (
                e: React.ChangeEvent<HTMLInputElement>
              ) => {
                const { name, value } = e.target;

                setFieldValue(name, value);

                if (values.isMailingAddressDifferentFromRegisteredAddress)
                  return;

                // @eslint-disable-next-line
                const pieces = name.split(".");

                if (pieces.length < 2) return;

                const innerName = pieces[1];

                console.log({ name, value });

                setFieldValue(
                  "mailingAddress.country",
                  innerName == "country"
                    ? value
                    : values?.registeredAddress?.country
                );
                setFieldValue(
                  "mailingAddress.state",
                  innerName == "state"
                    ? value
                    : values?.registeredAddress?.state
                );
                setFieldValue(
                  "mailingAddress.city",
                  innerName == "city" ? value : values?.registeredAddress?.city
                );
                setFieldValue(
                  "mailingAddress.street",
                  innerName == "street"
                    ? value
                    : values?.registeredAddress?.street
                );
                setFieldValue(
                  "mailingAddress.zipCode",
                  innerName == "zipCode"
                    ? value
                    : values?.registeredAddress?.zipCode
                );
              };

              const handleToggleIsMailingAddressDifferentFromRegisteredAddress =
                (e: React.ChangeEvent<HTMLInputElement>) => {
                  const { name, checked } = e.target;

                  setFieldValue(name, checked);

                  if (checked) {
                    setFieldValue("mailingAddress.country", "");
                    setFieldValue("mailingAddress.state", "");
                    setFieldValue("mailingAddress.city", "");
                    setFieldValue("mailingAddress.street", "");
                    setFieldValue("mailingAddress.zipCode", "");
                  } else {
                    setFieldValue(
                      "mailingAddress.country",
                      values?.registeredAddress?.country
                    );
                    setFieldValue(
                      "mailingAddress.state",
                      values?.registeredAddress?.state
                    );
                    setFieldValue(
                      "mailingAddress.city",
                      values?.registeredAddress?.city
                    );
                    setFieldValue(
                      "mailingAddress.street",
                      values?.registeredAddress?.street
                    );
                    setFieldValue(
                      "mailingAddress.zipCode",
                      values?.registeredAddress?.zipCode
                    );
                  }
                };

              const canSubmit = isValid && dirty;

              // console.log(errors);

              return (
                <>
                  <div className="flex flex-col justify-start items-start mb-[30px]">
                    <Header1 className="mb-[10px]">Company Information</Header1>
                    {formMode == "edit" && (
                      <Paragraph1 className="">ID: #{companyID}</Paragraph1>
                    )}
                    {formMode == "create" && (
                      <Paragraph1 className="">
                        Fill out the form carefully for registration
                      </Paragraph1>
                    )}
                  </div>
                  {viewImg && (
                    <div className="w-full h-[100vh] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-5 bg-black flex justify-center items-center">
                      <IoMdClose
                        className="text-[30px] text-white absolute top-4 right-4 z-5 cursor-pointer"
                        onClick={() => setViewImg(false)}
                      />
                      <Image1
                        logoS3Key={values.logoS3Key || ""}
                        getFileImage={getFileImage}
                        alt="company logo"
                      />
                    </div>
                  )}
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-[30px]"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      <FormInput
                        label="Legal Name"
                        name="legalName"
                        onChange={handleChange}
                        placeholder="e.g Example Corp"
                        type="text"
                        value={values.legalName || ""}
                        handleBlur={handleBlur}
                        errorMessage={
                          errors.legalName &&
                          touched.legalName &&
                          errors.legalName
                        }
                        required
                      />

                      <FormInput
                        label="State of Incorporation"
                        name="stateOfIncorporation"
                        onChange={handleChange}
                        placeholder="e.g Delaware"
                        type="text"
                        value={values.stateOfIncorporation || ""}
                        handleBlur={handleBlur}
                        errorMessage={
                          errors.stateOfIncorporation &&
                          touched.stateOfIncorporation &&
                          errors.stateOfIncorporation
                        }
                        required
                      />

                      <FormInput
                        label="Industry"
                        name="industry"
                        onChange={handleChange}
                        placeholder="e.g Software"
                        type="text"
                        value={values.industry || ""}
                        handleBlur={handleBlur}
                        errorMessage={
                          errors.industry && touched.industry && errors.industry
                        }
                        required
                      />
                    </div>

                    {/* Employee Info */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
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
                        handleBlur={handleBlur}
                        errorMessage={
                          errors.totalNumberOfEmployees &&
                          touched.totalNumberOfEmployees &&
                          errors.totalNumberOfEmployees
                        }
                        required
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
                        handleBlur={handleBlur}
                        errorMessage={
                          errors.numberOfFullTimeEmployees &&
                          touched.numberOfFullTimeEmployees &&
                          errors.numberOfFullTimeEmployees
                        }
                        required
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
                        handleBlur={handleBlur}
                        errorMessage={
                          errors.numberOfPartTimeEmployees &&
                          touched.numberOfPartTimeEmployees &&
                          errors.numberOfPartTimeEmployees
                        }
                        required
                      />
                    </div>

                    {/* Social Links */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      <FormInput
                        label="Website"
                        name="website"
                        onChange={handleChange}
                        placeholder="e.g https://example.com"
                        type="text"
                        value={values.website || ""}
                        handleBlur={handleBlur}
                        errorMessage={
                          errors.website && touched.website && errors.website
                        }
                        required
                      />

                      <FormInput
                        label="LinkedIn Company Page"
                        name="linkedInCompanyPage"
                        onChange={handleChange}
                        placeholder="e.g https://linkedin.com/example"
                        type="text"
                        value={values.linkedInCompanyPage || ""}
                        handleBlur={handleBlur}
                        errorMessage={
                          errors.linkedInCompanyPage &&
                          touched.linkedInCompanyPage &&
                          errors.linkedInCompanyPage
                        }
                        required
                      />

                      <FormInput
                        label="Facebook Page"
                        name="facebookCompanyPage"
                        onChange={handleChange}
                        placeholder="e.g https://facebook.com/example"
                        type="text"
                        value={values.facebookCompanyPage || ""}
                        handleBlur={handleBlur}
                        errorMessage={
                          errors.facebookCompanyPage &&
                          touched.facebookCompanyPage &&
                          errors.facebookCompanyPage
                        }
                        required
                      />
                    </div>

                    {/* Contact Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      <FormInput
                        label="Phone"
                        name="phone"
                        onChange={handleChange}
                        placeholder="e.g +1 (123) 456-7890"
                        type="text"
                        value={values.phone || ""}
                        handleBlur={handleBlur}
                        errorMessage={
                          errors.phone && touched.phone && errors.phone
                        }
                        required
                      />
                      <FormInput
                        label="Fax"
                        name="fax"
                        onChange={handleChange}
                        placeholder="e.g +1-800-555-1234"
                        type="text"
                        value={values.fax || ""}
                        handleBlur={handleBlur}
                        errorMessage={errors.fax && touched.fax && errors.fax}
                        required
                      />
                      <FormInput
                        label="Email"
                        name="email"
                        onChange={handleChange}
                        placeholder="e.g 6aVcM@example.com"
                        type="email"
                        value={values.email || ""}
                        handleBlur={handleBlur}
                        errorMessage={
                          errors.email && touched.email && errors.email
                        }
                        required
                      />
                    </div>

                    {/* Others and Upload Image */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      <FormInput
                        label="Other Information"
                        name="otherInformation"
                        onChange={handleChange}
                        type="text"
                        value={values.otherInformation || ""}
                        handleBlur={handleBlur}
                        errorMessage={
                          errors.otherInformation &&
                          touched.otherInformation &&
                          errors.otherInformation
                        }
                        required
                      />
                      <FormInput
                        label="Upload File"
                        name="logoS3Key"
                        onChange={(e) => handleFileUpload(e, setFieldValue)}
                        type="file"
                        value={values.logoS3Key || ""}
                        handleBlur={handleBlur}
                        loading={fileIsSaving}
                        errorMessage={errors.logoS3Key}
                        accept={accept}
                        extractFilename={extractFilename}
                        required
                        setViewImg={() => setViewImg(true)}
                      />
                    </div>

                    {/* Address */}
                    <div className="flex flex-col gap-[30px] mt-[20px]">
                      <Heading2>Primary Contact Person</Heading2>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <FormInput
                          label="First Name"
                          name="primaryContactPerson.firstName"
                          onChange={handleChange}
                          type="text"
                          value={values?.primaryContactPerson?.firstName || ""}
                          handleBlur={handleBlur}
                          placeholder="e.g John"
                          errorMessage={
                            // @ts-expect-error come back
                            errors.primaryContactPerson?.firstName &&
                            // @ts-expect-error come back
                            touched.primaryContactPerson?.firstName &&
                            // @ts-expect-error come back
                            errors.primaryContactPerson?.firstName
                          }
                          required
                        />

                        <FormInput
                          label="Last Name"
                          name="primaryContactPerson.lastName"
                          onChange={handleChange}
                          type="text"
                          value={values?.primaryContactPerson?.lastName || ""}
                          handleBlur={handleBlur}
                          placeholder="e.g Doe"
                          errorMessage={
                            // @ts-expect-error come back
                            errors.primaryContactPerson?.lastName &&
                            // @ts-expect-error come back
                            touched.primaryContactPerson?.lastName &&
                            // @ts-expect-error come back
                            errors.primaryContactPerson?.lastName
                          }
                          required
                        />
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <FormInput
                          label="Email"
                          name="primaryContactPerson.email"
                          type="email"
                          onChange={handleChange}
                          value={values?.primaryContactPerson?.email || ""}
                          handleBlur={handleBlur}
                          placeholder="e.g 6aVcM@example.com"
                          errorMessage={
                            // @ts-expect-error come back
                            errors.primaryContactPerson?.email &&
                            // @ts-expect-error come back
                            touched.primaryContactPerson?.email &&
                            // @ts-expect-error come back
                            errors.primaryContactPerson?.email
                          }
                          required
                        />

                        <FormInput
                          label="Phone"
                          name="primaryContactPerson.phone"
                          onChange={handleChange}
                          type="text"
                          value={values?.primaryContactPerson?.phone || ""}
                          handleBlur={handleBlur}
                          placeholder="e.g +1 (123) 456-7890"
                          errorMessage={
                            // @ts-expect-error come back
                            errors.primaryContactPerson?.phone &&
                            // @ts-expect-error come back
                            touched.primaryContactPerson?.phone &&
                            // @ts-expect-error come back
                            errors.primaryContactPerson?.phone
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-[30px] mt-[20px]">
                      <Heading2>Registered Address</Heading2>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <FormInput
                          label="Country"
                          name="registeredAddress.country"
                          onChange={handleMailingAddress}
                          type="text"
                          placeholder="e.g United States"
                          errorMessage={
                            // @ts-expect-error come back
                            errors?.registeredAddress?.country &&
                            // @ts-expect-error come back
                            touched?.registeredAddress?.country &&
                            // @ts-expect-error come back
                            errors?.registeredAddress?.country
                          }
                          handleBlur={handleBlur}
                          value={values?.registeredAddress?.country || ""}
                          required
                        />
                        <FormInput
                          label="State"
                          name="registeredAddress.state"
                          onChange={handleMailingAddress}
                          type="text"
                          placeholder="e.g New York"
                          handleBlur={handleBlur}
                          errorMessage={
                            values.isMailingAddressDifferentFromRegisteredAddress &&
                            // @ts-expect-error come back
                            errors?.registeredAddress?.state &&
                            // @ts-expect-error come back
                            touched?.registeredAddress?.state &&
                            // @ts-expect-error come back
                            errors?.registeredAddress?.state
                          }
                          value={values?.registeredAddress?.state || ""}
                          required
                        />
                        <FormInput
                          label="City"
                          name="registeredAddress.city"
                          onChange={handleMailingAddress}
                          type="text"
                          placeholder="e.g New York"
                          handleBlur={handleBlur}
                          errorMessage={
                            // @ts-expect-error come back
                            errors?.registeredAddress?.city &&
                            // @ts-expect-error come back
                            touched?.registeredAddress?.city &&
                            // @ts-expect-error come back
                            errors?.registeredAddress?.city
                          }
                          value={values?.registeredAddress?.city || ""}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <FormInput
                          label="Street"
                          name="registeredAddress.street"
                          onChange={handleMailingAddress}
                          type="text"
                          placeholder="e.g 123 Main St"
                          handleBlur={handleBlur}
                          errorMessage={
                            // @ts-expect-error come back
                            errors?.registeredAddress?.street &&
                            // @ts-expect-error come back
                            touched?.registeredAddress?.street &&
                            // @ts-expect-error come back
                            errors?.registeredAddress?.street
                          }
                          value={values?.registeredAddress?.street || ""}
                          required
                        />

                        <FormInput
                          label="Zipcode"
                          name="registeredAddress.zipCode"
                          onChange={handleMailingAddress}
                          type="text"
                          placeholder="e.g 12345"
                          handleBlur={handleBlur}
                          errorMessage={
                            // @ts-expect-error come back
                            errors?.registeredAddress?.zipCode &&
                            // @ts-expect-error come back
                            touched?.registeredAddress?.zipCode &&
                            // @ts-expect-error come back
                            errors?.registeredAddress?.zipCode
                          }
                          value={values?.registeredAddress?.zipCode || ""}
                          required
                        />
                      </div>
                    </div>

                    <Checkbox1
                      onChange={
                        handleToggleIsMailingAddressDifferentFromRegisteredAddress
                      }
                      name="isMailingAddressDifferentFromRegisteredAddress"
                      checked={
                        values.isMailingAddressDifferentFromRegisteredAddress ||
                        false
                      }
                      label="Is mailing address different from registered address?"
                      className="mt-[20px]"
                    />

                    <div className="flex flex-col gap-[30px] mt-[20px]">
                      <Heading2>Mailing Address</Heading2>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <FormInput
                          label="Country"
                          name="mailingAddress.country"
                          onChange={handleChange}
                          type="text"
                          handleBlur={handleBlur}
                          placeholder="e.g United States"
                          value={values?.mailingAddress?.country || ""}
                          errorMessage={
                            values.isMailingAddressDifferentFromRegisteredAddress &&
                            // @ts-expect-error come back
                            errors?.mailingAddress?.country &&
                            // @ts-expect-error come back
                            touched?.mailingAddress?.country &&
                            // @ts-expect-error come back
                            errors?.mailingAddress?.country
                          }
                          disabled={
                            !values.isMailingAddressDifferentFromRegisteredAddress
                          }
                          required
                        />

                        <FormInput
                          label="State"
                          name="mailingAddress.state"
                          onChange={handleChange}
                          type="text"
                          handleBlur={handleBlur}
                          placeholder="e.g New York"
                          value={values?.mailingAddress?.state || ""}
                          errorMessage={
                            values.isMailingAddressDifferentFromRegisteredAddress &&
                            // @ts-expect-error come back
                            errors?.mailingAddress?.state &&
                            // @ts-expect-error come back
                            touched?.mailingAddress?.state &&
                            // @ts-expect-error come back
                            errors?.mailingAddress?.state
                          }
                          disabled={
                            !values.isMailingAddressDifferentFromRegisteredAddress
                          }
                          required
                        />

                        <FormInput
                          label="City"
                          name="mailingAddress.city"
                          onChange={handleChange}
                          type="text"
                          handleBlur={handleBlur}
                          placeholder="e.g New York"
                          value={values?.mailingAddress?.city || ""}
                          errorMessage={
                            values.isMailingAddressDifferentFromRegisteredAddress &&
                            // @ts-expect-error come back
                            errors?.mailingAddress?.city &&
                            // @ts-expect-error come back
                            touched?.mailingAddress?.city &&
                            // @ts-expect-error come back
                            errors?.mailingAddress?.city
                          }
                          disabled={
                            !values.isMailingAddressDifferentFromRegisteredAddress
                          }
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <FormInput
                          label="Street"
                          name="mailingAddress.street"
                          onChange={handleChange}
                          type="text"
                          placeholder="e.g 123 Main St"
                          value={values?.mailingAddress?.street || ""}
                          handleBlur={handleBlur}
                          errorMessage={
                            values.isMailingAddressDifferentFromRegisteredAddress &&
                            // @ts-expect-error come back
                            errors?.mailingAddress?.street &&
                            // @ts-expect-error come back
                            touched?.mailingAddress?.street &&
                            // @ts-expect-error come back
                            errors?.mailingAddress?.street
                          }
                          disabled={
                            !values.isMailingAddressDifferentFromRegisteredAddress
                          }
                          required
                        />

                        <FormInput
                          label="Zipcode"
                          name="mailingAddress.zipCode"
                          onChange={handleChange}
                          type="text"
                          placeholder="e.g 12345"
                          value={values?.mailingAddress?.zipCode || ""}
                          handleBlur={handleBlur}
                          errorMessage={
                            values.isMailingAddressDifferentFromRegisteredAddress &&
                            // @ts-expect-error come back
                            errors?.mailingAddress?.zipCode &&
                            // @ts-expect-error come back
                            touched?.mailingAddress?.zipCode &&
                            // @ts-expect-error come back
                            errors?.mailingAddress?.zipCode
                          }
                          disabled={
                            !values.isMailingAddressDifferentFromRegisteredAddress
                          }
                          required
                        />
                      </div>
                    </div>

                    {formMode == "create" && (
                      <Button2
                        type="submit"
                        disabled={!canSubmit || isSubmitting || fileIsSaving}
                      >
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </Button2>
                    )}
                    {formMode == "edit" && (
                      <Button2
                        type="submit"
                        disabled={!canSubmit || isSubmitting || fileIsSaving}
                      >
                        {isSubmitting ? "Updating..." : "Update"}
                      </Button2>
                    )}
                  </form>
                </>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ViewCreateOrEditCompany;
