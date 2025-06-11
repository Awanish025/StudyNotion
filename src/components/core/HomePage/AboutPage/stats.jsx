import React from "react";

const stats=[
    {count: "5K", label: "Active Students"},
    {count: "10+", label: "Mentors"},
    {count: "200+", label: "Courses"},
    {count: "50+", label: "Awards"},
];

const StatsComponent =()=>{
    return(
      <section className="bg-richblack-700">
          <div className=" gap-10 flex flex-col  w-11/12 max-w-maxContent mx-auto justify-between ">
            <div className="grid grid-cols-2 md:grid-cols-4 text-center">
                {
                  stats.map( (data , ind) =>{
                    return (
                         <div key={ind} className="flex flex-col py-10">
                           <div className="text-richblack-5 font-bold  text-[30px]" > {data.count}</div>
                           <div className="text-richblack-300 ">{data.label} </div>
                            
                         </div>   
                    )
                  }

               ) }
                
            </div>

        </div>
      </section>
    )
}
export default StatsComponent;