"use client"

import { LoggedUserProvider } from "@/Contexts/LoggerUser";
import { Header } from "@/components/Header";

const Page = () => {
  return (
    <div className="container mx-auto">
        <LoggedUserProvider>
          <Header/>
        </LoggedUserProvider>
    </div>
  )
}

export default Page;