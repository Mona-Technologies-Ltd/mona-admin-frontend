// CustomerDetailsPage Component
"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import RepairClaimModal from "@/components/RepairClaimModal";

type Claim = {
  id: string;
  status: string;
  // Add more fields as needed
};

const CustomerDetailsPage = () => {
  const [activeTab, setActiveTab] = useState("Customer Information");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
const [selectedClaim, setSelectedClaim] = React.useState<Claim | null>(null);
const [isClaimModalOpen, setIsClaimModalOpen] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false)

  console.log(selectedClaim)
  console.log(isClaimModalOpen)
  const tabs = [
    "Customer Information",
    "Customer Devices",
    "Claims",
    "Claim Settlement",
  ];

  const renderTabContent = () => {

 // Mock type if you haven't imported it yet




const handleViewDetails = (claim: Claim) => {
  setSelectedClaim(claim);
  setIsModalOpen(true); // ✅ this will now open the modal
};


const handleTrackProgress = (claim: Claim) => {
  setSelectedClaim(claim);
  setIsClaimModalOpen(true);
};


    switch (activeTab) {
      case "Customer Information":
        return (
          <div className="p-6 bg-white ">
            <div className="flex items-center justify-between mb-6 border-b-2 py-6 md:py-11">
  <div className="flex items-center">
    <div className="w-16 h-16 bg-gradient-to-b from-[#38B6FF] via-[#004AAD] to-[#021B79] text-white rounded-full flex items-center justify-center font-bold text-lg">
      J
    </div>

    <div className="ml-4">
      <h2 className="text-xl font-semibold">John Doe</h2>
      <p className="text-sm text-gray-500">FCT, Abuja</p>
    </div>
  </div>

  <div className="w-6 h-6 rounded-full border border-[#38B6FF] flex items-center justify-center">
    <img src="/pen-icon.svg" alt="edit icon" className="w-4 h-4" />
  </div>
</div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-light text-[#6B7280]">State/city</h3>
                <p className="text-lg">FCT, Abuja</p>
              </div>
               <div>
                <h3 className="text-sm font-semibold text-[#6B7280]">Gendar</h3>
                  <Button className="bg-[#D7F0FF59]  text-[#38B6FF] rounded-none">Male</Button>

              </div>
              <div>
                <h3 className="text-sm font-light text-[#6B7280]">Email</h3>
                <p className="text-sm md:text-lg">johndoe23@gmail.com</p>
              </div>
              <div>
                <h3 className="text-sm font-light text-[#6B7280]">Phone Number</h3>
                <p className="text-lg">0814 224 4432</p>
              </div>
              <div>
                <h3 className="text-sm font-light text-[#6B7280]">Date of Birth</h3>
                <p className="text-lg">24/12/1992</p>
              </div>
              <div>
                <h3 className="text-sm font-light text-[#6B7280]">NIN</h3>
                <p className="text-lg">21232324343432</p>
              </div>
            </div>
            <div className=" flex space-x-4 justify-between md:px-20 mt-8 md:mt-36">
              <Button className="bg-[#004AAD] hover:bg-[#004AAD] text-white rounded-none md:p-6">Activate</Button>
              <Button className="bg-[#E52626] hover:bg-red-700 text-white rounded-none md:p-6">Deactivate</Button>
            </div>
          </div>
        );
      case "Customer Devices":
        return (
          <div className="p-6 overflow-x-auto">
     <table className="min-w-full border-separate border-spacing-y-3">
              <thead className="bg-[#C8C9D359]">
                <tr>
                   <th className="px-2 md:px-4 py-2 text-xs md:text-sm text-center font-medium">Device ID</th>
                   <th className="px-2 md:px-4 py-2 text-xs md:text-sm text-center font-medium">IMEI Number</th>
                   <th className="px-2 md:px-4 py-2 text-xs md:text-sm text-center font-medium">Brand</th>
                   <th className="px-2 md:px-4 py-2 text-xs md:text-sm text-center font-medium">Model</th>
                   <th className="px-2 md:px-4 py-2 text-xs md:text-sm text-center font-medium">Claims</th>
                   <th className="px-2 md:px-4 py-2 text-xs md:text-sm text-center font-medium">Subscription</th>
                   <th className="px-2 md:px-4 py-2 text-xs md:text-sm text-center font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {Array(3).fill(null).map((_, index) => (
              <tr key={index} className="bg-white shadow-sm">
                     <td className="px-4 py-2 text-center text-xs">#000{index + 1}</td>
                     <td className="px-4 py-2 text-center text-xs">35679723456789</td>
                     <td className="px-4 py-2 text-center text-xs">Samsung</td>
                     <td className="px-4 py-2 text-center text-xs">Galaxy S22</td>
                     <td className="px-4 py-2 text-center text-xs">3</td>
                     <td className="px-4 py-2 text-center text-xs">
                      <Button
                        className={`rounded-none text-sm w-full ${index % 2 === 0 ? "bg-[#DCEBFF] text-[#004AAD]" : "bg-[#D5663A1C] text-[#E52626]"}`}
                      >
                        {index % 2 === 0 ? "Active" : "Inactive"}
                      </Button>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <Button className="bg-[#fff] text-center text-[#004AAD] border border-[#004AAD] hover:bg-[#004AAD] hover:text-[#fff] rounded-none">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
    case "Claims":
  const statuses = ["Approved", "Pending", "Uncategorized", "Completed", "Rejected"];
  const statusStyles: Record<string, string> = {
    Approved: "bg-green-100 text-green-600",
    Pending: "bg-yellow-100 text-yellow-600",
    Rejected: "bg-red-100 text-red-600",
    Completed: "bg-blue-100 text-blue-600",
    Uncategorized: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="p-6 overflow-x-auto">
     <table className="min-w-full border-separate border-spacing-y-3">
              <thead className="bg-[#C8C9D359]">
          <tr>
            <th className="px-2 md:px-4 py-2 text-xs md:text-sm text-center font-medium">Claim ID</th>
            <th className="px-2 md:px-4 py-2 text-xs md:text-sm text-center font-medium">Device Model</th>
            <th className="px-2 md:px-4 py-2 text-xs md:text-sm text-center font-medium">Brand</th>
            <th className="px-2 md:px-4 py-2 text-xs md:text-sm text-center font-medium">Issue</th>
            <th className="px-2 md:px-4 py-2 text-xs md:text-sm text-center font-medium">Amount</th>
            <th className="px-2 md:px-4 py-2 text-xs md:text-sm text-center font-medium">Status</th>
            <th className="px-2 md:px-4 py-2 text-xs md:text-sm text-center font-medium">Insurer</th>
            <th className="px-2 md:px-4 py-2 text-xs md:text-sm text-center font-medium">Date</th>
            <th className="px-2 md:px-4 py-2 text-xs md:text-sm text-center font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {Array(5).fill(null).map((_, index) => {
            const status = statuses[index % statuses.length];
            const statusClass = statusStyles[status];

            // ✅ MOCK CLAIM OBJECT (placed inside the map function)
            const mockClaim: Claim = {
              id: `PLU37${68 + index}`,
              status,
            };

            return (
              <tr key={index} className="bg-white shadow-sm">
                <td className="px-4 py-2 text-center text-xs">{mockClaim.id}</td>
                <td className="px-4 py-2 text-center text-xs">iPhone 13 Pro MAX</td>
                <td className="px-4 py-2 text-center text-xs">iPhone</td>
                <td className="px-4 py-2 text-center text-xs">Broken Screen</td>
                <td className="px-4 py-2 text-center text-xs">₦25,000.00</td>
                <td className="px-4 py-2 text-center text-xs">
                  <Button className={`rounded-none w-full text-xs ${statusClass}`}>
                    {status}
                  </Button>
                </td>
                <td className="px-4 py-2 text-center text-xs">Axa Mansard</td>
                <td className="px-4 py-2 text-center text-xs">Dec 6, 2024</td>
                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-[#004AAD] border border-blue-600 hover:bg-blue-50 rounded-none"
                      >
                        More
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewDetails(mockClaim)}>
                        View detail
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleTrackProgress(mockClaim)}>
                        Track Progress
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

    case "Claim Settlement":
  return (
    <div className="p-6">
      {/* <table className="w-full bg-white border border-gray-200"> */}
     <table className="min-w-full border-separate border-spacing-y-3">

              <thead className="bg-[#C8C9D359]">
          <tr>
            <th className="text-center px-4 py-3 text-xs font-medium text-[#000712]">Claim ID</th>
            <th className="text-center px-4 py-3 text-xs font-medium text-[#000712]">Device Brand</th>
            <th className="text-center px-4 py-3 text-xs font-medium text-[#000712]">Model</th>
            <th className="text-center px-4 py-3 text-xs font-medium text-[#000712]">Issue Type</th>
            <th className="text-center px-4 py-3 text-xs font-medium text-[#000712]">Amount</th>
            <th className="text-center px-4 py-3 text-xs font-medium text-[#000712]">Status</th>
            <th className="text-center px-4 py-3 text-xs font-medium text-[#000712]">Date</th>
            <th className="text-center px-4 py-3 text-xs font-medium text-[#000712]">Action</th>
          </tr>
        </thead>
        <tbody>
          {Array(5).fill(null).map((_, index) => {
            const mockClaim: Claim = {
              id: `PLU37${68 + index}`,
              status:
                index % 3 === 0 ? "Paid" :
                index % 3 === 1 ? "Pending" : "Queried",
            };

            return (
              <tr key={index} className="bg-white shadow-sm">
                <td className="px-4 py-3 text-sm text-center">{mockClaim.id}</td>
                <td className="px-4 py-2 text-center text-sm">iPhone</td>
                <td className="px-4 py-2 text-center text-sm">iPhone 13 Pro MAX</td>
                <td className="px-4 py-2 text-center text-sm">Damaged Screen</td>
                <td className="px-4 py-2 text-center text-sm">₦23,345</td>
                <td className="px-4 py-2 text-center text-sm">
                  <Button
                    className={`rounded-none w-full text-sm ${
                      mockClaim.status === "Paid"
                        ? "bg-[#E0FFED] text-[#00752F]"
                        : mockClaim.status === "Pending"
                        ? "bg-[#FFB82E26] text-[#FFB82E]"
                        : "bg-[#FFE5DB] text-[#FF4602]"
                    }`}
                  >
                    {mockClaim.status}
                  </Button>
                </td>
                <td className="px-4 py-2 text-center text-sm">2025-01-15</td>
                <td className="px-4 py-3 text-sm text-center ">
                  <Button
                    className="border border-blue-600 text-blue-600 rounded-none text-sm flex items-center gap-1"
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewDetails(mockClaim)}
                  >
                    More <ChevronDown className="w-3 h-3" />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F6FA] flex flex-col lg:flex-row overflow-x-hidden">
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

        <div className="p-4">
          <div className="border-b border-[#D7F0FF59] mb-4">
<nav className="flex space-x-4 overflow-x-auto no-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-[7px] md:text-sm font-medium border-b-2 transition-colors duration-200 ${
                    activeTab === tab
                      ? "border-[#004AAD] text-[#004AAD]"
                      : "border-transparent text-gray-500 hover:text-[#004AAD] hover:border-[#004AAD]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          {renderTabContent()}
        </div>
      </div>
        {isModalOpen && (
  <RepairClaimModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
)}
    </div>
  );
};

export default CustomerDetailsPage;
