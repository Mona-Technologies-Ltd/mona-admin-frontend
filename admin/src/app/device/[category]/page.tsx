"use client"
export const dynamic = 'force-dynamic'; // <-- this fixes the export error
import { useEffect, useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import DashboardSidebar from "@/components/DashboardSidebar"
import DashboardHeader from "@/components/DashboardHeader"
import { deviceCategories, Device } from "@/utils/info"
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from 'antd';
// import type { DateRange } from 'antd/es/date-picker';
import dayjs from '@/utils/dayjs'; // adjust path as needed
import { Dayjs } from 'dayjs';

export default function Dashboard() {
   const params = useParams();
  const [currentPage, setCurrentPage] = useState(1)
  // const [dateFilter, setDateFilter] = useState("")
  // const [statusFilter] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [statusFilter, setStatusFilter] = useState("");

const [activeDeviceCategory, setActiveDeviceCategory] = useState<string | null>(null);
const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);

useEffect(() => {
  const rawCategory = params?.category as string;
  if (rawCategory) {
    setActiveDeviceCategory(decodeURIComponent(rawCategory));
  } else {
    // Default to "Approved Devices"
    setActiveDeviceCategory("Approved Devices");
  }
}, []);



useEffect(() => {
  if (activeDeviceCategory !== null) {
    setCurrentPage(1);
  }
}, [activeDeviceCategory]);



// const currentDevices = activeDeviceCategory
//   ? deviceCategories[activeDeviceCategory as keyof typeof deviceCategories] || []
//   : allDevices;
useEffect(() => {
  if (params?.category) {
    const decoded = decodeURIComponent(params.category as string);
    setActiveDeviceCategory(decoded);
  }
}, [params]);
// Only render on the client after category is initialized
if (typeof window === "undefined" || activeDeviceCategory === null) {
  return null;
}

const currentDevices = activeDeviceCategory === "all"
  ? deviceCategories
  : deviceCategories.filter(device => device.category === activeDeviceCategory);

// const currentDevices = activeDeviceCategory
//   ? deviceCategories.filter(device => device.category === activeDeviceCategory)
//   : deviceCategories;

  const itemsPerPage = 10
  const totalPages = Math.ceil(currentDevices.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage

  const filteredDevices = currentDevices.filter(device => {
  const matchesStatus = statusFilter ? device.status.toLowerCase() === statusFilter.toLowerCase() : true;
const matchesDate = dateRange
  ? dayjs(device.date).isSameOrAfter(dateRange[0], 'day') &&
    dayjs(device.date).isSameOrBefore(dateRange[1], 'day')
  : true;
  return matchesStatus && matchesDate;
});

const { RangePicker } = DatePicker;

  // const displayedDevices = currentDevices.slice(startIndex, startIndex + itemsPerPage)
const displayedDevices = filteredDevices.slice(startIndex, startIndex + itemsPerPage)

const hideStatusColumnFor = ["Awaiting Approval", "Awaiting Video Upload"];
const shouldHideStatus = hideStatusColumnFor.includes(activeDeviceCategory);

// const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);
  return (
    <div className="min-h-screen bg-[#F5F6FA] flex flex-col lg:flex-row">
    
      <DashboardSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        activeDeviceCategory={activeDeviceCategory}
        setActiveDeviceCategory={() => {}}
        activeClaimCategory={""}
        setActiveClaimCategory={() => {}}
      />

      {/* Main Content */}
      <div  key={activeDeviceCategory} className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-0' : 'lg:ml-0'} lg:ml-0`}>
        {/* Header */}
       
        <DashboardHeader 
          title="Devices Management"
          subtitle={activeDeviceCategory}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        {/* Content */}
        <main className="flex-1 p-2 lg:p-2">
          {/* Filters and Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 gap-6">
               <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 rounded-none" />
              <Input 
                placeholder="Search here" 
                className="pl-10 w-48 lg:w-64 rounded-none border-[#DBEBFF] bg-[#E8F2FF59]"
              />
            </div>
            <RangePicker
                onChange={(dates) => setDateRange(dates)}
                format="MM/DD/YYYY"
                className="border border-gray-300 !rounded-none px-3 py-2 text-sm focus:ring-2 focus:ring-[#004AAD] focus:outline-none"
              />
                 <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32 !rounded-none border-gray-300 bg-white focus:ring-2 focus:ring-[#004AAD] focus:border-transparent">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {/* <SelectItem value="all">All Status</SelectItem> */}
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="InActive">In active</SelectItem>
                  {/* <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="under review">Under Review</SelectItem> */}
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* Table */}
          <div className="bg-[#F5F6FA] overflow-hidden">
            <div className="overflow-x-auto">
              {/* <table className="w-full"> */}
              <table className="w-full border-separate border-spacing-y-3 ">
                <thead className="bg-[#C8C9D359] border-b border-gray-200">
                  <tr>
                     {!shouldHideStatus && (
                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-[#000712] capitalize tracking-wider">Device Id</th>

                    )}
                    <th className="px-4 lg:px-6 py-3 text-center text-xs font-medium text-[#000712] capitalize tracking-wider">Device model</th>
                    <th className="px-4 lg:px-6 py-3 text-center text-xs font-medium text-[#000712] capitalize tracking-wider">Brand</th>
                    <th className="px-4 lg:px-6 py-3 text-center text-xs font-medium text-[#000712] capitalize tracking-wider">IMEI</th>
                    <th className="px-4 lg:px-2 py-3 text-center text-xs font-medium text-[#000712] capitalize tracking-wider">Amount Paid</th>
                      {shouldHideStatus && (
                    <th className="px-4 lg:px-2 py-3 text-center text-xs font-medium text-[#000712] capitalize tracking-wider">Date</th>

                    )}
                                      {!shouldHideStatus && (
                    <th className="px-4 lg:px-6 py-3 text-center text-xs font-medium text-[#000712] capitalize tracking-wider">Claims</th>

                    )}
                      {!shouldHideStatus && (
                    <th className="px-4 lg:px-6 py-3 text-center text-xs font-medium text-[#000712] capitalize tracking-wider">Expiry date</th>

                    )}
                    {/* <th className="px-4 lg:px-6 py-3 text-center text-xs font-medium text-[#000712] capitalize tracking-wider">Status</th>  */}
                     {!shouldHideStatus && (
                      <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-[#000712] capitalize tracking-wider">
                        Status
                      </th>
                    )}

                    <th className="px-4 lg:px-6 py-3 text-center text-xs font-medium text-[#000712] capitalize tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* {displayedDevices.map((device: any, index: number) => ( */}
                  {displayedDevices.map((device: Device, index: number) => (

                    // <tr key={index} className="hover:bg-gray-50">
                    <tr key={index} className="bg-white shadow-sm hover:shadow-md transition">
                       {!shouldHideStatus && (
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{device.id}</td>
                       )}
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{device.model}</td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{device.brand}</td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{device.imei}</td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{device.amount}</td>
                       {shouldHideStatus && (
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{device.date}</td>
                       )}
                       {!shouldHideStatus && (
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{device.claims}</td>
                       )}
                        {!shouldHideStatus && (
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{device.expiry}</td>
                       )}
                      {!shouldHideStatus && (
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                          {device.status && device.status.trim() !== "" && (
                            <Badge 
                              className={`px-2 py-1 text-xs font-medium w-full rounded-none ${
                                device.status === 'Active' 
                                  ? 'bg-[#E8F2FF59] text-[#004AAD]' 
                                  : device.status === 'Pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : device.status === 'Under Review'
                                  ? 'bg-blue-100 text-blue-800'
                                  : device.status === 'Waiting'
                                  ? 'bg-orange-100 text-orange-800'
                                  : device.status === 'Inactive'
                                  ? 'bg-[#D5663A1C] text-[#E52626]'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {device.status}
                            </Badge>
                          )}
                        </td>
                      )}

                     
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap rounded-none text-center ">
                        
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="!bg-[#D7F0FF59] !text-[#004AAD] border-[#004AAD]  hover:!bg-[#004AAD] hover:!text-white rounded-none"
                            onClick={() =>
                              window.location.href = `/device-details?id=${device.id}&category=${device.category}`
                            }
                          >
                            View Details
                          </Button>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="bg-white px-4 lg:px-6 py-3 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-500">
                Showing {Math.min(startIndex + 1, currentDevices.length)} to {Math.min(startIndex + itemsPerPage, currentDevices.length)} of {currentDevices.length} results
              </div>
              <div className="flex items-center space-x-1">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-2 rounded-none"
                >
                  {/* <ChevronLeft className="w-4 h-4" /> */}
                   <img
                    src="/arrow-left.svg" // Replace with actual path
                    alt="Next"
                    className="w-4 h-4 object-contain"
                  />
                </Button>
                
                {[1, 2, 3, 4, 5, 6].map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 rounded-none  ${currentPage === page ? "border bg-white border-[#004AAD] text-[#004AAD] hover:!text-white hover:bg-[#004AAD]" : "border-none"}`}
                  >
                    {page}
                  </Button>
                ))}
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-2 rounded-none bg-none"
                >
                   <img
                    src="/arrow-right.svg" // Replace with actual path
                    alt="Next"
                    className="w-4 h-4 object-contain"
            />
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

