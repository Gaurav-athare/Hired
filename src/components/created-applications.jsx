import { useUser } from "@clerk/clerk-react";
import ApplicationCard from "./application-card";
import { useEffect } from "react";
import { getApplications } from "@/api/apiApplication";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";

const CreatedApplications = () => {
  const { user } = useUser();

  const {
    loading: loadingApplications,
    data: applications,
    fn: fnApplications,
  } = useFetch(getApplications, {
    user_id: user.id,
  });

  useEffect(() => {
    fnApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loadingApplications) {
    return (
      <div className="flex justify-center items-center h-40 bg-gray-900">
        <BarLoader color="#36d7b7" />
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Your Applications</h1>
      {applications?.length > 0 ? (
        <div className="flex flex-col gap-4">
          {applications.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
              isCandidate={true}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 text-lg mt-10">
          You haven’t applied to any jobs yet. 🚀
        </div>
      )}
    </div>
  );
};

export default CreatedApplications;
