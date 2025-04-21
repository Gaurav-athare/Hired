import { getCompanies } from "@/api/apiCompanies";
import { addNewJob } from "@/api/apiJobs";
import AddCompanyDrawer from "@/components/add-company-drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import { State } from "country-state-city";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  location: z.string().min(1, { message: "Select a location" }),
  company_id: z.string().min(1, { message: "Select or Add a company" }),
  requirements: z.string().min(1, { message: "Requirements are required" }),
});

const PostJob = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { location: "", company_id: "", requirements: "" },
    resolver: zodResolver(schema),
  });

  const {
    loading: loadingCreateJob,
    error: errorCreateJob,
    data: dataCreateJob,
    fn: fnCreateJob,
  } = useFetch(addNewJob);

  const onSubmit = (data) => {
    fnCreateJob({
      ...data,
      recruiter_id: user.id,
      isOpen: true,
    });
  };

  const {
    loading: loadingCompanies,
    data: companies,
    fn: fnCompanies,
  } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);

  useEffect(() => {
    if (dataCreateJob?.length > 0) navigate("/jobs");
  }, [dataCreateJob]);

  if (!isLoaded || loadingCompanies) {
    return <BarLoader className="my-4" width={"100%"} color="#36d7b7" />;
  }

  if (user?.unsafeMetadata?.role !== "recruiter") {
    return <Navigate to="/jobs" />;
  }

  return (
    <div className="max-w-6xl mx-auto bg-gray-900 text-white shadow-xl rounded-xl p-8 mt-28">
      <h1 className="text-5xl sm:text-6xl font-bold text-center mb-10">
        Post a Job
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Title */}
        <div>
          <Input
            className="bg-gray-800 text-white border-gray-700"
            placeholder="Job Title"
            {...register("title")}
          />
          {errors.title && <p className="text-red-400 text-sm">{errors.title.message}</p>}
        </div>

        {/* Description */}
        <div>
          <Textarea
            className="bg-gray-800 text-white border-gray-700"
            placeholder="Job Description"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red-400 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Location and Company */}
        <div className="flex flex-col sm:flex-row gap-6">
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="bg-gray-800 text-white border-gray-700 w-full">
                  <SelectValue placeholder="Job Location" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 text-white">
                  <SelectGroup>
                    {State.getStatesOfCountry("IN").map(({ name }) => (
                      <SelectItem key={name} value={name}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          <Controller
            name="company_id"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="bg-gray-800 text-white border-gray-700 w-full">
                  <SelectValue placeholder="Company" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 text-white">
                  <SelectGroup>
                    {companies?.map(({ name, id }) => (
                      <SelectItem key={id} value={id}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* Add Company Drawer */}
        <div className="flex justify-end">
          <AddCompanyDrawer fetchCompanies={fnCompanies} />
        </div>

        {/* Location & Company Errors */}
        {errors.location && (
          <p className="text-red-400 text-sm">{errors.location.message}</p>
        )}
        {errors.company_id && (
          <p className="text-red-400 text-sm">{errors.company_id.message}</p>
        )}

        {/* Requirements */}
        <div className="border border-gray-700 rounded-md p-4 bg-gray-800">
          <Controller
            name="requirements"
            control={control}
            render={({ field }) => (
              <MDEditor
                value={field.value}
                onChange={field.onChange}
                preview="edit"
                height={200}
                className="!bg-gray-800 !text-white"
              />
            )}
          />
          {errors.requirements && (
            <p className="text-red-400 text-sm mt-2">{errors.requirements.message}</p>
          )}
        </div>

        {/* API Error */}
        {errorCreateJob?.message && (
          <p className="text-red-400">{errorCreateJob.message}</p>
        )}
        {loadingCreateJob && <BarLoader width={"100%"} color="#36d7b7" />}

        {/* Submit Button */}
        <Button type="submit" size="lg" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
          Submit Job
        </Button>
      </form>
    </div>
  );
};

export default PostJob;
