"use client";

import { useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";

export default function QueriedClaimsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("Queried Claims");

  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const queriedClaims = [
    { id: 1, claimId: "#0001", device: "iPhone 13 Pro MAX 1", status: "Queried", amount: "#23,445", date: "2025-02-27", newMessage: 4 },
    { id: 2, claimId: "#0001", device: "iPhone 13 Pro MAX 1", status: "Paid by Mona", amount: "#23,445", date: "2025-02-27", newMessage: 0 },
    { id: 3, claimId: "#0001", device: "iPhone 13 Pro MAX 1", status: "Queried", amount: "#23,445", date: "2025-02-27", newMessage: 4 },
    { id: 4, claimId: "#0001", device: "iPhone 13 Pro MAX 1", status: "Paid by Mona", amount: "#23,445", date: "2025-02-27", newMessage: 0 },
  ];

const getStatusBadge = (status: string) => {
  const baseClasses = "inline-block text-center w-[120px] text-xs px-2 py-1 rounded-none"; // fixed width
  if (status === "Queried") {
    return <span className={`${baseClasses} bg-red-100 text-red-700`}>Queried</span>;
  }
  if (status === "Paid by Mona") {
    return <span className={`${baseClasses} bg-blue-100 text-blue-700`}>Paid by Mona</span>;
  }
  return null;
};


  return (
    <div className="min-h-screen bg-[#F5F6FA] flex">
      <DashboardSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        activeDeviceCategory={""}
        setActiveDeviceCategory={() => {}}
        activeClaimCategory={""}
        setActiveClaimCategory={() => {}}
      />

      <div className="flex-1 flex flex-col">
        <DashboardHeader
          title="Claims Settlement"
          subtitle={activeTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 p-6 bg-[#F5F6FA]">
          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
            <h2 className="text-xl font-semibold text-[#000712]">Queried Claims</h2>
            <div className="flex flex-wrap gap-2 items-center">
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-28 rounded-none border-gray-300">
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32 rounded-none border-gray-300">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="queried">Queried</SelectItem>
                  <SelectItem value="paid">Paid by Mona</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative w-56">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-none border-gray-300"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded shadow overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-[#000712]">Claim ID</th>
                  <th className="px-6 py-3 text-left font-semibold text-[#000712]">Device Brand</th>
                  <th className="px-6 py-3 text-left font-semibold text-[#000712]">Model</th>
                  <th className="px-6 py-3 text-left font-semibold text-[#000712]">Status</th>
                  <th className="px-6 py-3 text-left font-semibold text-[#000712]">Amount</th>
                  <th className="px-6 py-3 text-left font-semibold text-[#000712]">Date Queried</th>
                  <th className="px-6 py-3 text-center font-semibold text-[#000712]">New Message</th>
                  <th className="px-6 py-3 text-center font-semibold text-[#000712]">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {queriedClaims.map((claim) => (
                  <tr key={claim.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{claim.claimId}</td>
                    <td className="px-6 py-4 whitespace-nowrap">iPhone</td>
                    <td className="px-6 py-4 whitespace-nowrap">{claim.device}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(claim.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{claim.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{claim.date}</td>
                    <td className="px-6 py-4 text-center">
                      {claim.newMessage > 0 ? (
                        <span className="bg-red-500 text-white text-xs w-6 h-6 inline-flex items-center justify-center rounded-full">
                          {claim.newMessage}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">0</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Button className="bg-[#004AAD] hover:bg-blue-700 text-white rounded-none text-xs px-4 py-2">View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mt-6 gap-4">
            <div className="text-sm text-gray-600">
              Showing 1 - 10 of 120
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="rounded-none">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button className="bg-[#004AAD] text-white rounded-none px-3 py-1 text-xs">1</Button>
              <Button variant="outline" size="sm" className="rounded-none">2</Button>
              <Button variant="outline" size="sm" className="rounded-none">3</Button>
              <span className="text-xs text-gray-500">...</span>
              <Button variant="outline" size="sm" className="rounded-none">12</Button>
              <Button variant="outline" size="sm" className="rounded-none">
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Select>
                <SelectTrigger className="w-24 rounded-none border-gray-300">
                  <SelectValue placeholder="10 / Page" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 / Page</SelectItem>
                  <SelectItem value="20">20 / Page</SelectItem>
                  <SelectItem value="50">50 / Page</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
