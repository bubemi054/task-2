"use client";

import NavBar from "./navbar";
import { useApolloClient } from "@apollo/client";
import { useUserSessionCheck } from "../hooks/checkToken";
import { useCreateCompanyForm } from "../hooks/createCompany";

const CompanyForm = () => {
  useUserSessionCheck();

  const client = useApolloClient();
  const { formData, handleChange, handleSubmit, handleFileUpload } =
    useCreateCompanyForm(client);

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
          <form onSubmit={handleSubmit} className="flex flex-col gap-[30px]">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block font-medium">Legal Name</label>
                <input
                  type="text"
                  name="legalName"
                  className="w-full border p-2 rounded"
                  onChange={handleChange}
                  value={formData.legalName}
                  required
                />
              </div>
              <div>
                <label className="block font-medium">
                  State of Incorporation
                </label>
                <input
                  type="text"
                  name="stateOfIncorporation"
                  className="w-full border p-2 rounded"
                  onChange={handleChange}
                  value={formData.stateOfIncorporation}
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Industry</label>
                <input
                  type="text"
                  name="industry"
                  className="w-full border p-2 rounded"
                  onChange={handleChange}
                  value={formData.industry}
                  required
                />
              </div>
            </div>

            {/* Employee Info */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block font-medium">
                  Total Number Of Employees
                </label>
                <input
                  type="number"
                  name="totalNumberOfEmployees"
                  className="w-full border p-2 rounded"
                  onChange={handleChange}
                  value={formData.totalNumberOfEmployees}
                  required
                />
              </div>
              <div>
                <label className="block font-medium">
                  Number Of Full-Time Employees
                </label>
                <input
                  type="number"
                  name="numberOfFullTimeEmployees"
                  className="w-full border p-2 rounded"
                  onChange={handleChange}
                  value={formData.numberOfFullTimeEmployees}
                  required
                />
              </div>
              <div>
                <label className="block font-medium">
                  Number Of Part-Time Employees
                </label>
                <input
                  type="number"
                  name="numberOfPartTimeEmployees"
                  className="w-full border p-2 rounded"
                  onChange={handleChange}
                  value={formData.numberOfPartTimeEmployees}
                  required
                />
              </div>
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block font-medium">Website</label>
                <input
                  type="text"
                  name="website"
                  className="w-full border p-2 rounded"
                  onChange={handleChange}
                  value={formData.website}
                  required
                />
              </div>
              <div>
                <label className="block font-medium">
                  LinkedIn Company Page
                </label>
                <input
                  type="text"
                  name="linkedInCompanyPage"
                  className="w-full border p-2 rounded"
                  onChange={handleChange}
                  value={formData.linkedInCompanyPage}
                  required
                />
              </div>
              <div>
                <label className="block font-medium">
                  Facebook Company Page
                </label>
                <input
                  type="text"
                  name="facebookCompanyPage"
                  className="w-full border p-2 rounded"
                  onChange={handleChange}
                  value={formData.facebookCompanyPage}
                  required
                />
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block font-medium">Phone</label>
                <input
                  type="text"
                  name="phone"
                  className="w-full border p-2 rounded"
                  onChange={handleChange}
                  value={formData.phone}
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Fax</label>
                <input
                  type="text"
                  name="fax"
                  className="w-full border p-2 rounded"
                  onChange={handleChange}
                  value={formData.fax}
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full border p-2 rounded"
                  onChange={handleChange}
                  value={formData.email}
                  required
                />
              </div>
            </div>

            {/* Others and Upload Image */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block font-medium">Other Information</label>
                <input
                  type="text"
                  name="otherInformation"
                  className="w-full border p-2 rounded"
                  onChange={handleChange}
                  value={formData.otherInformation}
                  required
                />
              </div>

              <div>
                <label className="block font-medium">Upload File</label>
                <input
                  type="file"
                  className="w-full border p-2 rounded"
                  onChange={handleFileUpload}
                  name="logoS3Key"
                  placeholder=""
                  required
                />
              </div>
            </div>

            {/* Address */}
            <div className="flex flex-col gap-[30px] mt-[20px]">
              <h3 className="text-lg font-semibold">Primary Contact Person</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium">First Name</label>
                  <input
                    type="text"
                    name="primaryContactPerson.firstName"
                    className="w-full border p-2 rounded"
                    onChange={handleChange}
                    value={formData.primaryContactPerson.firstName}
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium">Last Name</label>
                  <input
                    type="text"
                    name="primaryContactPerson.lastName"
                    className="w-full border p-2 rounded"
                    onChange={handleChange}
                    value={formData.primaryContactPerson.lastName}
                  required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium">Phone</label>
                  <input
                    type="text"
                    name="primaryContactPerson.phone"
                    className="w-full border p-2 rounded"
                    onChange={handleChange}
                    value={formData.primaryContactPerson.phone}
                  required
                  />
                </div>

                <div>
                  <label className="block font-medium">Email</label>
                  <input
                    type="text"
                    name="primaryContactPerson.email"
                    className="w-full border p-2 rounded"
                    onChange={handleChange}
                    value={formData.primaryContactPerson.email}
                  required
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[30px] mt-[20px]">
              <h3 className="text-lg font-semibold">Registered Address</h3>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-medium">Country</label>
                  <input
                    type="text"
                    name="registeredAddress.country"
                    placeholder="Country"
                    className="w-full border p-2 rounded"
                    onChange={handleChange}
                    value={formData.registeredAddress.country || ""}
                  required
                  />
                </div>

                <div>
                  <label className="block font-medium">State</label>
                  <input
                    type="text"
                    name="registeredAddress.state"
                    placeholder="State"
                    className="w-full border p-2 rounded"
                    onChange={handleChange}
                    value={formData.registeredAddress.state || ""}
                  required
                  />
                </div>

                <div>
                  <label className="block font-medium">City</label>
                  <input
                    type="text"
                    name="registeredAddress.city"
                    placeholder="City"
                    className="w-full border p-2 rounded"
                    onChange={handleChange}
                    value={formData.registeredAddress.city}
                  required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <label className="block font-medium">Street</label>
                  <input
                    type="text"
                    name="registeredAddress.street"
                    placeholder="Street"
                    className="w-full border p-2 rounded"
                    onChange={handleChange}
                    value={formData.registeredAddress.street}
                  required
                  />
                </div>

                <div>
                  <label className="block font-medium">Zipcode</label>
                  <input
                    type="text"
                    name="registeredAddress.zipCode"
                    placeholder="Zip Code"
                    className="w-full border p-2 rounded"
                    onChange={handleChange}
                    value={formData.registeredAddress.zipCode}
                  required
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[30px] mt-[20px]">
              <h3 className="text-lg font-semibold">Mailing Address</h3>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-medium">Country</label>
                  <input
                    type="text"
                    name="mailingAddress.country"
                    placeholder="Country"
                    className="w-full border p-2 rounded"
                    onChange={handleChange}
                    value={formData.mailingAddress.country || ""}
                  required
                  />
                </div>

                <div>
                  <label className="block font-medium">State</label>
                  <input
                    type="text"
                    name="mailingAddress.state"
                    placeholder="State"
                    className="w-full border p-2 rounded"
                    onChange={handleChange}
                    value={formData.mailingAddress.state || ""}
                  required
                  />
                </div>

                <div>
                  <label className="block font-medium">City</label>
                  <input
                    type="text"
                    name="mailingAddress.city"
                    placeholder="City"
                    className="w-full border p-2 rounded"
                    onChange={handleChange}
                    value={formData.mailingAddress.city}
                  required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <label className="block font-medium">Street</label>
                  <input
                    type="text"
                    name="mailingAddress.street"
                    placeholder="Street"
                    className="w-full border p-2 rounded"
                    onChange={handleChange}
                    value={formData.mailingAddress.street}
                  required
                  />
                </div>

                <div>
                  <label className="block font-medium">Zipcode</label>
                  <input
                    type="text"
                    name="mailingAddress.zipCode"
                    placeholder="Zip Code"
                    className="w-full border p-2 rounded"
                    onChange={handleChange}
                    value={formData.mailingAddress.zipCode}
                  required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
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
              </div>
            </div>

            <button
              type="submit"
              className="w-[300px] bg-black text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyForm;
