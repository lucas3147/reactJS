"use client"

import {CountProvider} from "@/Contexts/CountContext";
import { Header } from "@/components/Header";

const Page = () => {
  return (
    <div className="container mx-auto">
      <CountProvider>
        <Header/>
      </CountProvider>
    </div>
  )
}

export default Page;