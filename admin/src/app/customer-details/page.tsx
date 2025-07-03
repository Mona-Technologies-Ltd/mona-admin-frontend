// CustomerDetailsPage Component
"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";

const CustomerDetailsPage = () => {
  const [activeTab, setActiveTab] = useState("Customer Information");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const tabs = [
    "Customer Information",
    "Customer Devices",
    "Claims",
    "Claim Settlement",
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "Customer Information":
        return (
          <div className="p-6">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                J
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold">John Doe</h2>
                <p className="text-sm text-gray-500">FCT, Abuja</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="text-lg">johndoe23@gmail.com</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                <p className="text-lg">0814 224 4432</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Date of Birth</h3>
                <p className="text-lg">24/12/1992</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">NIN</h3>
                <p className="text-lg">21232324343432</p>
              </div>
            </div>
            <div className="mt-6 flex space-x-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-md">Activate</Button>
              <Button className="bg-red-600 hover:bg-red-700 text-white rounded-md">Deactivate</Button>
            </div>
          </div>
        );
      case "Customer Devices":
        return (
          <div className="p-6">
            <table className="w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Device ID</th>
                  <th className="px-4 py-2 text-left">IMEI Number</th>
                  <th className="px-4 py-2 text-left">Brand</th>
                  <th className="px-4 py-2 text-left">Model</th>
                  <th className="px-4 py-2 text-left">Claims</th>
                  <th className="px-4 py-2 text-left">Subscription</th>
                  <th className="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {Array(3).fill(null).map((_, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">#000{index + 1}</td>
                    <td className="px-4 py-2">35679723456789</td>
                    <td className="px-4 py-2">Samsung</td>
                    <td className="px-4 py-2">Galaxy S22</td>
                    <td className="px-4 py-2">3</td>
                    <td className="px-4 py-2">
                      <Button
                        className={`rounded-md text-sm ${index % 2 === 0 ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"}`}
                      >
                        {index % 2 === 0 ? "Active" : "Inactive"}
                      </Button>
                    </td>
                    <td className="px-4 py-2">
                      <Button className="text-blue-600 border-blue-600 hover:bg-blue-100 rounded-md">
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
        return (
          <div className="p-6">
            <table className="w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Claim ID</th>
                  <th className="px-4 py-2 text-left">Device Model</th>
                  <th className="px-4 py-2 text-left">Brand</th>
                  <th className="px-4 py-2 text-left">Issue</th>
                  <th className="px-4 py-2 text-left">Amount</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {Array(5).fill(null).map((_, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">PLU37{68 + index}</td>
                    <td className="px-4 py-2">iPhone 13 Pro MAX</td>
                    <td className="px-4 py-2">iPhone</td>
                    <td className="px-4 py-2">Broken Screen</td>
                    <td className="px-4 py-2">₦25,000.00</td>
                    <td className="px-4 py-2">
                      <Button className="bg-green-100 text-green-600 rounded-md">
                        {index % 2 === 0 ? "Approved" : "Pending"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "Claim Settlement":
        return (
          <div className="p-6">
            <table className="w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Claim ID</th>
                  <th className="px-4 py-2 text-left">Device Brand</th>
                  <th className="px-4 py-2 text-left">Model</th>
                  <th className="px-4 py-2 text-left">Issue Type</th>
                  <th className="px-4 py-2 text-left">Amount</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {Array(5).fill(null).map((_, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">PLU37{68 + index}</td>
                    <td className="px-4 py-2">iPhone</td>
                    <td className="px-4 py-2">iPhone 13 Pro MAX</td>
                    <td className="px-4 py-2">Damaged Screen</td>
                    <td className="px-4 py-2">₦23,345</td>
                    <td className="px-4 py-2">
                      <Button
                        className={`rounded-md text-sm ${
                          index % 3 === 0
                            ? "bg-green-100 text-green-600"
                            : index % 3 === 1
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {index % 3 === 0
                          ? "Paid"
                          : index % 3 === 1
                          ? "Pending"
                          : "Queried"}
                      </Button>
                    </td>
                    <td className="px-4 py-2">2025-01-15</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex">
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
          <div className="border-b border-gray-200 mb-4">
            <nav className="flex space-x-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors duration-200 ${
                    activeTab === tab
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-600"
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
    </div>
  );
};

export default CustomerDetailsPage;
