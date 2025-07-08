"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";


interface SidebarItem {
  icon: string;
  label: string;
  active: boolean;
  href: string;
  children?: { label: string; key: string }[];
}

interface DashboardSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  activeDeviceCategory: string;
  setActiveDeviceCategory: (category: string) => void;
  activeClaimCategory: string;
  setActiveClaimCategory: (category: string) => void;
}


const sidebarItems: SidebarItem[] = [
  { icon: "/element-3.svg", label: "Dashboard", active: false, href: "" },
  {
    icon: "/devices.svg",
    label: "Devices",
    active: true,
    href: "device/all",
    children: [
      { label: "Approved Devices", key: "Approved Devices" },
      { label: "Awaiting Video Upload", key: "Awaiting Video Upload" },
      { label: "Awaiting Approval", key: "Awaiting Approval" },
      { label: "Awaiting Policy Upload", key: "Awaiting Policy Upload" }
    ]
  },
  { icon: "/bi_people.svg", label: "Customers", active: false, href: "customer" },
  {
    icon: "/task.svg",
    label: "Claims",
    active: false,
    href: "claim",
    children: [
      { label: "All Claims", key: "all" },
      { label: "Pending Claims", key: "pending" },
      { label: "Approved Claims", key: "approved" },
      { label: "Completed Claims", key: "completed" }, 
      { label: "Awaiting Video Upload", key: "Awaiting Video Upload" },
      { label: "Uncategorized", key: "uncategorized" },
      { label: "Rejected Claims", key: "rejected" },
    ]
  },
  { icon: "/document-text.svg", label: "Claims Settlement", active: false, href: "claimsSettlement" },
  { icon: "/note-remove.svg", label: "Queried Claims", active: false, href: "queriedClaimsContent" },
  { icon: "/buildings.svg", label: "Business Centers", active: false, href: "" },
  { icon: "/fluent_people-team-32-regular.svg", label: "Team Members", active: false, href: "" },
  { icon: "/team.svg", label: "Team Member Daily Progress", active: false, href: "" },
  { icon: "/Vector.svg", label: "Insurance Partner", active: false, href: "" },
  { icon: "/empty-wallet-time.svg", label: "Subscription", active: false, href: "" },
  { icon: "/carbon_id-management.svg", label: "Role Management", active: false, href: "" },
  { icon: "/financial.svg", label: "Sessions Management", active: false, href: "" },
  { icon: "/people.svg", label: "Manage Admin", active: false, href: "" },
  { icon: "/financial.svg", label: "Financials", active: false, href: "" },
  { icon: "/wallet-minus.svg", label: "Payments", active: false, href: "" },
  { icon: "/hugeicons_audit-02.svg", label: "Audit Trail", active: false, href: "" },
  { icon: "/setting-2.svg", label: "Support", active: false, href: "" },
  { icon: "/Frame 25.svg", label: "Account", active: false, href: "" },
  { icon: "logout.svg", label: "Logout", active: false, href: "" }
];

export default function DashboardSidebar({
  sidebarOpen,
  setSidebarOpen,
  sidebarCollapsed,
  setSidebarCollapsed,
  activeDeviceCategory,
  setActiveDeviceCategory,
  activeClaimCategory,
  setActiveClaimCategory
}: DashboardSidebarProps) {
  const [openDropdowns, setOpenDropdowns] = useState<Set<number>>(new Set());
const pathname = usePathname();

  useEffect(() => {
    const initialOpen = new Set<number>();
    sidebarItems.forEach((item, index) => {
      if (item.children) initialOpen.add(index);
    });
    setOpenDropdowns(initialOpen);
  }, []);

const toggleDropdown = (index: number) => {
  setOpenDropdowns(prev => {
    const newSet = new Set(prev);
    if (newSet.has(index)) {
      newSet.delete(index); // close the dropdown
    } else {
      newSet.add(index); // open the dropdown
    }
    return newSet;
  });
};

const router = useRouter();

  return (
    <>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className={`bg-white border-r border-gray-200 fixed lg:static inset-y-0 left-0 z-50 transform transition-all duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 ${sidebarCollapsed ? 'lg:w-16' : 'lg:w-64'} w-64`}>
        <div className="flex flex-col h-full">
          <div className="pl-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className={`flex items-center space-x-3 ${sidebarCollapsed ? 'justify-center' : ''} p-2`}>
                {sidebarCollapsed ? (
                  <img src="monaSingleLogo.png" alt="Mona Logo" style={{ maxHeight: "32px" }} />
                ) : (
                  <img src="monaHeaderLogo.svg" alt="Mona Logo" style={{ maxHeight: "32px" }} />
                )}
              </div>
              <div className="flex items-center justify-end ml-auto">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden lg:flex bg-[#004AAD] hover:bg-[#004AAD] focus:bg-[#004AAD] active:bg-[#004AAD] items-center justify-center rounded-none w-2.5 h-7 p-0"
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                >
                  {sidebarCollapsed ? (
                    <ChevronRight className="w-4 h-4 text-white" />
                  ) : (
                    <ChevronLeft className="w-4 h-4 text-white" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden bg-[#004AAD] hover:bg-[#004AAD] focus:bg-[#004AAD] active:bg-[#004AAD] flex items-center justify-center rounded-none w-2.5 h-7 p-0"
                  onClick={() => setSidebarOpen(false)}
                >
                  <X className="w-4 h-4 text-white" />
                </Button>
              </div>
            </div>
          </div>

          <nav className="flex-1 pl-4 overflow-y-auto">
            <div className="space-y-1">
              {sidebarItems.map((item, index) => {
                const isActive = pathname === `/${item.href}`;

               return (
                <div key={index}>
                  <div
                    className={`flex items-center space-x-3 py-2 cursor-pointer transition-colors ${
                      isActive ? 'bg-[#004AAD] text-white rounded-none' : 'text-gray-700 hover:bg-gray-50 px-3 rounded-lg'
                    } ${sidebarCollapsed ? 'justify-center' : 'pl-0 pr-0'}`}
                    // onClick={() => item.children ? toggleDropdown(index) : null}
                    onClick={() => {
                        if (item.children) {
                          toggleDropdown(index);
                        } else {
                          setSidebarOpen(false); // Close sidebar on mobile
                        }
                      }}

                  >
                    {/* <img src={item.icon} alt={`${item.label} icon`} className="w-5 h-5" /> */}
                      <img
                        src={item.icon}
                        alt={`${item.label} icon`}
                        className={`w-5 h-5 transition duration-200 ${
                          isActive ? 'filter brightness-0 invert' : ''
                        }`}
                      />

                    {!sidebarCollapsed && (
                      <>
                        <Link href={`/${item.href}`} className="flex-1 text-sm font-medium hover:underline">
                          {item.label}
                        </Link>
                        {item.children && (
                          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                            openDropdowns.has(index) ? 'rotate-180' : ''
                          }`} />
                        )}
                      </>
                    )}
                  </div>

                  {item.children && openDropdowns.has(index) && !sidebarCollapsed && (
                    <div className="ml-6 mt-1 space-y-1 transition-all duration-300 overflow-hidden">
                      {item.children.map((child, childIndex) => {
                        const isClaim = item.label === "Claims";
                        const isActive = isClaim
                          ? activeClaimCategory === child.key
                          : activeDeviceCategory === child.key;

                        return (
                          <div
                            key={childIndex}
                            className={`flex items-center px-3 py-1 rounded text-sm cursor-pointer ${
                              isActive
                                ? 'text-[#004AAD] font-semibold bg-blue-50'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                           
                           onClick={() => {
                if (isClaim) {
                  setActiveClaimCategory(child.key);
                  router.push(`/claim?category=${encodeURIComponent(child.key)}`);
                } else if (pathname.startsWith("/device")) {
  router.push(`/device/${encodeURIComponent(child.key)}`);
}

                setSidebarOpen(false);
              }}


                          >
                            <span className="w-2 h-2 rounded-full bg-current mr-3"></span>
                            {child.label}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )})}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
