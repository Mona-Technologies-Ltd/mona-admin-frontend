'use client'
export const dynamic = 'force-dynamic'; // <-- this fixes the export error
import { useState, useMemo, useEffect } from 'react';
import { Download, Youtube} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
// import { useSearchParams } from 'next/navigation';
import { Device, deviceCategories } from '@/utils/info';

const groupDevicesByCategory = (devices: Device[]) => {
  const grouped: Record<string, Device[]> = {};
  devices.forEach((device) => {
    if (!grouped[device.category]) grouped[device.category] = [];
    grouped[device.category].push(device);
  });
  return grouped;
};

export default function DeviceDetails() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);


const [category, setCategory] = useState("Approved Devices");
const [id, setId] = useState<string | null>(null);

useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const categoryParam = params.get("category");
  const idParam = params.get("id");

  if (categoryParam) setCategory(categoryParam);
  if (idParam) setId(idParam);
}, []);

  const isApproved = category === "Approved Devices";
  const isAwaitingApproval = category === "Awaiting Approval";
  const isAwaitingVideoUpload = category === "Awaiting Video Upload";
  const isAwaitingPolicyUpload = category === "Awaiting Policy Upload";

  const showVideo = !isAwaitingVideoUpload;

  const showPolicyNumber = isApproved;

  const hasClaims = isApproved || isAwaitingApproval || isAwaitingVideoUpload || isAwaitingPolicyUpload;

  const groupedDeviceData = useMemo(() => groupDevicesByCategory(deviceCategories), []);
  const activeDeviceCategory = category;
  const currentDeviceList = groupedDeviceData[category] || [];
  const currentDevice: Device | undefined = id
    ? currentDeviceList.find((device) => device.id === id)
    : currentDeviceList[0];

  if (!currentDeviceList.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-center text-gray-500 text-lg">
          No devices found for category <span className="font-bold">{category}</span>
        </p>
      </div>
    );
  }

  const currentData = {
    title: "Royal Tech Company",
    hasVideo: showVideo,
    showPolicy: showPolicyNumber,
    customerInfo: {
      fullName: currentDevice?.model || "",
      brand: currentDevice?.brand || "",
      imei: currentDevice?.imei || "",
      category: currentDevice?.category || "",
      phoneNumber: "N/A",
      email: "N/A",
    },
    claimsInfo: hasClaims
      ? {
          claimId: currentDevice?.id || "",
          date: currentDevice?.expiry || "",
          paid: currentDevice?.amount || "",
          serviceProvider: "N/A",
          status: currentDevice?.status || "Unknown",
          isActive: currentDevice?.isActive || false,
          imei: currentDevice?.imei || "",
        }
      : null,
    deviceInfo: {
      model: currentDevice?.model || "",
      brand: currentDevice?.brand || "",
      imei: currentDevice?.imei || "",
      onboardingDate: currentDevice?.expiry || "",
      deviceCondition: "New",
    },
    onboardingInfo: {
      businessId: currentDevice?.id || "",
      businessName: "N/A",
      act: "ACT",
      city: "N/A",
      stateNumber: "N/A",
      telPhoneNumber: "N/A",
    },
  };

const getStatusBgClass = (status: string) => {
  switch (status.toLowerCase()) {
    case 'received':
    case 'approved':
    case 'active':
      return 'bg-green-100';
    case 'awaiting video':
    case 'pending approval':
    case 'policy upload required':
    case 'waiting':
    case 'pending':
      return 'bg-orange-100';
    case 'rejected':
    case 'inactive':
      return 'bg-red-100';
    default:
      return 'bg-gray-200';
  }
};

const getStatusTextColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'received':
    case 'approved':
    case 'active':
      return 'text-green-700';
    case 'awaiting video':
    case 'policy upload required':
    case 'pending':
    case 'pending approval':
    case 'waiting':
      return 'text-orange-700';
    case 'rejected':
    case 'inactive':
      return 'text-red-700';
    default:
      return 'text-gray-700';
  }
};

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


      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-0'}`}>
        <DashboardHeader
          title={currentData.title}
          subtitle={activeDeviceCategory}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 p-4 lg:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 border-none shadow-none">
            {/* Left - Video/Phone Display */}
            <div style={{background:"transparent"}} className="lg:col-span-1 border-none shadow-none">
             <Card className="border-none shadow-none bg-transparent">

                <CardContent className="p-6 border-none shadow-none bg-transparent">
                  <div className="relative rounded-xl bg-transparent w-full sm:w-[20rem] h-[30rem] sm:h-[40rem] flex items-center justify-center mb-4 overflow-hidden border-none shadow-none">
                     <div className="absolute inset-0 w-[100%] border-none shadow-none" style={{background:"transparent"}}>
                            <Image
                              src="/detail_phone.svg"
                              alt="Device"
                               fill
                          className="object-contain"
                            />
                            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center border-none shadow-none'>
                                <Youtube
                          className=" w-10 h-10 md:w-16 md:h-16"
                          color="#E52626"
                        />
                        <p className='text-center text-[#8A8894]'>Click button to watch onboarding video</p>
                            </div>
                      </div>
                  </div>
                 {!isAwaitingVideoUpload && 
                 <div className='w-full flex justify-center'>
                   <Button variant="outline" className="w-[70%] mb-4 rounded-none border border-[#004AAD] text-[#004AAD]">
                    
                    Download Video
                    <Download className="w-4 h-4 mr-2" />
                  </Button>
                 </div>
                
                  }

                      {isAwaitingVideoUpload && <Button variant="outline" className="w-full mb-4 rounded-none border border-[#E52626] text-[#E52626]">
                    
                    Video not uploaded
                  </Button>}
                     {isApproved &&  <><div className="text-center">
                      <span className="text-sm text-gray-600 mb-2 mr-2.5">Policy Number</span>
                      <span className="font-medium">POU234567879</span>
                      <Button className="bg-[#004AAD] hover:bg-blue-700 text-white w-full mt-4 rounded-none">
                        View policy document
                      </Button>
                    </div>
                    </>}

                      {isAwaitingApproval &&
                                       <div className='w-full flex justify-center'>
                         <Button variant="outline" className="w-[70%] mb-4 rounded-none border border-[#E52626] text-[#E52626]" disabled={!currentData.hasVideo}>
                    Delete Video                     
                    <Download className="w-4 h-4 mr-2" />

                  </Button></div>
                      }

                {
                  isAwaitingPolicyUpload && <Button variant="outline" className="w-full mt-4 rounded-none border border-[#E52626] text-[#E52626]" >
                         policy document not uploaded
                      </Button>
                }      
                 
                </CardContent>
              </Card>
            </div>

            {/* Right Columns */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Customer Info + Device Info */}
                <div className="space-y-6 bg-[#E8F2FF73] p-3">
                  <Card style={{ borderRadius:0 }}>
                    <CardHeader>
                      <CardTitle className="text-[#004AAD] text-base md:text-lg font-bold">Customer Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm text-[#004AAD]">
                      {currentData.customerInfo && Object.entries(currentData.customerInfo).map(([label, value]) => (
                    <div key={label} className="flex justify-between">
                      <span className="text-gray-600">{label.replace(/([A-Z])/g, ' ')}</span>
                      <span className="font-medium">{String(value)}</span>
                    </div>
))}

                    </CardContent>
                  </Card>

                  <Card className="rounded-none p-0 border">
                      <CardContent className="p-0">
                        <div className="flex items-center space-x-3 px-4 py-2 border">
                          <div className="w-10 h-10 rounded-full border flex items-center justify-center">
                            <Image
                              src="/apple-logo.svg"
                              alt="Apple Logo"
                              width={20}
                              height={20}
                              className="object-contain"
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-base md:text-lg">Apple</h3>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 px-4 mb-6 mt-4">
                          {/* Add any top content here if needed */}
                        </div>

                        <div className="space-y-3 text-sm px-4 pb-4">
                          {Object.entries(currentData.deviceInfo).map(([label, value]) => (
                            <div key={label}>
                              <span className="text-gray-600">
                                {label.replace(/([A-Z])/g, ' $1')}
                              </span>
                              <p className="font-medium">{String(value)}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                </div>

                {/* Claims Info + Onboarding */}
                <div className="space-y-6 bg-[#E8F2FF73] p-3">
                  <Card className="rounded-none p-0 border flex gap-1" >
                    <CardHeader className='bg-[#D7F0FF] text-center p-2'>
                      <CardTitle className="text-[#00439E] text-base md:text-lg">Claims Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm bg-[#D7F0FF] p-2">
                   {currentData.claimsInfo && Object.entries(currentData.claimsInfo).map(([label, value]) => (
                      <div key={label} className="flex justify-between">
                        <span className="text-gray-600">{label.replace(/([A-Z])/g, ' ')}</span>
                        <span className="font-medium">{String(value)}</span>
                      </div>
                    ))}

                    
                   { currentData?.claimsInfo  && <><Button className="bg-[#fff] hover:bg-[#fff] text-white w-full mt-4 border-none rounded-none flex justify-between px-1.5 items-center">
                      <span className='text-[#212121]'>Status</span> 
                      {currentData.claimsInfo && (
                        <div
                          className={`w-[30%] text-sm font-medium px-2 py-1 ${getStatusBgClass(
                            currentData.claimsInfo.status
                          )} ${getStatusTextColor(currentData.claimsInfo.status)}`}
                        >
                          {currentData.claimsInfo.status}
                        </div>
                      )}
                    </Button>

                        <Button className="bg-[#004AAD] hover:bg-blue-700 text-white w-full rounded-none">
                        View more details
                      </Button></>}
                    </CardContent>
                  </Card>

                  <Card className="rounded-none p-0 border flex gap-1">
                    <CardHeader className='bg-[#D7F0FF] text-center p-2'>
                      <CardTitle className="text-[#00439E] text-base md:text-lg">Onboarding Center</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm bg-[#D7F0FF] p-2">
                      {Object.entries(currentData.onboardingInfo).map(([label, value]) => (
                        <div key={label} className="flex justify-between">
                          <span className="text-gray-600">{label.replace(/([A-Z])/g, ' ')}</span>
                          <p className="font-medium">{String(value)}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Protection Plan Details */}
              <Card className='border-none rounded-none'>
                <CardHeader>
                  <CardTitle className="text-base md:text-lg font-semibold text-center">Protection Plan Details</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm mb-6">
                    <div className='bg-[#DEE7FF59] py-4'>
                      <span className="text-gray-600 mb-5">Total Sum Insured</span>
                      <p className="font-bold text-base md:text-sm bg-[#E6F0FA] text-[#38B6FF] w-[80%] m-auto p-3">₦25,000.00</p>
                    </div>
                    <div className='bg-[#DEE7FF59] py-4'>
                      <span className="text-gray-600">Amount Paid</span>
                      <p className="font-bold text-base md:text-sm bg-[#E6F0FA] text-[#38B6FF] w-[80%] m-auto p-3">₦25,000.00</p>
                    </div>
                    <div className={`bg-[#DEE7FF59] py-4`}>
                      <span className="text-gray-600">Expiry Date</span>
                    <p
                        className={`font-bold text-base md:text-sm ${
                          currentData?.claimsInfo?.isActive == true
                            ? 'bg-[#E6F0FA] text-[#38B6FF]'
                            : 'bg-[#D5663A1C] text-[#E52626]'
                        } w-[80%] m-auto p-3`}
                      >
                        {currentData?.deviceInfo?.onboardingDate}
                        { currentData?.claimsInfo?.isActive}
                      </p>
                    </div>
                  </div>

                  <div className="mb-6 bg-[#DEE7FF59] py-4">
                    <span className="text-gray-600 text-sm">Balance</span>
                    <p className="font-bold text-2xl bg-[#E6F0FA] text-[#38B6FF] w-[40%] m-auto">₦0.00</p>
                  </div>

                  <div>
                    <span className="text-gray-600 text-sm">Repair Coverage</span>
                    <div className="flex flex-wrap justify-center gap-2 mt-3 bg-[#DEE7FF59] py-6">
                      {["Accidental Damage", "Hardware Failure (Repaired)", "Burglary/Guaranteed"].map((item) => (
                        <Badge key={item} variant="outline" className="bg-[#E6F0FA] text-[#38B6FF] rounded-none px-4 py-1 text-sm w-[45%] border-none">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Premium Distribution */}
              <Card className='rounded-none border-none'>
                <CardHeader>
                  <CardTitle className="text-base md:text-lg font-semibold text-center">Premium Distribution</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-sm">
                  <div className='bg-[#DEE7FF59] py-3.5'>
                    <span className="text-gray-600">Income</span>
                    <p className="font-bold bg-[#E6F0FA] text-[#38B6FF] w-[80%] m-auto text-base md:text-lg">₦25,000.00</p>
                  </div>
                  <div className='bg-[#DEE7FF59] py-3.5'>
                    <span className="text-gray-600">Premium</span>
                    <p className="font-bold bg-[#E6F0FA] text-[#38B6FF] w-[80%] m-auto text-base md:text-lg">₦25,000.00</p>
                  </div>
                  <div className='bg-[#DEE7FF59] py-3.5'>
                    <span className="text-gray-600">Commission</span>
                    <p className="font-bold bg-[#E6F0FA] text-[#38B6FF] w-[80%] m-auto text-base md:text-lg">₦5,000.00</p>
                  </div>
                </CardContent>
                
              </Card>
              {isAwaitingApproval && 
              <div className="w-full flex justify-center">
                <Button className="bg-[#004AAD] hover:bg-blue-700 text-white w-[80%] rounded-none">
                        Approve
                      </Button>
              </div>
                      }
                      {(isApproved || isAwaitingPolicyUpload) && (
                        <Card className='border-none rounded-none'>
                          <CardHeader>
                            <CardTitle className="text-base md:text-lg font-semibold text-center">Insurance Partner</CardTitle>
                          </CardHeader>
                          <CardContent className="text-center text-sm">
                            <p className="text-gray-600 mb-4">
                              This device protection plan has been allocated to AXA Mansard as the
                              official insurance partner for coverage and claims.
                            </p>
                            <p className="font-medium">Approved by Jane Doe</p>
                          </CardContent>
                        </Card>
                      )}

            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
