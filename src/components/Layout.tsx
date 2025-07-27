import React, { useEffect, useState } from "react"
import { Outlet, NavLink } from "react-router-dom"
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from "@/components/ui/menubar"
import { Button } from "@/components/ui/button"

export default function Layout() {
  const [dark, setDark] = useState(
    () => document.documentElement.classList.contains("dark")
  )

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Menubar className="px-4 py-2 bg-card mb-4">
        <MenubarMenu>
          <MenubarTrigger>Navigate</MenubarTrigger>
          <MenubarContent>
            {[
              { to: "/", label: "Home" },
              { to: "/form", label: "Analyze" },
              { to: "/results", label: "Results" },
            ].map((link) => (
              <MenubarItem key={link.to} asChild>
                <NavLink to={link.to}>{link.label}</NavLink>
              </MenubarItem>
            ))}
          </MenubarContent>
        </MenubarMenu>
        <div className="ml-auto">
          <Button size="sm" onClick={() => setDark((d) => !d)}>
            {dark ? "Light" : "Dark"} Mode
          </Button>
        </div>
      </Menubar>

      <main className="flex-1 container mx-auto px-4">
        <Outlet />
      </main>

      <footer className="py-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Income Equity & Affordability Analyzer
      </footer>
    </div>
  )
}