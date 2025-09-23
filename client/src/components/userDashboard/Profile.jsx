import React, { useState } from "react";
import { useAuth } from "../../context/authContext";

import { FaUserSlash, FaUserEdit } from "react-icons/fa";
import { GoPasskeyFill } from "react-icons/go";
import ResetPassword from "./modals/ResetPassword";
import EditProfileModal from "./modals/EditProfileModal";

const Profile = () => {
  const { user } = useAuth();

  const [isResetPassModalOpen, setIsResetPassModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  return (
    <>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-base-200 rounded-lg shadow-lg p-8 flex justify-between gap-5">
          {/* Profile Picture Section */}
          <div>
            <div className="flex flex-col items-center mb-8">
              <div className="avatar">
                <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={user.photo} alt={user.fullName} />
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-base-content">
                  {user.fullName}
                </h3>
                <p className="text-base-content/70">{user.email}</p>
              </div>
            </div>
          </div>
          <div className="bg-base-100 w-full">
            <div className="space-y-6 p-6">
              <div className="flex gap-3">
                <label className="block font-medium text-base-content mb-1">
                  Gender:
                </label>
                <span className="text-base-content">
                  {user.gender.toUpperCase() || "N/A"}
                </span>
              </div>
              <div className="flex gap-3">
                <label className="block font-medium text-base-content mb-1">
                  Phone Number:
                </label>
                <span className="text-base-content">{user.phone || "N/A"}</span>
              </div>
              <div className="flex gap-3">
                <label className="block font-medium text-base-content mb-1">
                  Date of Birth:
                </label>
                <span className="text-base-content">{user.dob || "N/A"}</span>
              </div>
              <div className="flex gap-3">
                <label className="block font-medium text-base-content mb-1">
                  Food Type:
                </label>
                <span className="text-base-content">
                  {user.foodType.toUpperCase() || "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-8">
          <button className="btn btn-error flex items-center gap-2">
            <FaUserSlash />
            <span>Deactivate</span>
          </button>
          <button
            className="btn btn-primary flex items-center gap-2"
            onClick={() => setIsEditProfileModalOpen(true)}
          >
            <FaUserEdit />
            <span>Edit Profile</span>
          </button>
          <button
            className="btn btn-secondary flex items-center gap-2"
            onClick={() => setIsResetPassModalOpen(true)}
          >
            <GoPasskeyFill />
            <span>Reset Password</span>
          </button>
        </div>
      </div>

      <ResetPassword
        isOpen={isResetPassModalOpen}
        onClose={() => setIsResetPassModalOpen(false)}
      />

      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={() => setIsEditProfileModalOpen(false)}
      />
    </>
  );
};

export default Profile;
