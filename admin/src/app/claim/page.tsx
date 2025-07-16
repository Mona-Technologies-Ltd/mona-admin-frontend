"use client";
import { useState, useEffect } from "react";
import {  ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import ClaimDetailsModal from "@/components/ClaimDetailsModal";
import TrackProgressModal from "@/components/TrackProgressModal";
// import data from "@/components/claims_data_array.json";


export interface Claim {
  id: number;
  claimId: string;
  deviceModel: string;
  brand: string;
  issue: string;
  imei: string;
  amount: string;
  insurer: string;
  date: string;
  status: string;
  category: string; // <- ✅ ADD THIS
  createdAt: string;
}



export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [searchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeClaimCategory, setActiveClaimCategory] = useState("approved");
const [isTrackProgressModalOpen, setIsTrackProgressModalOpen] = useState(false);

  const [claims, setClaims] = useState<Claim[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const itemsPerPage = 10;
console.log(isVideoModalOpen)


useEffect(() => {
  const fetchClaims = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/mock/claims_data_array.json"); // ✅ correct path
      if (!res.ok) throw new Error("Failed to load mock claims data");

      const data: Claim[] = await res.json();
      setClaims(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Mock data loading failed.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  fetchClaims();
}, [activeClaimCategory]);

  const filteredClaims = claims.filter((claim) => {
    // const matchesTab =
    //   activeClaimCategory === "all"
    //     ? true
    //     : claim.status.toLowerCase() === activeClaimCategory.toLowerCase();
    const matchesTab =
  activeClaimCategory === "all"
    ? true
    : (claim.category || "").toLowerCase() === activeClaimCategory.toLowerCase();

    const matchesSearch = searchQuery
      ? claim.claimId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        claim.deviceModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        claim.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        claim.deviceModel.includes(searchQuery)
      : true;

    const matchesStatus =
      statusFilter === "" || statusFilter === "all"
        ? true
        : claim.status.toLowerCase() === statusFilter.toLowerCase();

    const matchesDate =
      dateFilter === "" || dateFilter === "all"
        ? true
        : false; //checkDateMatch(claim.date, dateFilter);

    return matchesTab && matchesSearch && matchesStatus && matchesDate;
  });

  const totalPages = Math.ceil(filteredClaims.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedClaims = filteredClaims.slice(
    startIndex,
    startIndex + itemsPerPage
  );


  const handleCategoryChange = (category: string) => {
    setActiveClaimCategory(category);
    setCurrentPage(1);
  };

  const handleViewDetails = (claim: Claim) => {
    setSelectedClaim(claim);
    setIsClaimModalOpen(true);
  };

  // const handleTrackProgress = (claim: Claim) => {
  //   setSelectedClaim(claim);
  //   setIsClaimModalOpen(true);
  // };
const handleTrackProgress = (claim: Claim) => {
  setSelectedClaim(claim);
  setIsTrackProgressModalOpen(true);
};
const handleCloseTrackModal = () => {
  setIsTrackProgressModalOpen(false);
};

  const handleWatchVideo = () => {
    setIsVideoModalOpen(true);
  };

  const handleCloseClaimModal = () => {
    setIsClaimModalOpen(false);
    setSelectedClaim(null);
  };

  // const handleCloseVideoModal = () => {
  //   setIsVideoModalOpen(false);
  // };
const getStatusBadge = (status: string) => {
  if (!status || status.trim() === "") return null;

  let badgeClass =
    "block w-[90%] text-center px-0 py-1 text-xs font-medium rounded-none";

  switch (status.toLowerCase()) {
    case "approved":
      badgeClass += " bg-[#E8F2FF59] text-[#004AAD]";
      break;
    case "pending":
      badgeClass += " bg-[#E3A40526] text-[#FFB82E]";
      break;
    case "completed":
      badgeClass += " bg-[#3471211A] text-[#439F6E]";
      break;
    case "rejected":
      badgeClass += " bg-[#FFE5DB] text-[#FF4602]";
      break;
    case "uncategorized":
      badgeClass += " bg-[#BDBDBE59] text-[#8A8894]";
      break;
    default:
      badgeClass += " bg-gray-100 text-gray-800";
  }

  return <Badge className={badgeClass}>{status}</Badge>;
};



  const shouldHideStatus = activeClaimCategory === "uncategorized";

  useEffect(() => {
    setCurrentPage(1);
  }, [activeClaimCategory]);
  if (error) {
    return (
      <div className="min-h-screen bg-[#F5F6FA] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Claims</h2>
          <p className="text-gray-600">Unable to load claims data. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F6FA] flex flex-col lg:flex-row">
      
      <DashboardSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        activeDeviceCategory=""
        setActiveDeviceCategory={() => {}}
        activeClaimCategory={activeClaimCategory}
        setActiveClaimCategory={handleCategoryChange}
      />
       
      
      {/* Main content and table rendering remain unchanged from your previous code */}
      <main className="flex-1 px-4 py-4 sm:px-6 lg:px-8">
                 <DashboardHeader
                          title="Claims"
                          // subtitle={activeTab}
                          sidebarOpen={sidebarOpen}
                          setSidebarOpen={setSidebarOpen}
                        />
          {/* Filters and Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
             
              
            {/* Date Picker Input */}
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-40 border border-gray-300 rounded-none px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-[#004AAD] focus:outline-none"
            />

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32 rounded-none border-gray-300 bg-white focus:ring-2 focus:ring-[#004AAD] focus:border-transparent">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="under review">Under Review</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32 rounded-none border-gray-300 bg-white focus:ring-2 focus:ring-[#004AAD] focus:border-transparent">
                  <SelectValue placeholder="Insurer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Insurer</SelectItem>
                  <SelectItem value="approved">Axa Mansard </SelectItem>
                  <SelectItem value="pending">Axa Mansard</SelectItem>
                  <SelectItem value="completed">Axa Mansard</SelectItem>
                  <SelectItem value="rejected">Axa Mansard</SelectItem>
                  <SelectItem value="under review">Axa Mansard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* <Button className="bg-[#004AAD] hover:bg-blue-700 text-white rounded-none">
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button> */}
          </div>

          {/* Table */}
          <div className="bg-[#F5F6FA] overflow-hidden p-4">
            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-gray-500">Loading claims...</div>
                </div>
              ) : (
                // <table className="w-full border-separate border-spacing-y-3">
                  // <table className="w-full table-fixed">
                          <table className="w-full border-separate border-spacing-y-3 ">

              <thead className="bg-[#C8C9D359] border-b border-gray-200]">
                    <tr>
                      <th className="px-4 lg:px-6 py-3 text-center text-xs capitalize font-medium text-[#000712] tracking-wider">
                        Claim ID
                      </th>
                      <th className="px-2 lg:px-2 py-3 text-center text-xs capitalize font-medium text-[#000712] tracking-wider">
                        Device Model
                      </th>
                      <th className="px-4 lg:px-6 py-3 text-center text-xs capitalize font-medium text-[#000712] tracking-wider">
                        Brand
                      </th>
                      <th className="px-4 lg:px-6 py-3 text-center text-xs capitalize font-medium text-[#000712] tracking-wider">
                        Issue
                      </th>
                       {!shouldHideStatus && (
                        <th className="px-4 lg:px-6 py-3 text-center text-xs capitalize font-medium text-[#000712] tracking-wider">
                        Amount
                      </th>
                      )}
                      
                       <th className="px-4 lg:px-6 py-3 text-center text-xs capitalize font-medium text-[#000712] tracking-wider">
                          Status
                        </th>
                      {/* {!shouldHideStatus && (
                        <th className="px-4 lg:px-6 py-3 text-center text-xs capitalize font-medium text-[#000712] tracking-wider">
                          Status
                        </th>
                      )} */}
                      <th className="px-4 lg:px-6 py-3 text-center text-xs capitalize font-medium text-[#000712] tracking-wider">
                        Insurer
                      </th>
                      <th className="px-4 lg:px-6 py-3 text-center text-xs capitalize font-medium text-[#000712] tracking-wider">
                        Date
                      </th>
                      <th className="px-4 lg:px-6 py-3 text-center text-xs capitalize font-medium text-[#000712] tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {displayedClaims.length === 0 ? (
                      <tr>
                        <td
                          colSpan={shouldHideStatus ? 8 : 9}
                          className="px-4 lg:px-6 py-12 text-center text-gray-500"
                        >
                          No claims found for the selected category and filters.
                        </td>
                      </tr>
                    ) : (
                      displayedClaims.map((claim) => (
                        <tr
                          key={claim.id}
                          className="border-b border-gray-200 hover:bg-gray-50 bg-white shadow-sm hover:shadow-md transition"

                          // className="bg-white shadow-sm hover:shadow-md transition-shadow"
                        >
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                            {claim.claimId}
                          </td>
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                            {claim.deviceModel}
                          </td>
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                            {claim.brand}
                          </td>
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                            {claim.issue}
                          </td>
                         
                           {!shouldHideStatus && (
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                            {claim.amount}
                          </td>


                          )}
                          {/* {!shouldHideStatus && (
                         <td className="px-4 lg:px-6 py-4 whitespace-nowrap w-[100px]">
                          <div className="w-[100px] flex items-center justify-center">
                            {getStatusBadge(claim.status)}
                          </div>
                        </td>


                          )} */}
                           <td className="px-4 lg:px-6 py-4 whitespace-nowrap w-[100px]">
                          <div className="w-[100px] flex items-center justify-center">
                            {getStatusBadge(claim.status)}
                          </div>
                        </td>
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                            {claim.insurer}
                          </td>
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                            {claim.date}
                          </td>
                         <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                <Button
                                     variant="outline" 
                          size="sm"
                                    // className="text-[#004AAD] hover:text-blue-700 p-0 h-auto font-medium"
                                       className="text-[#004AAD] border border-blue-600 hover:bg-blue-50 rounded-none"

                                >
                                    More
                                    </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleViewDetails(claim)}>
                                        View detail
                                    </DropdownMenuItem>
                                   <DropdownMenuItem onClick={() => handleTrackProgress(claim)}>
  Track Progress
</DropdownMenuItem>

                                
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </td>

                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-medium">
                {Math.min(startIndex + 1, filteredClaims.length)}-{Math.min(startIndex + itemsPerPage, filteredClaims.length)}
              </span>{" "}
              of <span className="font-medium">{filteredClaims.length}</span> results
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="rounded-none"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1;
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={`rounded-none ${
                      currentPage === page
                        ? "bg-[#004AAD] text-white hover:bg-blue-700"
                        : ""
                    }`}
                  >
                    {page}
                  </Button>
                );
              })}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="rounded-none"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </main>
        {/* Modals */}
      <ClaimDetailsModal
        claim={selectedClaim}
        isOpen={isClaimModalOpen}
        onClose={handleCloseClaimModal}
        onWatchVideo={handleWatchVideo}
        onTrackProgress={() => handleTrackProgress(selectedClaim!)}
      />
      <TrackProgressModal
  isOpen={isTrackProgressModalOpen}
  onClose={handleCloseTrackModal}
  claim={selectedClaim}
/>

    </div>
  );
}
