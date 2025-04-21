import { getMyJobs } from "@/api/apiJobs";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import JobCard from "./job-card";
import { useEffect } from "react";

const CreatedJobs = () => {
  const { user } = useUser();
  
  const {
    loading: loadingCreatedJobs,
    data: createdJobs,
    fn: fnCreatedJobs,
  } = useFetch(getMyJobs, {
    recruiter_id: user.id,
  });


  useEffect(() => {
    fnCreatedJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Jobs You’ve Posted</h1>
      {loadingCreatedJobs ? (
        <div className="flex justify-center items-center h-40">
          <BarLoader width={"100%"} color="#36d7b7" />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {createdJobs?.length ? (
            createdJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onJobAction={fnCreatedJobs}
                isMyJob
              />
            ))
          ) : (
            <div className="text-center text-gray-400 text-lg mt-10 col-span-full">
              No Jobs Found 😢
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreatedJobs;
