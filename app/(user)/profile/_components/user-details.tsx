"use client";

import Image from "next/image";

import {IUser} from "@/models/userModel";
import {Badge} from "@/components/ui/badge";

interface UserDetailsProps {
  user: IUser;
}

const UserDetails = ({user}: UserDetailsProps) => {
  return (
    <div className="container mx-auto py-10">
      <div className="rounded-md border p-8 shadow-md dark:shadow-gray-400">
        <div className="flex flex-col items-center gap-4 pb-6">
          {user.image && (
            <Image
              src={user.image.url}
              alt={user.image.public_id}
              width={140}
              height={140}
              className="rounded-full object-cover border"
            />
          )}
          <div className="text-center">
            <h1 className="text-3xl font-bold capitalize">{user.name}</h1>
            <p className="text-muted-foreground">@{user.username}</p>
          </div>
          {user.role === "admin" && (
            <Badge className="px-3 py-1 text-sm bg-primary text-white dark:text-black">
              ADMIN
            </Badge>
          )}
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <ProfileItem label="Email" value={user.email} />
          <ProfileItem label="Mobile Number" value={user.mobileNumber} />
          <ProfileItem
            label="Date of Birth"
            value={new Date(user.dob).toLocaleDateString()}
          />
          <ProfileItem label="Gender" value={user.gender} />
          <ProfileItem label="City" value={user.city} />
          <ProfileItem label="State" value={user.state} />
          <ProfileItem label="Country" value={user.country} />
          <ProfileItem label="Zip Code" value={user.zip} />
          <ProfileItem label="Address" value={user.addressline} />
        </div>
        <div className="mt-8 pt-4 text-sm text-muted-foreground flex items-center justify-between">
          <p>Created: {new Date(user.createdAt).toLocaleDateString()}</p>
          <p>Updated: {new Date(user.updatedAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

interface ProfileItemProps {
  label: string;
  value?: string | number;
}

const ProfileItem = ({label, value}: ProfileItemProps) => {
  return (
    <div className="rounded-lg border p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-semibold capitalize">{value || "-"}</p>
    </div>
  );
};

export default UserDetails;
