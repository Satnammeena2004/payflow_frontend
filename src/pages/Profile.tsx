import React, { useEffect, useState } from "react";
import { Mail, Phone, Camera, User as UserIcon } from "lucide-react";

import { User } from "../types/index.ts";
import { useUser } from "../services/queries.ts";
import { ProfileShimmer } from "../components/Shimmer.tsx";
import ErrorPage from "./ErrorPage.tsx";
export default function Profile() {
  const [isEditing] = useState(false);
  const { data, isLoading, error } = useUser();

  const [formData, setFormData] = useState<User>({
    name: "",
    email: "",
    phone: "",
    twoFactorEnabled: false,
    profilePicture: "",
    _id: "",
    balance: 0,
    account_id: {
      _id: "",
      balance: 0,
    },
  });

  useEffect(() => {
    setFormData({ ...(data?.data?.user as User) });
  }, [data?.data?.user]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // setIsEditing(false);
    // Add update logic here
  };

  if (error) {
    return <ErrorPage message="Can't fetch you profile details" />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8 dark:text-stone-200">
        Profile Settings
      </h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden dark:bg-rich_black-900 dark:border-none">
        {!isLoading ? (
          <div className="p-8">
            <div className="flex items-center space-x-6 mb-8">
              <div className="relative">
                <img
                  src={formData.profilePicture}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 rounded-full text-white hover:bg-indigo-700">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-stone-200">
                  {formData.name}
                </h2>
                <p className="text-gray-500 dark:text-stone-200 uppercase">Personal Account</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 ">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-stone-200">
                    Full Name
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      disabled={!isEditing}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500  dark-input"
                    />
                  </div>
                </div>

                <div className="">
                  <label className="block text-sm font-medium text-gray-700 dark:text-stone-200">
                    Email Address
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      disabled={!isEditing}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-stone-200">
                    Phone Number
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      disabled={!isEditing}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark-input"
                    />
                  </div>
                </div>
              </div>
              {/* 
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                {isEditing ? (
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                  >
                    Edit Profile
                  </button>
                )}
              </div> */}
            </form>
          </div>
        ) : (
          <ProfileShimmer />
        )}
      </div>

      {/* Security Settings */}
      {/* <div className="mt-8 bg-white dark:bg-rich_navy-600  dark:border-none  rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-stone-200">
            Security Settings
          </h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <Shield className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-stone-200">
                  Two-Factor Authentication
                </h3>
                <p className="text-sm text-gray-500 dark:text-stone-200">
                  Add an extra layer of security to your account
                </p>
              </div>
            </div>
            {!isLoading && (
              <div className="flex items-center">
                <button
                  onClick={() =>
                    setFormData({
                      ...formData,
                      twoFactorEnabled: !formData.twoFactorEnabled,
                    })
                  }
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                    formData.twoFactorEnabled ? "bg-indigo-600" : "bg-gray-200"
                  }`}
                  role="switch"
                  aria-checked={formData.twoFactorEnabled}
                >
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      formData.twoFactorEnabled
                        ? "translate-x-5"
                        : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            )}
          </div>

          <div>
            <button
              type="button"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-stone-200"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="mt-8  h-40 w-ful bg-gray-300/45 animate-pulse rounded-xl shadow-sm border border-gray-100 overflow-hidden"></div>
      )} */}
    </div>
  );
}
