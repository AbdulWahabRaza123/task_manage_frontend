"use client";
import { Navbar } from "@/components/ui/navbar";
import { Searchbar } from "@/components/ui/search-bar";
import { SidebarMenu } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="w-screen h-screen bg-[var(--color-gray-shade)] overflow-auto relative">
        <Navbar />
        <Searchbar />
        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-col gap-4 p-4 w-full lg:w-[22vw] lg:sticky lg:top-0">
            <SidebarMenu />
            <div className="rounded-md p-4 bg-white flex flex-col gap-2">
              <h4 className="text-h4 font-bolder">Note</h4>
              <p>
                This task is a part of assessment where I have build the design
                using nextjs, tailwind, typescript, shedcn, react queries and
                dnd. On the other hand backend is build on expressjs, mongodb,
                mongoose and express validator. I have add more and more
                functionalities within this system but as this is a part of
                assessment so just following guidelines.
              </p>
            </div>
          </div>
          <main className="px-4 py-6 w-full lg:w-[56vw] justify-start flex flex-col items-start overflow-auto">
            {children}
          </main>
          <div className="lg:w-[20vw] w-full py-4">
            <div className="p-4 bg-white rounded-md flex flex-col gap-2">
              <h4 className="text-h4 font-bolder">Personal Details</h4>
              <p>
                Abdul Wahab Raza
                <br />
                Full Stack Developer
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
