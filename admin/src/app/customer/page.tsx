'use client';

import { useState } from 'react';
// import { Menu } from 'lucide-react';
import { Menu as HeadlessMenu, Transition } from '@headlessui/react';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

const customers = [
  {
    sn: "00001",
    name: "John Doe",
    city: "Abuja",
    email: "johndoe@gmail.com",
    phone: "09023456773",
    devices: 3,
    claims: 4,
  },
  {
    sn: "00002",
    name: "John Doe",
    city: "Abuja",
    email: "johndoe@gmail.com",
    phone: "09023456773",
    devices: 3,
    claims: 4,
  },
  {
    sn: "00003",
    name: "John Doe",
    city: "Abuja",
    email: "johndoe@gmail.com",
    phone: "09023456773",
    devices: 3,
    claims: 4,
  },
  {
    sn: "00004",
    name: "John Doe",
    city: "Abuja",
    email: "johndoe@gmail.com",
    phone: "09023456773",
    devices: 3,
    claims: 4,
  },
  {
    sn: "00005",
    name: "John Doe",
    city: "Abuja",
    email: "johndoe@gmail.com",
    phone: "09023456773",
    devices: 3,
    claims: 4,
  },
  {
    sn: "00006",
    name: "John Doe",
    city: "Abuja",
    email: "johndoe@gmail.com",
    phone: "09023456773",
    devices: 3,
    claims: 4,
  },
  {
    sn: "00007",
    name: "John Doe",
    city: "Abuja",
    email: "johndoe@gmail.com",
    phone: "09023456773",
    devices: 3,
    claims: 4,
  },
  {
    sn: "00008",
    name: "John Doe",
    city: "Abuja",
    email: "johndoe@gmail.com",
    phone: "09023456773",
    devices: 3,
    claims: 4,
  },
  {
    sn: "00009",
    name: "John Doe",
    city: "Abuja",
    email: "johndoe@gmail.com",
    phone: "09023456773",
    devices: 3,
    claims: 4,
  },
  {
    sn: "000010",
    name: "Michael Doe",
    city: "Abuja",
    email: "johndoe@gmail.com",
    phone: "09023456773",
    devices: 3,
    claims: 4,
  },
    {
    sn: "00001",
    name: "Solomon Doe",
    city: "Abuja",
    email: "johndoe@gmail.com",
    phone: "09023456773",
    devices: 3,
    claims: 4,
  },
  {
    sn: "00002",
    name: "Taiwo Doe",
    city: "Abuja",
    email: "johndoe@gmail.com",
    phone: "09023456773",
    devices: 3,
    claims: 4,
  },
  {
    sn: "00003",
    name: "John Doe",
    city: "Abuja",
    email: "johndoe@gmail.com",
    phone: "09023456773",
    devices: 3,
    claims: 4,
  },
  {
    sn: "00004",
    name: "John Doe",
    city: "Abuja",
    email: "johndoe@gmail.com",
    phone: "09023456773",
    devices: 3,
    claims: 4,
  },
  {
    sn: "00005",
    name: "John Doe",
    city: "Abuja",
    email: "johndoe@gmail.com",
    phone: "09023456773",
    devices: 3,
    claims: 4,
  },
  {
    sn: "00006",
    name: "John Doe",
    city: "Abuja",
    email: "johndoe@gmail.com",
    phone: "09023456773",
    devices: 3,
    claims: 4,
  },
  {
    sn: "00007",
    name: "John Doe",
    city: "Abuja",
    email: "johndoe@gmail.com",
    phone: "09023456773",
    devices: 3,
    claims: 4,
  },
  {
    sn: "00008",
    name: "John Doe",
    city: "Abuja",
    email: "johndoe@gmail.com",
    phone: "09023456773",
    devices: 3,
    claims: 4,
  },
  {
    sn: "00009",
    name: "John Doe",
    city: "Abuja",
    email: "johndoe@gmail.com",
    phone: "09023456773",
    devices: 3,
    claims: 4,
  },
  {
    sn: "000010",
    name: "John Doe",
    city: "Abuja",
    email: "johndoe@gmail.com",
    phone: "09023456773",
    devices: 3,
    claims: 4,
  },
];


export default function CustomersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeDeviceCategory, setActiveDeviceCategory] = useState('Customers');
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10;
const totalPages = Math.ceil(customers.length / itemsPerPage);

const startIndex = (currentPage - 1) * itemsPerPage;
const currentCustomers = customers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-[#F5F6FA] flex flex-col lg:flex-row">
      <DashboardSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        activeDeviceCategory={activeDeviceCategory}
        setActiveDeviceCategory={setActiveDeviceCategory}
        //         activeDeviceCategory={""}
        // setActiveDeviceCategory={() => {}}
        activeClaimCategory={""}
        setActiveClaimCategory={() => {}}
      />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-0'}`}>
        <DashboardHeader
          title="Customers"
          subtitle={activeDeviceCategory}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Content */}
        <main className="flex-1 px-4 md:px-6 py-6">
          {/* Search Bar */}
          <div className="flex justify-start items-center gap-40 mb-6">
            <h2 className="text-lg font-semibold text-[#004AAD] underline">Customers</h2>
            <input
              type="text"
              placeholder="Search here"
              className="w-full max-w-xs border border-[#DBEBFF] bg-[#E8F2FF59] rounded-none px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#004AAD]"
            />
          </div>

          {/* Table */}
          <div className="overflow-auto border border-gray-200 rounded-none bg-[#F5F6FA]">
            {/* <table className="min-w-full text-sm text-left whitespace-nowrap border-separate border-spacing-y-3"> */}
            <table className="w-full border-separate border-spacing-y-3 ">

              <thead className="bg-[#C8C9D359] border-b border-gray-200]">
                <tr className="border-b border-gray-200">
                       <th className="px-2 md:px-4 py-2 text-xs md:text-sm text-center font-medium">S/N</th>
                       <th className="px-2 md:px-4 py-2 text-xs md:text-sm text-center font-medium">Name</th>
                       <th className="px-2 md:px-4 py-2 text-xs md:text-sm text-center font-medium">City</th>
                       <th className="px-2 md:px-4 py-2 text-xs md:text-sm text-center font-medium">Email</th>
                       <th className="px-2 md:px-4 py-2 text-xs md:text-sm text-center font-medium">Phone Number</th>
                       <th className="px-2 md:px-4 py-2 text-xs md:text-sm text-center font-medium">Devices</th>
                       <th className="px-2 md:px-4 py-2 text-xs md:text-sm text-center font-medium">Claims</th>
                       <th className="px-2 md:px-4 py-2 text-xs md:text-sm text-center font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentCustomers.map((customer, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 bg-white shadow-sm hover:shadow-md transition">
                      <td className="px-4 py-2 text-center text-xs">{customer.sn}</td>
                      <td className="px-4 py-2 text-center text-xs">{customer.name}</td>
                      <td className="px-4 py-2 text-center text-xs">{customer.city}</td>
                      <td className="px-4 py-2 text-center text-xs">{customer.email}</td>
                    <td className="px-4 py-3 text-center text-[#004AAD]">{customer.phone}</td>
                      <td className="px-4 py-2 text-center text-xs">{customer.devices}</td>
                      <td className="px-4 py-2 text-center text-xs">{customer.claims}</td>
                      <td className="px-4 py-2 text-center text-xs">
                      <HeadlessMenu as="div" className="relative inline-block text-center">
                        <div>
                          <HeadlessMenu.Button className="bg-[#fff] inline-flex justify-center items-center w-full border border-[#004AAD] !text-[#004AAD] px-3 py-1.5 text-sm font-medium hover:!text-white  hover:bg-[#004AAD] focus:outline-none">
                            More
                            <ChevronDown className="w-4 h-4 ml-2" />
                          </HeadlessMenu.Button>
                        </div>

                        <Transition
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <HeadlessMenu.Items className="absolute right-0 mt-2 w-40 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-none shadow-lg focus:outline-none z-50">
                            <div className="py-1">
                              <HeadlessMenu.Item>
                                {({ active }) => (
                                    <Link href={`/customer-details`}>
                                        <button
                                    className={`${
                                      active ? 'bg-white' : ''
                                    } block w-full px-4 py-2 text-sm text-gray-700`}
                                  >
                                    View
                                  </button>
                                    </Link>
                                  
                                )}
                              </HeadlessMenu.Item>
                              <HeadlessMenu.Item>
                                {({ active }) => (
                                  <button
                                    className={`${
                                      active ? 'bg-gray-100' : ''
                                    } block w-full px-4 py-2 text-sm text-gray-700`}
                                  >
                                    Activate
                                  </button>
                                )}
                              </HeadlessMenu.Item>
                              <HeadlessMenu.Item>
                                {({ active }) => (
                                  <button
                                    className={`${
                                      active ? 'bg-gray-100' : ''
                                    } block w-full px-4 py-2 text-sm text-gray-700`}
                                  >
                                    Deactivate
                                  </button>
                                )}
                              </HeadlessMenu.Item>
                            </div>
                          </HeadlessMenu.Items>
                        </Transition>
                      </HeadlessMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center text-sm text-gray-600 mt-4">
  <span>
    Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, customers.length)} of {customers.length} results
  </span>
  <div className="flex items-center space-x-1">
    {/* Previous Button */}
    <button
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
      className="w-8 h-8  disabled:opacity-40"
    >
    <img
              src="/arrow-left.svg" // update this path
              alt="Previous"
              className="w-4 h-4 object-contain"
            />
    </button>

    {/* Page Numbers */}
    {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 6).map((num) => (
      <button
        key={num}
        onClick={() => setCurrentPage(num)}
        className={`w-8 h-8 rounded-none border text-sm ${
          num === currentPage ? 'bg-[#004AAD] !text-white' : 'border-gray-300 text-gray-600 bg-white'
        }`}
      >
        {num}
      </button>
    ))}

    {/* Next Button */}
    <button
      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages}
      className="w-8 h-8 disabled:opacity-40"
    >
       <img
              src="/arrow-right.svg" // Replace with actual path
              alt="Next"
              className="w-4 h-4 object-contain"
            />
    </button>
  </div>
</div>

        </main>
      </div>
    </div>
  );
}
