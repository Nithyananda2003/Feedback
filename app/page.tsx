"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"

const performanceData = [
  { county: "Orangeburg", oldTime: 56, newTime: 20 },
  { county: "Hampton", oldTime: 40, newTime: 20 },
  { county: "Chester", oldTime: 48, newTime: 16 },
  { county: "Aiken", oldTime: 61, newTime: 22 },
  { county: "Pickens", oldTime: 55, newTime: 19 },
  { county: "Cochise", oldTime: 59, newTime: 21 },
]

const oldTimeColors = ["#FF6B35", "#FF8555", "#FF9975", "#FFA885", "#FFB895", "#FFC4A5"]
const newTimeColors = ["#6366F1", "#818CF8", "#A5B4FC", "#7C3AED", "#A855F7", "#D946EF"]

const countyImprovements = [
  {
    name: "Orangeburg",
    improvements: [
      {
        title: "Open only necessary detail pages",
        old: "Always opened the latest year record, regardless of payment status",
        new: "Opens only unpaid years if any, otherwise only the latest paid year",
        benefit: "Eliminates unnecessary page loads and data extraction",
      },
      {
        title: "Fetch detail pages in parallel",
        old: "Processed each record one after another",
        new: "Processes all required records at the same time",
        benefit: "Avoids waiting for one page to finish before starting the next",
      },
      {
        title: "Removed retry loops and forced delays",
        old: "Repeated attempts with fixed delays on errors",
        new: "Direct execution without artificial pauses",
        benefit: "Prevents time wasted on retries and sleep intervals",
      },
      {
        title: "Unified tax record extraction",
        old: "Scattered logic across multiple functions with duplication",
        new: "Single function returns complete, consistent record",
        benefit: "Reduces repeated DOM parsing and logic branching",
      },
    ],
    oldTime: 56,
    newTime: 20,
    improvement: 64,
  },
  {
    name: "Hampton",
    improvements: [
      {
        title: "Removed hard-coded delays",
        old: "Uses delay(2000), delay(1000), delay(3000) with artificial waiting periods",
        new: "Replaced with selector-based waiting (waitForSelector, waitForFunction) - no artificial pauses",
        benefit: "Eliminates flakiness and removes time wasted on fixed delays; uses app's native waiting mechanisms",
      },
      {
        title: "Angular JS direct scope injection",
        old: "Manual DOM traversal and button click() method for row selection",
        new: "Direct $scope.select() call via injected Angular - bypasses DOM fragility",
        benefit: "More reliable than DOM clicking; uses app's own controller logic for immediate execution",
      },
      {
        title: "Smart async/await pattern",
        old: "Promise chain with .then().catch().finally() - harder to debug and maintain",
        new: "Full async/await in search handler with proper error context at every level",
        benefit: "Readable, debuggable, and maintainable control flow; comprehensive error handling prevents crashes",
      },
      {
        title: "Intelligent navigation strategy",
        old: "waitForSelector('.tab-pane.ng-scope.active') + delay(2000) for pane detection",
        new: "waitForFunction checking pane active AND contains 'Parcel Number' - ensures full content load",
        benefit: "Smarter, faster, and resilient to UI changes; no artificial delays in detection",
      },
    ],
    oldTime: 40,
    newTime: 20,
    improvement: 50,
  },
  {
    name: "Chester",
    improvements: [],
    oldTime: 48,
    newTime: 16,
    improvement: 67,
    status: "UPDATES ARE UNDERWAY",
  },
  {
    name: "Aiken",
    improvements: [],
    oldTime: 61,
    newTime: 22,
    improvement: 64,
    status: "UPDATES ARE UNDERWAY",
  },
  {
    name: "Pickens",
    improvements: [],
    oldTime: 55,
    newTime: 19,
    improvement: 65,
    status: "UPDATES ARE UNDERWAY",
  },
  {
    name: "Cochise",
    improvements: [],
    oldTime: 59,
    newTime: 21,
    improvement: 64,
    status: "UPDATES ARE UNDERWAY",
  },
]

const CustomChartTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border-2 border-cyan-400/60 bg-slate-950/95 p-4 shadow-2xl backdrop-blur-md">
        <p className="font-semibold text-white mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="font-medium text-white">
            {entry.name}: {entry.value} seconds
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function PresentationWebsite() {
  const [selectedCounty, setSelectedCounty] = useState("Orangeburg")
  const currentCounty = countyImprovements.find((c) => c.name === selectedCounty)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="relative">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              Performance Optimization Report
            </h1>
            <p className="mt-2 text-lg text-slate-300">Code efficiency improvements across six counties</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        {/* Three Main Topics Section */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-slate-100">WEEKLY INTERN FEEDBACK</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {/* Card 1: Action Plan for Next Week */}
            <Card className="border-2 border-cyan-500/50 bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-cyan-400">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/20 text-lg font-bold">
                    1
                  </span>
                  Action Plan
                </CardTitle>
                <CardDescription className="text-slate-400">For Next Week</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-slate-300">
                <div className="bg-slate-700/50 rounded-lg p-4 border border-cyan-500/30">
                  <h4 className="font-semibold text-cyan-300 mb-2">Reviewed Feedback & Implemented Changes</h4>
                  <p className="text-slate-300 leading-relaxed">
                    Based on your feedback, I have implemented all necessary code optimizations across the controllers.
                    These changes focused on eliminating artificial delays, improving error handling, and consolidating
                    logic for maximum efficiency.
                  </p>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>Deploy 5 new counties this week with all necessary optimization changes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      Review 34 remaining controller files in batch format throughout the week to maintain consistency
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>Ensure all controller updates follow the same optimization pattern</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>Conduct team knowledge sharing sessions on new patterns</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Card 2: Issues / Concerns Regarding Code */}
            <Card className="border-2 border-orange-500/50 bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-400">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/20 text-lg font-bold">
                    2
                  </span>
                  Issues / Concerns
                </CardTitle>
                <CardDescription className="text-slate-400">Current Challenges</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-300">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-orange-400" />
                    <span>
                      <strong>Different website layouts:</strong> Some county websites have different designs and
                      setups, making it hard to write one solution that works everywhere
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-orange-400" />
                    <span>
                      <strong>Timing varies by site:</strong> Some websites load quickly while others are slow—waiting a
                      fixed amount of time doesn't work for all of them
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-orange-400" />
                    <span>
                      <strong>Finding the right elements:</strong> Button names and page elements can be different
                      between similar-looking websites
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-orange-400" />
                    <span>
                      <strong>Sites change and break things:</strong> When a county updates their website, your solution
                      might stop working correctly
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Card 3: Process to Improve Your Ratings */}
            <Card className="border-2 border-emerald-500/50 bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-400">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-lg font-bold">
                    3
                  </span>
                  Process to Improve Your Ratings
                </CardTitle>
                <CardDescription className="text-slate-400">How to Get Better</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-300">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong>Build flexible solutions:</strong> Instead of coding for just one website, write code that
                      can work with different page designs
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong>Wait for what you need:</strong> Check if the information is actually on the page instead
                      of just waiting for a set time
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong>Test everywhere:</strong> Always make sure your solution works on every county website
                      before you're done
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong>Make it adaptable:</strong> Design solutions that can handle small website changes without
                      breaking completely
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Performance Overview */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-slate-100">Performance Improvements Overview</h2>
          <Card className="border border-slate-700 bg-gradient-to-br from-slate-800/50 to-slate-900/50 shadow-2xl shadow-blue-500/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-100">Average Processing Time Reduction by County</CardTitle>
              <CardDescription className="text-slate-200 text-base font-medium mt-2">
                Average Processing Time: Before vs After Optimization (in seconds)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  oldTime: { label: "Before Optimization", color: "hsl(0, 100%, 60%)" },
                  newTime: { label: "After Optimization", color: "hsl(162, 100%, 50%)" },
                }}
                className="h-96 w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
                    <defs>
                      <linearGradient id="oldGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FF6B35" stopOpacity={1} />
                        <stop offset="100%" stopColor="#FFA86D" stopOpacity={0.9} />
                      </linearGradient>
                      <linearGradient id="newGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7C3AED" stopOpacity={1} />
                        <stop offset="100%" stopColor="#D946EF" stopOpacity={0.9} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#475569" opacity={0.4} />
                    <XAxis dataKey="county" angle={-45} textAnchor="end" height={100} stroke="#CBD5E1" />
                    <YAxis stroke="#CBD5E1" />
                    <ChartTooltip content={<CustomChartTooltip />} />
                    <Legend />
                    <Bar dataKey="oldTime" fill="url(#oldGradient)" name="Before Optimization" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="newTime" fill="url(#newGradient)" name="After Optimization" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </section>

        {/* Detailed County Breakdowns */}
        <section>
          <h2 className="mb-8 text-3xl font-bold text-slate-100">Detailed County Improvements</h2>

          <Tabs value={selectedCounty} onValueChange={setSelectedCounty} className="w-full">
            <TabsList className="grid grid-cols-3 gap-2 lg:grid-cols-6 bg-slate-800 border border-slate-700">
              {countyImprovements.map((county) => (
                <TabsTrigger
                  key={county.name}
                  value={county.name}
                  className="text-xs sm:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
                >
                  {county.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {countyImprovements.map((county) => (
              <TabsContent key={county.name} value={county.name} className="space-y-6">
                {/* County Header with Stats */}
                <div className="grid gap-6 md:grid-cols-3">
                  <Card className="border-l-4 border-l-purple-500 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-slate-100">{county.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                        {county.improvement}%
                      </div>
                      <p className="mt-1 text-sm text-slate-400">Performance Improvement</p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-red-500 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-slate-100">Before</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold text-red-400">{county.oldTime}s</div>
                      <p className="mt-1 text-sm text-slate-400">Processing Time</p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-emerald-500 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-slate-100">After</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold text-emerald-400">{county.newTime}s</div>
                      <p className="mt-1 text-sm text-slate-400">Processing Time</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Improvements List or Updates Status */}
                {county.improvements.length > 0 ? (
                  <div className="space-y-4">
                    {county.improvements.map((improvement, idx) => (
                      <Card
                        key={idx}
                        className="border-0 shadow-lg bg-gradient-to-br from-slate-800 to-slate-900 hover:shadow-2xl hover:shadow-blue-500/20 transition-all hover:border-blue-500/50 border border-slate-700"
                      >
                        <CardHeader>
                          <div className="flex items-start gap-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex-shrink-0">
                              <span className="text-sm font-bold text-white">{idx + 1}</span>
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-lg text-slate-100">{improvement.title}</CardTitle>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4 pl-12">
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="bg-slate-900/50 rounded-lg p-3 border border-red-500/30">
                              <h4 className="mb-2 font-semibold text-red-400">Old Logic</h4>
                              <p className="text-sm text-slate-300 leading-relaxed">{improvement.old}</p>
                            </div>
                            <div className="bg-slate-900/50 rounded-lg p-3 border border-emerald-500/30">
                              <h4 className="mb-2 font-semibold text-emerald-400">New Logic</h4>
                              <p className="text-sm text-slate-300 leading-relaxed">{improvement.new}</p>
                            </div>
                          </div>
                          <div className="rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-3 border border-blue-500/30">
                            <p className="text-sm font-medium text-blue-300">
                              <span className="font-bold">Impact:</span> {improvement.benefit}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="border-2 border-dashed border-amber-500/50 bg-gradient-to-br from-amber-500/10 to-slate-900 flex items-center justify-center min-h-96">
                    <CardContent className="text-center">
                      <div className="text-6xl mb-4">⏳</div>
                      <h3 className="text-2xl font-bold text-amber-300 mb-2">UPDATES ARE UNDERWAY</h3>
                      <p className="text-slate-300">Detailed improvements coming soon for {county.name}</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </section>

        {/* Footer */}
        <section className="mt-20 border-t border-slate-800 pt-12 pb-12">
          <div className="text-center">
            <h3 className="mb-4 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              NITHYANANDA R S
            </h3>
            <p className="text-slate-400">THANK YOU</p>
          </div>
        </section>
      </main>
    </div>
  )
}
