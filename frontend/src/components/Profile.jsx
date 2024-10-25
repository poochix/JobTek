import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Contact, Mail, Pen } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./appliedJobTable";
import UpdateProfile from "./UpdateProfile";
import { useSelector } from "react-redux";

// const skills = ["Html", "Css", "Java", "React"];
const isResume = true;

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://marketplace.canva.com/EAE0rNNM2Fg/1/0/1600w/canva-letter-c-trade-marketing-logo-design-template-r9VFYrbB35Y.jpg" />
            </Avatar>
            <div>
              <h1 className="font-md text-xl">{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right mt-7"
            variant="outline"
            size="icon"
          >
            <Pen />
          </Button>
        </div>

        <div className="my-2">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span className="text-sm">{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span className="text-sm">{user?.phoneNumber}</span>
          </div>
        </div>
        <div>
          <h1 className="font-bold">{user?.skills}</h1>
          <div className="flex items-center gap-2 my-2">
            {/* {Array.isArray(user?.profile?.skills)
              ? user?.profile?.skills.map((item, index) => (
                  <Badge key={index}>{item}</Badge>
                ))
              : JSON.parse(user?.profile?.skills || "[]").map((item, index) => (
                  <Badge key={index}>{item}</Badge>
                ))} */}
            {user?.profile?.skills?.length > 0 ? (
              user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>)
            ) : (
              <span>NA</span>
            )}
          </div>  
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>

          {isResume ? (
            <a
              target="blank"
              href={user?.profile?.resume}
              className="text-sm text-blue-800 w-full hover:underline cursor-pointer"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg my-3">Applied Jobs</h1>
        {/* Application Table */}
        <AppliedJobTable />
      </div>

      <div>
        <UpdateProfile open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default Profile;
