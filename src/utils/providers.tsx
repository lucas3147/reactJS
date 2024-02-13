"use client"

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";
import queryClient from "./queryClient";

type Props = {
    children: ReactNode;
}

export const Providers = ({children}: Props) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools
                initialIsOpen={false}
            />
        </QueryClientProvider>
    );
}