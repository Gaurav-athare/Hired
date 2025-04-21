import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import companies from "../data/companies.json";
import faqs from "../data/faq.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground px-4 mt-28">
      <main className="w-full max-w-5xl flex flex-col items-center justify-center gap-20 py-16 text-center">
        
        {/* Hero Section */}
        <section>
          <h1 className="gradient-title text-5xl sm:text-7xl font-extrabold tracking-tight animate-fade-in-down">
            Find Your Dream Job
          </h1>
          <div className="mt-4 flex items-center justify-center gap-4 sm:gap-6 animate-fade-in-up">
            <p className="text-lg sm:text-2xl text-muted-foreground">and get</p>
            <img
              src="/logo.png"
              className="h-16 sm:h-24 lg:h-28"
              alt="Hirrd platform logo"
            />
          </div>
          <p className="mt-4 text-sm sm:text-lg text-muted-foreground max-w-xl mx-auto animate-fade-in-up">
            Explore thousands of job listings or find the perfect candidate.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-6 justify-center animate-fade-in-up">
            <Link to="/jobs">
              <Button variant="blue" size="xl">
                Find Jobs
              </Button>
            </Link>
            <Link to="/postjob">
              <Button variant="destructive" size="xl">
                Post a Job
              </Button>
            </Link>
          </div>
        </section>

        {/* Company Carousel */}
        <section className="w-full animate-fade-in">
          <Carousel plugins={[Autoplay({ delay: 2000 })]} className="w-full">
            <CarouselContent className="flex gap-6 sm:gap-12 items-center">
              {companies.map(({ name, id, path }) => (
                <CarouselItem key={id} className="basis-1/3 sm:basis-1/5">
                  <img
                    src={path}
                    alt={`${name} logo`}
                    className="h-10 sm:h-16 object-contain grayscale hover:grayscale-0 transition duration-300"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>

        {/* Banner */}
        <img
          src="/banner.jpeg"
          alt="Team collaboration banner"
          className="rounded-xl shadow-xl w-full max-h-96 object-cover animate-fade-in"
        />

        {/* Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full animate-fade-in-up">
          <Card className="hover:shadow-2xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="font-bold text-xl">For Job Seekers</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Search and apply for jobs, track applications, and more.
            </CardContent>
          </Card>
          <Card className="hover:shadow-2xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="font-bold text-xl">For Employers</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Post jobs, manage applications, and find the best candidates.
            </CardContent>
          </Card>
        </section>

        {/* FAQ */}
        <section className="w-full animate-fade-in-up">
          <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
          <Accordion type="multiple" className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
