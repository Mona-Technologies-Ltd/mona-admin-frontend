'use client'

import { useState } from 'react'
import { Download, Youtube } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import DashboardSidebar from '@/components/DashboardSidebar'
import DashboardHeader from '@/components/DashboardHeader'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'

//... deviceCategoryData (no change here)
interface CustomerInfo {
  fullName: string;
  lastName: string;
  lgas: string;
  state: string;
  phoneNumber: string;
  email: string;
}

interface ClaimsInfo {
  claimId: string;
  date: string;
  paid: string;
  serviceProvider: string;
  status: string;
  imei: string;
}

interface DeviceInfo {
  model: string;
  brand: string;
  imei: string;
  onboardingDate: string;
  deviceCondition: string;
}

interface OnboardingInfo {
  businessId: string;
  businessName: string;
  act: string;
  city: string;
  stateNumber: string;
  telPhoneNumber: string;
}

const deviceCategoryData: Record<string, {
  title: string;
  hasVideo: boolean;
  showPolicy: boolean;
 customerInfo: CustomerInfo;
    claimsInfo: ClaimsInfo;
    deviceInfo: DeviceInfo;
    onboardingInfo: OnboardingInfo;
}> = {
  "Approved Devices": {
    title: "Royal Tech Company",
    hasVideo: true,
    showPolicy: true,
    customerInfo: {
      fullName: "Jordan",
      lastName: "Peters", 
      lgas: "Jer 30 3500",
      state: "Kenya",
      phoneNumber: "09787552199",
      email: "jordanpeters@gmail.com"
    },
    claimsInfo: {
      claimId: "PLU3766",
      date: "Dec 6, 2024",
      paid: "₦25,000.00",
      serviceProvider: "Smart Gizts",
      status: "Received",
      imei: "1923459296962"
    },
    deviceInfo: {
      model: "iPhone 13 Pro Max",
      brand: "iPhone",
      imei: "1923459296962",
      onboardingDate: "Dec 6, 2024",
      deviceCondition: "New"
    },
    onboardingInfo: {
      businessId: "PLU3766",
      businessName: "World Tech",
      act: "ACT",
      city: "Abuja",
      stateNumber: "Hannah Dua",
      telPhoneNumber: "09787552398"
    }
  },
  "Awaiting Video Upload": {
    title: "Royal Tech Company",
    hasVideo: false,
    showPolicy: false,
    customerInfo: {
      fullName: "Sarah",
      lastName: "Johnson",
      lgas: "Lag 12 4560",
      state: "Lagos",
      phoneNumber: "08123456789", 
      email: "sarah.johnson@email.com"
    },
    claimsInfo: {
      claimId: "PLU3773",
      date: "Pending Upload",
      paid: "₦0.00",
      serviceProvider: "Pending",
      status: "Awaiting Video",
      imei: "1923459296963"
    },
    deviceInfo: {
      model: "iPhone 13 Pro Max",
      brand: "iPhone", 
      imei: "1923459296963",
      onboardingDate: "Dec 7, 2024",
      deviceCondition: "New"
    },
    onboardingInfo: {
      businessId: "PLU3773",
      businessName: "Tech Hub",
      act: "ACT",
      city: "Lagos",
      stateNumber: "Mike Smith",
      telPhoneNumber: "08123456790"
    }
  },
  "Awaiting Approval": {
    title: "Royal Tech Company",
    hasVideo: true,
    showPolicy: false,
    customerInfo: {
      fullName: "David",
      lastName: "Wilson",
      lgas: "Abj 15 7890",
      state: "Abuja",
      phoneNumber: "07034567890",
      email: "david.wilson@email.com"
    },
    claimsInfo: {
      claimId: "PLU3776",
      date: "Under Review",
      paid: "₦0.00", 
      serviceProvider: "Under Review",
      status: "Pending Approval",
      imei: "1923459296964"
    },
    deviceInfo: {
      model: "iPhone 13 Pro Max",
      brand: "iPhone",
      imei: "1923459296964",
      onboardingDate: "Dec 8, 2024",
      deviceCondition: "New"
    },
    onboardingInfo: {
      businessId: "PLU3776",
      businessName: "Digital Store",
      act: "ACT",
      city: "Abuja",
      stateNumber: "Lisa Brown",
      telPhoneNumber: "07034567891"
    }
  },
  "Awaiting Policy Upload": {
    title: "Royal Tech Company", 
    hasVideo: true,
    showPolicy: false,
    customerInfo: {
      fullName: "Emma",
      lastName: "Davis",
      lgas: "Pht 20 1234",
      state: "Rivers",
      phoneNumber: "08145678901",
      email: "emma.davis@email.com"
    },
    claimsInfo: {
      claimId: "PLU3778",
      date: "Waiting Policy",
      paid: "₦0.00",
      serviceProvider: "Waiting",
      status: "Policy Upload Required", 
      imei: "1923459296965"
    },
    deviceInfo: {
      model: "iPhone 13 Pro Max",
      brand: "iPhone",
      imei: "1923459296965",
      onboardingDate: "Dec 9, 2024",
      deviceCondition: "New"
    },
    onboardingInfo: {
      businessId: "PLU3778",
      businessName: "Mobile Center",
      act: "ACT", 
      city: "Port Harcourt",
      stateNumber: "John White",
      telPhoneNumber: "08145678902"
    }
  }
}
export default function DeviceDetails() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeDeviceCategory, setActiveDeviceCategory] = useState("Approved Devices")
  const currentData = deviceCategoryData[activeDeviceCategory]
const getStatusBgClass = (status: string) => {
  switch (status.toLowerCase()) {
    case 'received':
    case 'approved':
      return 'bg-green-100';
    case 'awaiting video':
    case 'pending approval':
    case 'policy upload required':
      return 'bg-orange-100';
    case 'rejected':
      return 'bg-red-100';
    default:
      return 'bg-gray-200';
  }
};

const getStatusTextColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'received':
    case 'approved':
      return 'text-green-700';
    case 'awaiting video':
    case 'pending approval':
    case 'policy upload required':
      return 'text-orange-700';
    case 'rejected':
      return 'text-red-700';
    default:
      return 'text-gray-700';
  }
};

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        activeDeviceCategory={activeDeviceCategory}
        setActiveDeviceCategory={setActiveDeviceCategory}
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left - Video/Phone Display */}
            <div className="lg:col-span-1">
              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="relative rounded-xl bg-transparent w-full sm:w-[20rem] h-[30rem] sm:h-[40rem] flex items-center justify-center mb-4 overflow-hidden">
                    {currentData.hasVideo ? (
                       <div className="absolute inset-0 w-[100%]">
                            <Image
                              src="/detail_phone.svg"
                              alt="Device"
                               fill
                          className="object-contain"
                            />
                            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center'>
                                <Youtube
                          className=" w-10 h-10 md:w-16 md:h-16"
                          color="#E52626"
                        />
                        <p className='text-center text-[#8A8894]'>Click button to watch onboarding video</p>
                            </div>

                      </div>


                    ) : (
                      <div className="text-center text-gray-500">
                        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl">📹</span>
                        </div>
                        <p className="text-sm">No video uploaded</p>
                      </div>
                    )}
                  </div>

                  <Button variant="outline" className="w-full mb-4" disabled={!currentData.hasVideo}>
                    <Download className="w-4 h-4 mr-2" />
                    Download Video
                  </Button>

                  {currentData.showPolicy ? (
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">Policy Number</p>
                      <p className="font-medium">POU234567879</p>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full mt-4">
                        View policy document
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">Policy Status</p>
                      <p className="font-medium text-orange-600">Policy not yet available</p>
                      <Button className="bg-gray-400 text-white w-full mt-4" disabled>
                        Policy Pending
                      </Button>
                    </div>
                  )}
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
                      <CardTitle className="text-[#00439E] text-base md:text-lg font-bold">Customer Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm text-[#004AAD]">
                      {Object.entries(currentData.customerInfo).map(([label, value]) => (
                        <div key={label} className="flex justify-between">
                          <span className="capitalize">{label.replace(/([A-Z])/g, ' $1')}</span>
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
                      {Object.entries(currentData.claimsInfo).map(([label, value]) => (
                        <div key={label} className="flex justify-between">
                          <span className="text-gray-600">{label.replace(/([A-Z])/g, ' ')}</span>
                          <span className="font-medium">{String(value)}</span>
                           {/* <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full mt-4">
                        Status 
                      </Button> */}
                      
                        </div>
                      ))}
                     <Button className="bg-[#fff] hover:bg-[#fff] text-white w-full mt-4 border-none rounded-none flex justify-between px-1.5 items-center">
                            <span className='text-[#212121]'>Status</span> 
                            <div
                              className={`w-[30%] text-sm font-medium px-2 py-1 ${getStatusBgClass(
                                currentData.claimsInfo.status
                              )} ${getStatusTextColor(currentData.claimsInfo.status)}`}
                            >
                            {currentData.claimsInfo.status}
                          </div>

                    </Button>

                        <Button className="bg-[#004AAD] hover:bg-blue-700 text-white w-full rounded-none">
                        View more details
                      </Button>
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
                      <span className="text-gray-600">Total Sum Insured</span>
                      <p className="font-bold text-base md:text-lg bg-[#E6F0FA] text-[#38B6FF] w-[80%] m-auto">₦25,000.00</p>
                    </div>
                    <div className='bg-[#DEE7FF59] py-4'>
                      <span className="text-gray-600">Amount Paid</span>
                      <p className="font-bold text-base md:text-lg bg-[#E6F0FA] text-[#38B6FF] w-[80%] m-auto">₦25,000.00</p>
                    </div>
                    <div className='bg-[#DEE7FF59] py-4'>
                      <span className="text-gray-600">Expiry Date</span>
                      <p className="font-bold text-base md:text-lg bg-[#E6F0FA] text-[#38B6FF] w-[80%] m-auto">Dec 6, 2024</p>
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

              {/* Service Partner */}
              <Card className='border-none rounded-none'>
                <CardHeader>
                  <CardTitle className="text-base md:text-lg font-semibold text-center">Service Partner</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-sm">
                  <p className="text-gray-600 mb-4">
                    This device protection plan has been allocated to AXA Mansard as the
                    official insurance partner for coverage and claims.
                  </p>
                  <p className="font-medium">Approved by Jane Doe</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
