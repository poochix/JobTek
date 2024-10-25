import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/authSlice";

const UpdateProfile = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    // skills: user?.profile?.skills?.map(skill => skill),
    skills:
      typeof user?.profile?.skills === "string"
        ? user.profile.skills.split(" ").map((skill) => skill) // Split by space, then map
        : user?.profile?.skills?.map((skill) => skill), // If already an array, map directly
    file: user?.profile?.resume,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log(res.data); // Inspect the API response

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  // const submitHandler = async (e)=>{
  //     e.preventDefault();
  //     console.log(input);

  //     const formData = new FormData();
  //     formData.append("fullname", input.fullname);
  //     formData.append("email", input.email);
  //     formData.append("phoneNumber", input.phoneNumber);
  //     formData.append("bio", input.bio);
  //     formData.append("skills", JSON.stringify(input.skills));

  //     if(input.file){
  //         formData.append("file", input.file);
  //     }

  //     try {

  //         const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
  //             headers:{
  //                 'Content-Type':'multipart/form-data'
  //             },
  //             withCredentials:true
  //         });

  //         if(res.data.success){
  //             dispatch(setUser(res.data.user));
  //             toast.success(res.data.message);
  //         }

  //     } catch (error) {
  //         console.log(error);
  //         toast.error(error.response.data.message)
  //     }
  //     setOpen(false);
  //     console.log(input);

  // }
  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
            <DialogDescription>
              Please fill in the details below to update your profile
              information.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fullname" className="text-right">
                  Name
                </Label>
                <Input
                  id="fullname"
                  name="fullname"
                  type="text"
                  value={input.fullname}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phoneNumber" className="text-right">
                  Number
                </Label>
                <Input
                  id="PhoneNumber"
                  name="phoneNumber"
                  type="number"
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                  Bio
                </Label>
                <Input
                  id="bio"
                  name="bio"
                  type="text"
                  value={input.bio || ""}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" className="text-right">
                  Skills
                </Label>
                <Input
                  id="skills"
                  name="skills"
                  value={input.skills}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />

                {/* <textarea
                  id="skills"
                  name="skills"
                  value={input.skills.join(" ")} // Display as a space-separated string
                  onChange={(e) =>
                    setInput({ ...input, skills: e.target.value.split(" ") })
                  }
                  className="col-span-3"
                  placeholder="Enter skills separated by spaces"
                /> */}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">
                  Resume
                </Label>
                <Input
                  id="file"
                  name="file"
                  onChange={fileChangeHandler}
                  type="file"
                  accept="application/pdf"
                  className="col-span-3"
                />
              </div>
            </div>
            <div>
              <DialogFooter>
                {loading ? (
                  <Button className="w-full my-4">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    wait
                  </Button>
                ) : (
                  <Button type="submit" className="w-full my-4">
                    Update
                  </Button>
                )}
              </DialogFooter>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfile;
