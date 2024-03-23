import "@rainbow-me/rainbowkit/styles.css";
import './globals.css'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {GetRainbowKitProvider, wagmiConfig} from "./rainbowKit";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import AnimatedBanner from './animatedBanner';
import { Button } from "@/components/ui/button"
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { GetAddress } from "./scanTokens/bank";
import {GetData} from './scanTokens/polygonScanTxAmt'
import {GetWalletAmount} from './scanTokens/polygonwalletAmount'
import { Input } from "@/components/ui/input"

// import { MainNav } from "@/components/ui/main-nav"
// import ModeToggle from '@/www/registry/default/example/mode-toggle';
// import { Overview } from "@/components/ui/overview"
// import { Search } from "@/components/ui/search"
// import TeamSwitcher from "@/components/ui/team-switcher"
// import { UserNav } from "@/components/ui/user-nav"

function Page() {

  return (
    <>
      <div>
        <div>
          {/* <AnimatedBanner /> */}
        </div>
        <div className="uniswap"> 
        </div>
        <div className="background">
          <div className="md:hidden">
        </div>
        <div className="hidden flex-col md:flex">
          <div className="border-b">
            <div className="flex h-16 items-center px-4"> 
            {/* <ModeToggle /> */}
              {/* <TeamSwitcher /> */}
              {/* <MainNav className="mx-6" /> */}
              <div className="ml-auto flex items-center space-x-4">
                {/* <Search /> */}
                <GetRainbowKitProvider wagmiConfig={wagmiConfig}>
                  <ConnectButton />
                </GetRainbowKitProvider>
                {/* <UserNav /> */}
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2 mb-4">
              <div className="dashboard-text">
                <h1 className="text-4xl font-weight tracking-tight">Dashboard</h1>
              </div>
              {/* <div className="flex items-center space-x-2">
                <Button>Download</Button>
              </div> */}
            </div>
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics" disabled>
                  Services
                </TabsTrigger>
                <TabsTrigger value="reports" disabled>
                  Reports
                </TabsTrigger>
                <TabsTrigger value="notifications" disabled>
                  Notifications
                </TabsTrigger>
              </TabsList>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Address:
                      </CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">Jason&apos;s Wallet</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Transactions
                        
                      </CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        <GetData />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Wallet Amount</CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <path d="M2 10h20" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        <GetWalletAmount/>
                      </div>
                    </CardContent>
                </Card>
              </div>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                  <Card >
                    <CardHeader className="flex flex-row items-center justify-between space-y-1.5 p-5">
                      <CardTitle className="text-sm font-medium">
                        Bank Contract 
                      </CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      {/* <div className="text-2xl font-bold">$45,231.89</div>
                      <p className="text-xs text-muted-foreground"></p> */}
                      <div className="inputContainer">
                        <GetAddress/>
                        {/* <input type="number" value={enteredAmount} onChange={handleAmountChange} placeholder='Enter Amount' className='inputTextColor'/> */}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-1.5 p-5">
                      <CardTitle className="text-sm font-medium">
                        Transactions 
                      </CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">+2350</div>
                      <p className="text-xs text-muted-foreground">
                        +180.1% from last month
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>Crypto Balance</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                      {/* <Overview /> */}
                    </CardContent>
                  </Card>
                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle>Recent Transactions</CardTitle>
                      <p>
                        You made 265 sales this month.
                      </p>
                      <CardDescription>
                        You made 265 sales this month.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}


export default Page;