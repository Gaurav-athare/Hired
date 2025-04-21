import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignIn,
  useUser,
} from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [search, setSearch] = useSearchParams();
  const { user } = useUser();

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);

  // Disable background scroll when modal is open
  useEffect(() => {
    if (showSignIn) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showSignIn]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-gray-950 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-6">
        <Link to="/">
          <img src="/logo.png" className="h-20" alt="Hirrd Logo" />
        </Link>

        <div className="flex gap-4 items-center">
          <SignedOut>
            <Button variant="outline" onClick={() => setShowSignIn(true)}>
              Login
            </Button>
          </SignedOut>

          <SignedIn>
            {user?.unsafeMetadata?.role === "recruiter" && (
              <Link to="/postjob">
                <Button variant="destructive" className="rounded-full">
                  <PenBox size={20} className="mr-2" />
                  Post a Job
                </Button>
              </Link>
            )}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/my-job"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  href="/saved-job"
                />
                <UserButton.Action label="manageAccount" />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>

      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
};

export default Header;
