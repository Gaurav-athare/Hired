/* eslint-disable react/prop-types */
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer";
  import { Button } from "./ui/button";
  import { Input } from "./ui/input";
  import { z } from "zod";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { useForm } from "react-hook-form";
  import useFetch from "@/hooks/use-fetch";
  import { addNewCompany } from "@/api/apiCompanies";
  import { BarLoader } from "react-spinners";
  import { useEffect } from "react";
  
  const schema = z.object({
    name: z.string().min(1, { message: "Company name is required" }),
    logo: z
      .any()
      .refine(
        (file) =>
          file?.[0] &&
          (file[0].type === "image/png" || file[0].type === "image/jpeg"),
        {
          message: "Only JPG or PNG images allowed",
        }
      ),
  });
  
  const AddCompanyDrawer = ({ fetchCompanies }) => {
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(schema),
    });
  
    const {
      loading: loadingAddCompany,
      error: errorAddCompany,
      data: dataAddCompany,
      fn: fnAddCompany,
    } = useFetch(addNewCompany);
  
    const onSubmit = async (data) => {
      fnAddCompany({
        ...data,
        logo: data.logo[0],
      });
    };
  
    useEffect(() => {
      if (dataAddCompany?.length > 0) {
        fetchCompanies();
        reset(); // clear form after success
      }
    }, [loadingAddCompany]);
  
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button size="sm" variant="secondary" className="rounded-md shadow-sm">
            Add Company
          </Button>
        </DrawerTrigger>
  
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-xl font-semibold text-gray-800">
              Add a New Company
            </DrawerTitle>
          </DrawerHeader>
  
          <form
            className="flex flex-col gap-4 p-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Company Name */}
            <div>
              <Input
                placeholder="Company name"
                {...register("name")}
                className="rounded-md"
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
              )}
            </div>
  
            {/* Company Logo */}
            <div>
              <Input
                type="file"
                accept="image/png, image/jpeg"
                className="file:rounded-md file:border file:border-gray-300 file:p-2 file:bg-white file:text-gray-700"
                {...register("logo")}
              />
              {errors.logo && (
                <p className="text-sm text-red-500 mt-1">{errors.logo.message}</p>
              )}
            </div>
  
            {/* Submit Button */}
            <div className="flex items-center gap-4">
              <Button
                type="submit"
                variant="destructive"
                className="w-40 transition-all hover:brightness-110"
              >
                Add
              </Button>
              <DrawerClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DrawerClose>
            </div>
  
            {/* Feedback Messages */}
            {errorAddCompany?.message && (
              <p className="text-red-500 text-sm">{errorAddCompany.message}</p>
            )}
            {loadingAddCompany && (
              <BarLoader width="100%" color="#36d7b7" className="mt-2" />
            )}
          </form>
  
          <DrawerFooter />
        </DrawerContent>
      </Drawer>
    );
  };
  
  export default AddCompanyDrawer;
  