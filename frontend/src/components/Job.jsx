import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";



const Job = () => {
    const navigate = useNavigate();
    const jobId= "asdfagrefgf";
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
        <div className="flex items-center gap-2 my-2">
        <p className="text-sm text-gray-500">2 days ago</p>
      <Button variant="outline" className="rounded-full" size="icon">
        <Bookmark />
      </Button>
        </div>
      
      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src="https://marketplace.canva.com/EAE0rNNM2Fg/1/0/1600w/canva-letter-c-trade-marketing-logo-design-template-r9VFYrbB35Y.jpg" />
          </Avatar>
        </Button>
        <div>
            <h1 className="font-md text-lg">Company Name</h1>
            <p className="text-sm text-gray-500">India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">Title</h1>
        <p className="text-sm text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem, labore.</p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <Badge className="text-blue-700 font-bold " variant="ghost"> 12 Positions</Badge>
        <Badge className="text-[#f83002] font-bold " variant="ghost"> Part Time</Badge>
        <Badge className="text-[#7209b7] font-bold " variant="ghost"> 24LPA</Badge>

    </div>
    <div className="flex items-center gap-4 mt-4">
        <Button onClick={()=> navigate(`/description/${jobId}`)} variant="outline">Details</Button>
        <Button className="bg-[#7209b7]">Save for later</Button>
    </div>
    </div>
  );
};

export default Job;
