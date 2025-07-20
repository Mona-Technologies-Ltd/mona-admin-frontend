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
import RepairClaimModal, { ClaimData } from "@/components/RepairClaimModal";
import { claimsData } from "@/utils/info";
import dayjs from '@/utils/dayjs'; // adjust path as needed
import { Dayjs } from 'dayjs';
import { DatePicker } from 'antd';

export default function QueriedClaimsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  // const [activeTab, setActiveTab] = useState("Queried Claims");
const activeTab = "Queried Claims";
// if(activeTab) setActiveTab("Queried Claims")
  // const [dateFilter, setDateFilter] = useState("");
  // const [statusFilter, setStatusFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
// const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>(null);
const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);

const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(10);

const [isModalOpen, setIsModalOpen] = useState(false);
const { RangePicker } = DatePicker;

  const queriedClaims = [
    { id: 1, claimId: "#0001", device: "iPhone 13 Pro MAX 1", status: "Queried", amount: "#23,445", date: "2025-02-27", newMessage: 4 },
    { id: 2, claimId: "#0001", device: "iPhone 13 Pro MAX 1", status: "Paid by Mona", amount: "#23,445", date: "2025-02-27", newMessage: 0 },
    { id: 3, claimId: "#0001", device: "iPhone 13 Pro MAX 1", status: "Queried", amount: "#23,445", date: "2025-02-27", newMessage: 4 },
    { id: 4, claimId: "#0001", device: "iPhone 13 Pro MAX 1", status: "Paid by Mona", amount: "#23,445", date: "2025-02-27", newMessage: 10 },
    { id: 5, claimId: "#0001", device: "iPhone 13 Pro MAX 1", status: "Paid by Mona", amount: "#23,445", date: "2025-02-27", newMessage: 0 },
    { id: 6, claimId: "#0001", device: "iPhone 13 Pro MAX 1", status: "Paid by Mona", amount: "#23,445", date: "2025-02-27", newMessage: 4 },
    { id: 7, claimId: "#0001", device: "iPhone 13 Pro MAX 1", status: "Paid by Mona", amount: "#23,445", date: "2025-02-27", newMessage: 6 },
    { id: 8, claimId: "#0001", device: "iPhone 13 Pro MAX 1", status: "Paid by Mona", amount: "#23,445", date: "2025-02-27", newMessage: 0 },
    { id: 9, claimId: "#0001", device: "iPhone 13 Pro MAX 1", status: "Paid by Mona", amount: "#23,445", date: "2025-02-27", newMessage: 7 },
    { id: 10, claimId: "#0001", device: "iPhone 13 Pro MAX 1", status: "Paid by Mona", amount: "#23,445", date: "2025-02-27", newMessage: 0 },
    { id: 12, claimId: "#0001", device: "iPhone 13 Pro MAX 1", status: "Paid by Mona", amount: "#23,445", date: "2025-02-27", newMessage: 0 },
    { id: 13, claimId: "#0001", device: "iPhone 13 Pro MAX 1", status: "Paid by Mona", amount: "#23,445", date: "2025-02-27", newMessage: 10 },
    { id: 14, claimId: "#0001", device: "iPhone 13 Pro MAX 1", status: "Paid by Mona", amount: "#23,445", date: "2025-02-27", newMessage: 0 },
    { id: 15, claimId: "#0001", device: "iPhone 13 Pro MAX 1", status: "Paid by Mona", amount: "#23,445", date: "2025-02-27", newMessage: 0 },
    { id: 16, claimId: "#0001", device: "iPhone 13 Pro MAX 1", status: "Paid by Mona", amount: "#23,445", date: "2025-02-27", newMessage: 1 },
    { id: 17, claimId: "#0001", device: "iPhone 13 Pro MAX 1", status: "Paid by Mona", amount: "#23,445", date: "2025-02-27", newMessage: 0 },
    { id: 18, claimId: "#0001", device: "iPhone 13 Pro MAX 1", status: "Paid by Mona", amount: "#23,445", date: "2025-02-27", newMessage: 5 },
    { id: 19, claimId: "#0001", device: "iPhone 13 Pro MAX 1", status: "Paid by Mona", amount: "#23,445", date: "2025-02-27", newMessage: 0 },
  ];
const filteredClaims = queriedClaims.filter((claim) => {
  const matchesStatus = statusFilter === "all" || statusFilter === "" || claim.status === statusFilter;

  const matchesDate = !dateRange || (
    dayjs(claim.date).isSameOrAfter(dayjs(dateRange[0]).startOf('day')) &&
    dayjs(claim.date).isSameOrBefore(dayjs(dateRange[1]).endOf('day'))
  );

  const matchesSearch = !searchQuery || claim.device.toLowerCase().includes(searchQuery.toLowerCase());

  return matchesStatus && matchesDate && matchesSearch;
});

const totalItems = filteredClaims.length;
const totalPages = Math.ceil(totalItems / itemsPerPage);
const paginatedClaims = filteredClaims.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);

const getStatusBadge = (status: string) => {
  const baseClasses = "inline-block text-center w-[120px] text-xs px-2 py-1 rounded-none"; // fixed width
  if (status === "Queried") {
    return <span className={`${baseClasses} bg-[#FFE5DB] text-[#FF4602]`}>Queried</span>;
  }
  if (status === "Paid by Mona") {
    return <span className={`${baseClasses} bg-blue-100 text-blue-700`}>Paid by Mona</span>;
  }
  return null;
};


  return (
    <div className="min-h-screen bg-[#F5F6FA] flex flex-col lg:flex-row">
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
          title="Queried Claims"
          subtitle={activeTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 p-6 bg-[#F5F6FA]">
          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-1 space-y-4 md:space-y-0">
            <h2 className="text-[16px] font-semibold text-[#000712]">Queried Claims</h2>
            <div className="flex flex-wrap gap-2 items-center relative">
              {/* <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-28 rounded-none border-gray-300">
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                </SelectContent>
              </Select> */}
             <RangePicker
                onChange={(dates) => setDateRange(dates)}
                format="MM/DD/YYYY"
                className="border border-gray-300 !rounded-none px-3 py-2 text-sm focus:ring-2 focus:ring-[#004AAD] focus:outline-none"
              />

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32 rounded-none border-gray-300 bg-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Queried">Queried</SelectItem>
                <SelectItem value="Paid by Mona">Paid by Mona</SelectItem>
              </SelectContent>
            </Select>

              {/* <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32 rounded-none border-gray-300">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="queried">Queried</SelectItem>
                  <SelectItem value="paid">Paid by Mona</SelectItem>
                </SelectContent>
              </Select> */}

              <div className="relative w-56">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-none border border-[#DBEBFF] bg-[#fff]"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-[#F5F6FA] rounded shadow overflow-x-auto">
            <table className="w-full border-separate border-spacing-y-3 ">
              <thead className="bg-[#C8C9D359] border-b border-gray-200]">
                <tr>
                  <th className="px-6 py-3 text-center font-medium text-[12px] text-[#000712]">Claim ID</th>
                  <th className="px-6 py-3 text-center font-medium text-[12px] text-[#000712]">Device Brand</th>
                  <th className="px-6 py-3 text-center font-medium text-[12px] text-[#000712]">Model</th>
                  <th className="px-6 py-3 text-center font-medium text-[12px] text-[#000712]">Status</th>
                  <th className="px-6 py-3 text-center font-medium text-[12px] text-[#000712]">Amount</th>
                  <th className="px-6 py-3 text-center font-medium text-[12px] text-[#000712]">Date Queried</th>
                  <th className="px-6 py-3 text-center font-medium text-[12px] text-[#000712]">New Message</th>
                  <th className="px-6 py-3 text-center font-medium text-[12px] text-[#000712]">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedClaims.map((claim, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 bg-white shadow-sm hover:shadow-md transition">
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
                    <Button
  className="bg-[#fff] hover:bg-[#004AAD] hover:!text-white border border-[#004AAD] !text-[#004AAD] rounded-none text-xs px-4 py-2"
  onClick={() => setIsModalOpen(true)}
>
  View Details
</Button>



                      {/* <Button className="bg-[#004AAD] hover:bg-blue-700 text-white rounded-none text-xs px-4 py-2">View</Button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mt-6 gap-4">
            <div className="text-sm text-gray-600">
                Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
                {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
              </div>

            <div className="flex items-center space-x-2">
           <Button
                  variant="outline"
                  size="sm"
                  className="rounded-none"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {Array.from({ length: totalPages }).map((_, index) => (
                  <Button
                    key={index}
                    className={`px-3 py-1 text-xs rounded-none ${
                      currentPage === index + 1 ? "bg-[#004AAD] !text-white" : "bg-white !text-[#004AAD] border"
                    }`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-none"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>

            <Select
  value={String(itemsPerPage)}
  onValueChange={(value) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Reset to page 1
  }}
>
  <SelectTrigger className="w-24 rounded-none border-gray-300">
    <SelectValue placeholder={`${itemsPerPage} / Page`} />
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
      {isModalOpen && (
  // <RepairClaimModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} claim={queriedClaims} />
    <RepairClaimModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} claim={claimsData[0] as ClaimData} />

)}


    </div>
  );
}
