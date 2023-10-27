"use client"

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
}

export const Providers = ({children}: Props) => {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}