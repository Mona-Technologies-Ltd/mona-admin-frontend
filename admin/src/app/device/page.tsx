"use client"

import { useEffect, useState } from "react"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Badge } from "@/components/ui/badge"
import DashboardSidebar from "@/components/DashboardSidebar"
import DashboardHeader from "@/components/DashboardHeader"
import { deviceCategories, Device } from "@/utils/info"
// import DashboardSidebar from "@/components/dashboard-sidebar"
import { useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge"


// type Device = {
//   id: string;
//   model: string;
//   brand: string;
//   imei: string;
//   amount: string;
//   claims: number;
//   expiry: string;
//   status: string;
// };


export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1)
  const [dateFilter, setDateFilter] = useState("")
  const [statusFilter] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  // const [activeDeviceCategory, setActiveDeviceCategory] = useState("Approved Devices")
// const [activeDeviceCategory, setActiveDeviceCategory] = useState("")
// const searchParams = useSearchParams();
// const activeDeviceCategory = searchParams.get("category") || "";
const searchParams = useSearchParams();
const [activeDeviceCategory, setActiveDeviceCategory] = useState<string | null>(null);

useEffect(() => {
  const category = searchParams.get("category") || "";
  setActiveDeviceCategory(category);
}, [searchParams]);

// Don't render until it's ready
useEffect(() => {
  if (activeDeviceCategory !== null) {
    setCurrentPage(1);
  }
}, [activeDeviceCategory]);

if (activeDeviceCategory === null) {
  return null;
}

  // const currentDevices = deviceCategories[activeDeviceCategory as keyof typeof deviceCategories] || []
  // const allDevices = Object.values(deviceCategories).flat();

// const currentDevices = activeDeviceCategory
//   ? deviceCategories[activeDeviceCategory as keyof typeof deviceCategories] || []
//   : allDevices;

const currentDevices = activeDeviceCategory
  ? deviceCategories.filter(device => device.category === activeDeviceCategory)
  : deviceCategories;

  const itemsPerPage = 10
  const totalPages = Math.ceil(currentDevices.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage

  const filteredDevices = currentDevices.filter(device => {
  const matchesStatus = statusFilter ? device.status.toLowerCase() === statusFilter.toLowerCase() : true;
  const matchesDate = dateFilter ? true : true; // Implement real date logic here if needed
  return matchesStatus && matchesDate;
});


  // const displayedDevices = currentDevices.slice(startIndex, startIndex + itemsPerPage)
const displayedDevices = filteredDevices.slice(startIndex, startIndex + itemsPerPage)

  // const handleDeviceCategoryChange = (category: string) => {
  //   setActiveDeviceCategory(category)
  //   setCurrentPage(1)
  // }
const hideStatusColumnFor = ["Awaiting Approval", "Awaiting Video Upload"];
const shouldHideStatus = hideStatusColumnFor.includes(activeDeviceCategory);

  return (
    <div className="min-h-screen bg-[#F5F6FA] flex flex-col lg:flex-row">
     {/* <DashboardSidebar
                   sidebarOpen={sidebarOpen}
                   setSidebarOpen={setSidebarOpen}
                   sidebarCollapsed={sidebarCollapsed}
                   setSidebarCollapsed={setSidebarCollapsed}
                   activeDeviceCategory={activeDeviceCategory}
                   setActiveDeviceCategory={handleDeviceCategoryChange}
                    activeClaimCategory={""}
             setActiveClaimCategory={()=>{}}
                 /> */}
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
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
               <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 rounded-none" />
              <Input 
                placeholder="Search here" 
                className="pl-10 w-48 lg:w-64 rounded-none border-[#DBEBFF] bg-[#E8F2FF59]"
              />
            </div>
            <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-32 rounded-none border px-2 py-1 text-sm"
              />

              {/* <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-32 rounded-none">
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32 rounded-none">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select> */}
            </div>
            
            {/* <Button className="bg-blue-600 rounded-none hover:bg-blue-700">
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button> */}
          </div>

          {/* Table */}
          <div className="bg-[#F5F6FA] overflow-hidden">
            <div className="overflow-x-auto">
              {/* <table className="w-full"> */}
              <table className="w-full border-separate border-spacing-y-3 ">
                <thead className="bg-[#C8C9D359] border-b border-gray-200">
                  <tr>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-[#000712] capitalize tracking-wider">Device Id</th>
                    <th className="px-4 lg:px-6 py-3 text-center text-xs font-medium text-[#000712] capitalize tracking-wider">Device model</th>
                    <th className="px-4 lg:px-6 py-3 text-center text-xs font-medium text-[#000712] capitalize tracking-wider">Brand</th>
                    <th className="px-4 lg:px-6 py-3 text-center text-xs font-medium text-[#000712] capitalize tracking-wider">IMEI</th>
                    <th className="px-4 lg:px-2 py-3 text-center text-xs font-medium text-[#000712] capitalize tracking-wider">Amount Paid</th>
                    <th className="px-4 lg:px-6 py-3 text-center text-xs font-medium text-[#000712] capitalize tracking-wider">Claims</th>
                    <th className="px-4 lg:px-6 py-3 text-center text-xs font-medium text-[#000712] capitalize tracking-wider">Expiry date</th>
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

                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{device.id}</td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{device.model}</td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{device.brand}</td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{device.imei}</td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{device.amount}</td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{device.claims}</td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{device.expiry}</td>
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
                        {/* <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-blue-600 border-blue-600 hover:bg-blue-50 rounded-none"
                          onClick={() => window.location.href = '/device-details'}
                        >
                          View Details
                        </Button> */}
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-blue-600 border-blue-600 hover:bg-blue-50 rounded-none"
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
                  className="px-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                
                {[1, 2, 3, 4, 5, 6].map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 ${currentPage === page ? "bg-blue-600 text-white hover:bg-blue-700" : ""}`}
                  >
                    {page}
                  </Button>
                ))}
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-2"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

