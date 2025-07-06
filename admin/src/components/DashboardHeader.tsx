"use client"

import { Search, Menu,RotateCw,BellRing } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  showSearch?: boolean;
}

export default function DashboardHeader({
  title,
  subtitle,
  sidebarOpen,
  setSidebarOpen,
  showSearch = true
}: DashboardHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
      <div className="flex flex-wrap items-center justify-between gap-y-2">
  <div className="flex items-center space-x-4">
    <Button 
      variant="ghost" 
      size="icon" 
      className="lg:hidden"
      onClick={() => setSidebarOpen(!sidebarOpen)}
    >
      <Menu className="w-5 h-5" />
    </Button>
    <div>
      <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      {subtitle && <span className="text-sm text-gray-500">{subtitle}</span>}
    </div>
  </div>

  <div className="flex items-center space-x-2 lg:space-x-4 overflow-x-auto sm:overflow-visible">
    {showSearch && (
      <div className="relative hidden sm:block">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input 
          placeholder="Search here" 
          className="pl-10 w-40 sm:w-48 lg:w-64 rounded-none border-[#DBEBFF] bg-[#E8F2FF59]"
        />
      </div>
    )}
    <Button variant="ghost" size="icon">
      <RotateCw className="w-5 h-5" />
    </Button>
    <Button variant="ghost" size="icon">
      <BellRing className="w-5 h-5" />
    </Button>
  </div>
</div>

    </header>
  )
}
