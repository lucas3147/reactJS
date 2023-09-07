"use client"

import { ThemeProvider } from "@/Context/ThemeContext";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { ThemeSwitch } from "@/components/themeSwitch";

const Page = () => {
  return (
    <ThemeProvider>
      <Container>
        <ThemeSwitch/>
        <header className="py-5">
          <h1 className="text-3xl">Título da página</h1>
        </header>
        <section>
          <p className="my-5">Conteúdo da página</p>
          <Button 
            label="Clique aqui" 
            onClick={() => {}}
          />
        </section>
      </Container>
    </ThemeProvider>
  )
}

export default Page;