"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Search, ChevronDown } from "lucide-react"
import DashboardHeader from "@/components/DashboardHeader"
import DashboardSidebar from "@/components/DashboardSidebar"
import RepairClaimModal, { ClaimData } from "@/components/RepairClaimModal"
import { Menu as HeadlessMenu, Transition } from '@headlessui/react';
import { Fragment } from "react"
import UploadSignedDVModal from "@/components/UploadSignedDVModal"
import { claimsData, paidByMonaData, paymentsData } from "@/utils/info"
import { DatePicker } from 'antd';
// import type { DateRange } from 'antd/es/date-picker';
import dayjs from '@/utils/dayjs'; // adjust path as needed


const reconciliationData = claimsData.map(c => ({
  ...c,
  claimAmount: c.amount,
  paidByInsurer: c.amount,
  balance: c.amount,
}))

export default function ClaimsSettlementPage() {
  const [activeTab, setActiveTab] = useState<"Claims" | "Reconciliation" | "Payments">("Claims")
  const [activePartner, setActivePartner] = useState("Axa Mansard")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  // const [dateFilter, setDateFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isUploadDVModalOpen, setIsUploadDVModalOpen] = useState(false);
const [showPaidByMonaTable, setShowPaidByMonaTable] = useState(false);
// const [selectedClaim, setSelectedClaim] = useState<ClaimData | null>(null);
// console.log(selectedClaim)
  // const pageSize = 10
const { RangePicker } = DatePicker;

const [dateRange, setDateRange] = useState<(dayjs.Dayjs | null)[] | null>(null);

  const filteredClaims = claimsData.filter(claim => {
    const statusMatch = statusFilter ? claim.status === statusFilter : true
    const partnerMatch = claim.partner === activePartner
    return statusMatch && partnerMatch
  })
  const paginatedClaims = filteredClaims.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  // const totalPages = Math.ceil(filteredClaims.length / pageSize)
console.log(dateRange)
  const filteredReconciliation = reconciliationData.filter(claim => claim.partner === activePartner)
  // const filteredPayments = paymentsData.filter(item => item.partner === activePartner)
  const filteredPayments = paymentsData; // show all

const [currentPageMona, setCurrentPageMona] = useState(1)
// const pageSize = 10
const paidByMonaTotal = paidByMonaData.length;
const totalPagesMona = Math.ceil(paidByMonaTotal / pageSize);
// When the user clicks a claim card or row:

  const renderPagination = (total: number) => {
    const totalPages = Math.ceil(total / pageSize)
    return (
      <div className="flex flex-wrap items-center justify-between p-4 border-t bg-white text-sm">
        <div>
          Showing {(currentPage - 1) * pageSize + 1} – {Math.min(currentPage * pageSize, total)} of {total}
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="border rounded-none bg-gray-200"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
         
          {[...Array(Math.min(4, totalPages))].map((_, idx) => {
            const pageNum = idx + 1;
            const isActive = pageNum === currentPage;

            return (
              <Button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                size="icon"
                className={`rounded-none transition-colors ${
                  isActive
                    ? "bg-[#004AAD] !text-white hover:!bg-[#004AAD] hover:!text-white"
                    : "bg-transparent text-gray-700 hover:bg-gray-200 hover:text-[#004AAD]"
                }`}
              >
                {pageNum}
              </Button>
            );
          })}

          {totalPages > 5 && (
            <>
              <span className="px-1 text-gray-500">...</span>
              <Button
                onClick={() => setCurrentPage(totalPages)}
                size="icon"
                className={`rounded-none ${
                  totalPages === currentPage ? "bg-[#004AAD] text-white hover:!bg-[#004AAD] hover:!text-white" : "bg-transparent text-gray-700"
                }`}
              >
                {totalPages}
              </Button>
            </>
          )}
          <Button
            variant="ghost"
            size="icon"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="border rounded-none bg-blue-50"
          >
            <ChevronRight className="w-4 h-4 text-[#004AAD]" />
          </Button>

          <div className="ml-2 border border-gray-300 rounded-sm text-gray-700 text-sm px-2 py-[5px] flex items-center">
            <select
              className="bg-transparent outline-none pr-1"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value))
                setCurrentPage(1)
              }}
            >
              {[10, 20, 30, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span className="ml-1 text-gray-500">/ Page</span>
          </div>
        </div>
      </div>
    )
  }
  const renderTabContent = () => {
    switch (activeTab) {
      case "Claims":
        return (
          <div className="bg-[#F5F6FA]">
            <table className="min-w-full border-separate border-spacing-y-3">
              <thead className="bg-[#C8C9D359]">
                <tr>
                  {["Claim ID", "Device Brand", "Model", "Issue Type", "Amount", "Status", "Date Created", "Action"].map(header => (
                    <th key={header} className="text-center px-4 py-3 text-xs font-medium text-[#000712]">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedClaims.map((claim, index) => (
                  <tr key={index} className="bg-white shadow-sm">
                    <td className="px-4 py-3 text-sm text-center">{claim.id}</td>
                    <td className="px-4 py-3 text-sm text-center">{claim.brand}</td>
                    <td className="px-4 py-3 text-sm text-center">{claim.model}</td>
                    <td className="px-4 py-3 text-sm text-center">{claim.issueType}</td>
                    <td className="px-4 py-3 text-sm text-center">{claim.amount}</td>
                   <td className="px-4 py-3 text-sm text-center">
                        <div className="w-[120px]">
                          <Badge className={`w-full block text-center rounded-none text-xs px-2 py-1 font-medium ${
                            claim.status === 'Pending' ? 'bg-[#FFB82E26] text-[#FFB82E]' :
                            claim.status === 'Approved' ? 'bg-[#DCEBFF] text-[#004AAD]' :
                            claim.status === 'Paid' ? 'bg-[#E0FFED] text-[#00752F]' :
                            claim.status === 'Paid by Mona' ? 'bg-[#DCEBFF] text-[#004AAD]' :
                            claim.status === 'Queried' ? 'bg-[#FFE5DB] text-[#FF4602]' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {claim.status}
                          </Badge>
                        </div>
                      </td>

                    <td className="px-4 py-3 text-sm text-center">{claim.created}</td>
                    <td className="px-4 py-3 text-sm text-center">
                      {/* <Button className="border border-[#004AAD]text-[#004AAD]rounded-none text-sm" variant="outline" size="sm">View More</Button> */}
                      <Button
                            onClick={() => setIsModalOpen(true)}
                            className="border border-[#004AAD] !text-[#004AAD] hover:bg-[#004AAD] hover:!text-[#fff]  rounded-none text-sm"
                            variant="outline"
                            size="sm"
                            >
                            View More
                    </Button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>


            {/* {renderPagination(filteredClaims.length)} */}
                        {renderPagination(filteredClaims.length)}

          </div>
        )
      case "Reconciliation":
        return (
          <div className="bg-[#F5F6FA]">
            <table className="min-w-full border-separate border-spacing-y-3">
              <thead className="bg-[#C8C9D359]">
                <tr>
                  {["Claim ID", "Device Brand", "Model", "Claim Amount", "Paid by Insurer", "Balance", "Status", "Date Created", "Action"].map(header => (
                    <th key={header} className="text-center px-4 py-3 text-xs font-medium text-[#000712]">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredReconciliation.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((claim, index) => (
                  <tr key={index} className="bg-white shadow-sm">
                    <td className="px-4 py-3 text-sm text-center">{claim.id}</td>
                    <td className="px-4 py-3 text-sm text-center">{claim.brand}</td>
                    <td className="px-4 py-3 text-sm text-center">{claim.model}</td>
                    <td className="px-4 py-3 text-sm text-center">{claim.claimAmount}</td>
                    <td className="px-4 py-3 text-sm text-center">{claim.paidByInsurer}</td>
                    <td className="px-4 py-3 text-sm text-center">{claim.balance}</td>
                    <td className="px-4 py-3 text-sm">
  <div className="w-[120px]">
    <Badge className={`w-full block text-center rounded-none text-xs px-2 py-1 font-medium ${
      claim.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
      claim.status === 'Approved' ? 'bg-blue-100 text-blue-800' :
      claim.status === 'Paid' ? 'bg-green-100 text-green-800' :
      claim.status === 'Paid by Mona' ? 'bg-[#E6F4F9] text-[#1B6A9D]' :
      'bg-red-100 text-red-800'
    }`}>
      {claim.status}
    </Badge>
  </div>
</td>

                    <td className="px-4 py-3 text-sm text-center">{claim.created}</td>
                    <td className="px-4 py-3 text-sm text-center">
                      <Button className="border border-[#004AAD] !text-[#004AAD] rounded-none text-sm hover:bg-[#004AAD] hover:!text-[#fff]" variant="outline" size="sm">View More</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* {renderPagination(filteredReconciliation.length)} */}
                        {renderPagination(filteredReconciliation.length)}

          </div>
        )
      case "Payments":
        

        return (
          <div className="bg-[#F5F6FA]">
            <table className="min-w-full border-separate border-spacing-y-3">
              <thead className="bg-[#C8C9D359]">
                <tr>
                  {["S/N", "Reference", "Approved Claims", "Amount", "DV", "Payment Status", "Confirmed By", "Date", "Action"].map(header => (
                    <th key={header} className="text-center px-4 py-3 text-xs font-medium text-[#000712]">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
            {filteredPayments.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((item, index) => {
              // console.log(item.dv, item.paymentStatus)
              return(
              <tr key={index} className="bg-white shadow-sm">
                <td className="px-4 py-3 text-sm text-center">{item.sn}</td>
                <td className="px-4 py-3 text-sm text-center">{item.reference}</td>
                <td className="px-4 py-3 text-sm text-center">{item.approvedClaims}</td>
                <td className="px-4 py-3 text-sm text-center">{item.amount}</td>
                <td className="px-4 py-3 text-sm text-center">

                  <Badge className={`w-full rounded-none text-xs px-2 py-1 font-medium text-center ${
                  item.dv?.toLowerCase() === 'signed' ? 'bg-white text-[#439F6E] border border-[#439F6E]' :
                  item.dv?.toLowerCase() === 'unsigned' ? 'bg-white text-[#E52626] border border-[#E52626]' :
                  item.dv?.toLowerCase() === 'upload' ? 'bg-white text-[#FFB82E] border border-[#FFB82E]' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {item.dv}
                </Badge>


                </td>
                <td className="px-4 py-3 text-sm">
                  <Badge className={`w-full rounded-none text-xs px-2 py-1 font-medium ${
                  item.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' :
                  item.paymentStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  item.paymentStatus === 'Failed' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {item.paymentStatus}
                </Badge>
                </td>
                <td className="px-4 py-3 text-sm text-center">{item.confirmedBy}</td>
                <td className="px-4 py-3 text-sm text-center">{item.date}</td>
                
                                  <td className="px-4 py-3 text-center">
                                      <HeadlessMenu as="div" className="relative inline-block text-center">
                                        <div>
                                          <HeadlessMenu.Button className="inline-flex justify-center items-center w-full border border-[#004AAD]  !text-[#004AAD] rounded-none  px-3 py-1.5 text-sm font-medium  bg-[#ffff] hover:bg-[#004AAD] hover:!text-[#fff] focus:outline-none">
                                            More
                                            <ChevronDown className="w-4 h-4 ml-2" />
                                          </HeadlessMenu.Button>
                                        </div>
                
                                        <Transition
                                           as={Fragment}
                                           enter="transition ease-out duration-100"
                                           enterFrom="transform opacity-0 scale-95"
                                           enterTo="transform opacity-100 scale-100"
                                          leave="transition ease-in duration-75"
                                          leaveFrom="transform opacity-100 scale-100"
                                          leaveTo="transform opacity-0 scale-95"
                                        >
                                                          <HeadlessMenu.Items className="absolute right-0 md:-right-6 mt-2 w-60 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-none shadow-lg focus:outline-none z-50">
                                                            <div className="py-1">
                                                              <HeadlessMenu.Item>
                                                                {({ active }) => (
                                                                  <button
                                                                    className={`${
                                                                      active ? "bg-gray-100" : ""
                                                                    } block w-full px-4 py-2 text-sm text-gray-700`}
                                                                    onClick={() => setIsModalOpen(true)} // ✅ Add this line

                                                                  >
                                                                    View Invoice
                                                                  </button>
                                                                )}
                                                              </HeadlessMenu.Item>
                                                             
                                                              <HeadlessMenu.Item>
                                                                {({ active }) => (
                                                                  <button
                                                                    className={`${
                                                                      active ? "bg-gray-100" : ""
                                                                    } block w-full px-4 py-2 text-sm text-gray-700`}
                                                                  >
                                                                    View Unsigned DV
                                                                  </button>
                                                                )}
                                                              </HeadlessMenu.Item>
                                                                        <HeadlessMenu.Item>
                                                                              {({ active }) => (
                                                                                <button
                                                                                  onClick={() => setIsUploadDVModalOpen(true)}
                                                                                  className={`${
                                                                                    active ? "bg-gray-100" : ""
                                                                                  } block w-full px-4 py-2 text-sm text-gray-700`}
                                                                                >
                                                                                  Upload Signed DV
                                                                                </button>
                                                                              )}
                                                                          </HeadlessMenu.Item>        

                                                              <HeadlessMenu.Item>
                                                                {({ active }) => (
                                                                  <button
                                                                    className={`${
                                                                      active ? "bg-gray-100" : ""
                                                                    } block w-full px-4 py-2 text-sm text-gray-700`}
                                                                  >
                                                                    View Proof of Payment
                                                                  </button>
                                                                )}
                                                              </HeadlessMenu.Item>
                                                              <HeadlessMenu.Item>
                                                                {({ active }) => (
                                                                  <button
                                                                    className={`${
                                                                      active ? "bg-gray-100" : ""
                                                                    } block w-full px-4 py-2 text-sm text-gray-700`}
                                                                  >
                                                                    Confirm payment
                                                                  </button>
                                                                )}
                                                              </HeadlessMenu.Item>
                                                            </div>
                                                          </HeadlessMenu.Items>
                                                        </Transition>

                                      </HeadlessMenu>
                                    </td>
              </tr>
            )})}
              </tbody>
            </table>
            {/* {renderPagination(filteredPayments.length)} */}
                        {renderPagination(filteredPayments.length)}

          </div>
        )
    }
  }

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
          title="Claims Settlement"
          subtitle={activeTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="p-4">
          <div className="mb-4 flex flex-wrap gap-2">
            {["Axa Mansard", "Coronation", "Paid by Mona"].map(name => (
              <Button
                key={name}
                onClick={() => {
                      setActivePartner(name);
                      setShowPaidByMonaTable(name === "Paid by Mona"); // << KEY CHANGE
                    }}                className={`px-4 py-2 text-sm rounded-none hover:bg-[#004AAD] hover:!text-white ${
                  name === activePartner ? "!bg-[#004AAD] !text-[#F4F4F4]" : "bg-[#F4F4F4] text-[#000]"
                }`}
              >
                {name}
              </Button>
            ))}
          </div>

          {showPaidByMonaTable ? (
  <>
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      {/* Left side: title only */}
      <div className="text-xl font-semibold">Paid by Mona</div>

      {/* Right side: filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <div className="relative w-[200px] sm:w-[250px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input placeholder="Search here" className="pl-10 w-full rounded-none text-sm border-[#DBEBFF] bg-[#E8F2FF59]" />
        </div>

        <div className="flex gap-2">
              <RangePicker
                onChange={(dates) => setDateRange(dates)}
                format="MM/DD/YYYY"
                className="border border-gray-300 !rounded-none px-3 py-2 text-sm focus:ring-2 focus:ring-[#004AAD] focus:outline-none"
              />

        </div>


        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36 rounded-none text-sm bg-white">
            <SelectValue placeholder="Resolved by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="John Doe">John Doe</SelectItem>
            <SelectItem value="Zero Balance">Zero Balance</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>

    <div className="bg-white overflow-x-auto rounded-none">
      <table className="min-w-full border-separate border-spacing-y-3">
        <thead className="bg-[#C8C9D359]">
          <tr>
            {["Claim ID", "Device Model", "Brand", "Issue", "Amount", "Status", "Resolved by", "Date", "Action"].map(header => (
              <th key={header} className="text-center px-4 py-3 text-xs font-medium text-[#000712]">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
{paidByMonaData
  .slice((currentPageMona - 1) * pageSize, currentPageMona * pageSize)
  .map((claim, index) => (
    <tr key={index} className="bg-white shadow-sm">
      <td className="px-4 py-3 text-sm text-center">{claim.id}</td>
      <td className="px-4 py-3 text-sm text-center">{claim.model}</td>
      <td className="px-4 py-3 text-sm text-center">{claim.brand}</td>
      <td className="px-4 py-3 text-sm text-center">{claim.issue}</td>
      <td className="px-4 py-3 text-sm text-center font-bold">{claim.amount}</td>
      <td className="px-4 py-3 text-sm text-center">
        <Badge className="bg-[#DBEBFF] text-[#048EDD] w-full block text-center rounded-none text-xs px-2 py-1 font-medium">
          {claim.status}
        </Badge>
      </td>
      <td className="px-4 py-3 text-sm text-center">{claim.resolvedBy}</td>
      <td className="px-4 py-3 text-sm text-center">{claim.date}</td>
      <td className="px-4 py-3 text-sm text-center">
        <Button
          onClick={() => setIsModalOpen(true)}
          className="border border-[#004AAD] hover:bg-[#004AAD] rounded-none hover:!text-white !text-[#004AAD] text-sm"
          variant="outline"
          size="sm"
        >
          View More
        </Button>
      </td>
    </tr>
))}

        </tbody>
      </table>
      <div className="flex flex-wrap items-center justify-between p-4 border-t bg-white text-sm">
  <div>
Showing {(currentPageMona - 1) * pageSize + 1} to {Math.min(currentPageMona * pageSize, paidByMonaTotal)} of {paidByMonaTotal} results
  </div>
  <div className="flex items-center space-x-2">
    <Button
      variant="ghost"
      size="icon"
      disabled={currentPageMona === 1}
      onClick={() => setCurrentPageMona(currentPageMona - 1)}
      className="border rounded-none"
    >
      <ChevronLeft className="w-4 h-4" />
    </Button>

    {[...Array(totalPagesMona)].map((_, idx) => (
      <Button
        key={idx}
        onClick={() => setCurrentPageMona(idx + 1)}
        variant={idx + 1 === currentPageMona ? "outline" : "ghost"}
        size="icon"
        className={`rounded-none ${idx + 1 === currentPageMona ? "border-[#004AAD]" : ""}`}
      >
        {idx + 1}
      </Button>
    )).slice(0, 6)}

    <Button
      variant="ghost"
      size="icon"
      disabled={currentPageMona === totalPagesMona}
      onClick={() => setCurrentPageMona(currentPageMona + 1)}
      className="border rounded-none"
    >
      <ChevronRight className="w-4 h-4" />
    </Button>
  </div>
</div>

    </div>
  </>
) : (
  <>
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      {/* Tabs */}
      <div className="flex gap-6 text-sm">
        {["Claims", "Reconciliation", "Payments"].map(tab => (
          <button
            key={tab}
            className={`pb-2 border-b-2 ${
              activeTab === tab ? "border-[#004AAD] text-[#004AAD]" : "border-transparent text-gray-500"
            }`}
            onClick={() => setActiveTab(tab as typeof activeTab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <div className="relative w-[200px] sm:w-[250px]">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
      <Input placeholder="Search here" className="pl-10 w-full rounded-none text-sm border-[#DBEBFF] bg-[#E8F2FF59] " />
    </div>

    <div className="flex gap-2">
              <RangePicker
                onChange={(dates) => setDateRange(dates)}
                format="MM/DD/YYYY"
                className="border border-gray-300 !rounded-none px-3 py-2 text-sm focus:ring-2 focus:ring-[#004AAD] focus:outline-none"
              />

        </div>

    <Select value={statusFilter} onValueChange={setStatusFilter}>
      <SelectTrigger className="w-28 rounded-none text-sm bg-white">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Pending">Pending</SelectItem>
        <SelectItem value="Approved">Approved</SelectItem>
        <SelectItem value="Paid">Paid</SelectItem>
        <SelectItem value="Paid by Mona">Paid by Mona</SelectItem>
        <SelectItem value="Queried">Queried</SelectItem>
      </SelectContent>
    </Select>
      </div>
    </div>

    <div className="bg-white overflow-x-auto rounded-none">
      {renderTabContent()}
    </div>
  </>
)}

     {isModalOpen && (
  <RepairClaimModal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    claim={claimsData[0] as ClaimData} // or any selected claim you want to display
  />
)}

        </div>
      </div>
      {isUploadDVModalOpen && (
  <UploadSignedDVModal
    isOpen={isUploadDVModalOpen}
    onClose={() => setIsUploadDVModalOpen(false)}
  />
)}

    </div>
  )
}
