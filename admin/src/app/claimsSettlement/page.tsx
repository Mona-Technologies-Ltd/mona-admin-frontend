"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Printer, Search, ChevronDown } from "lucide-react"
import DashboardHeader from "@/components/DashboardHeader"
import DashboardSidebar from "@/components/DashboardSidebar"
import RepairClaimModal from "@/components/RepairClaimModal"

const claimsData = new Array(40).fill(null).map((_, i) => ({
  id: `#000${i + 1}`,
  brand: "iPhone",
  model: "iPhone 13 Pro MAX 1",
  issueType: "Damaged Screen",
  amount: "#23,345",
  partner: ["Axa Mansard", "Coronation", "Paid by Mona"][i % 3],
  status: ["Pending", "Approved", "Paid", "Paid by Mona", "Queried"][i % 5],
  created: "2025-01-15"
}))

const reconciliationData = claimsData.map(c => ({
  ...c,
  claimAmount: c.amount,
  paidByInsurer: c.amount,
  balance: c.amount,
}))

const paymentsData = claimsData.map((c, i) => ({
  sn: `0${i + 1}`,
  reference: "DWERTY900B",
  approvedClaims: 5,
  amount: c.amount,
  dv: ["Upload", "Signed", "Unsigned"][i % 3],
  paymentStatus: ["Pending", "Paid", "Paid"][i % 3],
  confirmedBy: "John",
  date: c.created,
  partner: c.partner
}))

export default function ClaimsSettlementPage() {
  const [activeTab, setActiveTab] = useState<"Claims" | "Reconciliation" | "Payments">("Claims")
  const [activePartner, setActivePartner] = useState("Axa Mansard")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [dateFilter, setDateFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const pageSize = 10

  const filteredClaims = claimsData.filter(claim => {
    const statusMatch = statusFilter ? claim.status === statusFilter : true
    const partnerMatch = claim.partner === activePartner
    return statusMatch && partnerMatch
  })
  const paginatedClaims = filteredClaims.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  const totalPages = Math.ceil(filteredClaims.length / pageSize)

  const filteredReconciliation = reconciliationData.filter(claim => claim.partner === activePartner)
  const filteredPayments = paymentsData.filter(item => item.partner === activePartner)

  const renderPagination = (total: number) => (
    <div className="flex justify-between items-center p-4 border-t bg-white text-sm">
      <div>Showing {(currentPage - 1) * pageSize + 1} – {Math.min(currentPage * pageSize, total)} of {total}</div>
      <div className="flex items-center space-x-1">
        <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}><ChevronLeft className="w-4 h-4" /></Button>
        {[...Array(totalPages).keys()].slice(0, 3).map(p => (
          <Button key={p} onClick={() => setCurrentPage(p + 1)} variant={p + 1 === currentPage ? "default" : "outline"} size="sm">{p + 1}</Button>
        ))}
        <Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}><ChevronRight className="w-4 h-4" /></Button>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case "Claims":
        return (
          <>
            <table className="min-w-full border-separate border-spacing-y-2">
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
                      {/* <Button className="border border-blue-600 text-blue-600 rounded-none text-sm" variant="outline" size="sm">View More</Button> */}
                      <Button
                            onClick={() => setIsModalOpen(true)}
                            className="border border-blue-600 text-blue-600 rounded-none text-sm"
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


            {renderPagination(filteredClaims.length)}
          </>
        )
      case "Reconciliation":
        return (
          <>
            <table className="min-w-full border-separate border-spacing-y-2">
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
                      <Button className="border border-blue-600 text-blue-600 rounded-none text-sm" variant="outline" size="sm">View More</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {renderPagination(filteredReconciliation.length)}
          </>
        )
      case "Payments":
        return (
          <>
            <table className="min-w-full border-separate border-spacing-y-2">
              <thead className="bg-[#C8C9D359]">
                <tr>
                  {["S/N", "Reference", "Approved Claims", "Amount", "DV", "Payment Status", "Confirmed By", "Date", "Action"].map(header => (
                    <th key={header} className="text-left px-4 py-3 text-xs font-medium text-[#000712]">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredPayments.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((item, index) => (
                  <tr key={index} className="bg-white shadow-sm">
                    <td className="px-4 py-3 text-sm">{item.sn}</td>
                    <td className="px-4 py-3 text-sm">{item.reference}</td>
                    <td className="px-4 py-3 text-sm">{item.approvedClaims}</td>
                    <td className="px-4 py-3 text-sm">{item.amount}</td>
                    <td className="px-4 py-3 text-sm">
                      <Badge className={`rounded-none text-xs px-2 py-1 font-medium ${
                        item.dv === 'Signed' ? 'bg-green-100 text-green-800' :
                        item.dv === 'Unsigned' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.dv}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <Badge className={`rounded-none text-xs px-2 py-1 font-medium ${
                        item.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.paymentStatus}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm">{item.confirmedBy}</td>
                    <td className="px-4 py-3 text-sm">{item.date}</td>
                    <td className="px-4 py-3 text-sm">
                      <Button className="border border-blue-600 text-blue-600 rounded-none text-sm flex items-center gap-1" variant="outline" size="sm">
                        More <ChevronDown className="w-3 h-3" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {renderPagination(filteredPayments.length)}
          </>
        )
    }
  }

  return (
    <div className="flex min-h-screen bg-[#F5F6FA]">
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
                onClick={() => setActivePartner(name)}
                className={`px-4 py-2 text-sm rounded-none ${
                  name === activePartner ? "bg-[#E0E5F2] text-[#004AAD]" : "bg-[#F4F4F4] text-[#000]"
                }`}
              >
                {name}
              </Button>
            ))}
          </div>

          <div className="border-b mb-4 flex gap-6 text-sm">
            {["Claims", "Reconciliation", "Payments"].map(tab => (
              <button
                key={tab}
                className={`pb-2 border-b-2 ${activeTab === tab ? "border-[#004AAD] text-[#004AAD]" : "border-transparent text-gray-500"}`}
                onClick={() => setActiveTab(tab as typeof activeTab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
            <div className="relative w-full sm:w-[250px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Search here" className="pl-10 w-full rounded-none text-sm" />
            </div>
            <div className="flex gap-2">
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-28 rounded-none text-sm">
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-28 rounded-none text-sm">
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

          <div className="bg-white overflow-x-auto rounded-md">
            {renderTabContent()}
          </div>
          {isModalOpen && (
  <RepairClaimModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
)}
        </div>
      </div>
    </div>
  )
}
