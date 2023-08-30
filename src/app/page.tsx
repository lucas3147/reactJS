"use client"

import { PostProvider } from "@/Contexts/postContext";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Posts } from "@/components/Posts";

const Page = () => {
  return (
    <PostProvider>
      <div className="container mx-auto">
        <Header/>
        <Posts/>
        <Footer/>
      </div>
    </PostProvider>
  )
}

export default Page;