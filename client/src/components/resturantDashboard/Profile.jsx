import React from 'react';

const Profile = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded">Restaurant Info (name, address, contact)</div>
        <div className="p-4 border rounded">Manager Info / Documents</div>
      </div>
    </div>
  );
};

export default Profile;
