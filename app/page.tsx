"use client"

import { useState, useEffect } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, TrendingUp, GitBranch, Bug } from "lucide-react"

const countiesData = [
  { name: "Abbeville", time: 15.103, parcel: "054-00-00-424", status: "PASS" },
  { name: "Allendale", time: 13.892, parcel: "119-01-00-017.02", status: "PASS" },
  { name: "Bamberg", time: 15.295, parcel: "0013-00-00-017", status: "PASS" },
  { name: "Barnwell", time: 13.093, parcel: "111-00-00-154.02", status: "PASS" },
  { name: "Calhoun", time: 12.583, parcel: "118-00-00-018", status: "PASS" },
  { name: "Cherokee", time: 14.714, parcel: "101-00-00-098.000", status: "PASS" },
  { name: "Chesterfield", time: 12.999, parcel: "031 004 001 004", status: "PASS" },
  { name: "Clarendon", time: 13.095, parcel: "090-00-03-057-01", status: "PASS" },
  { name: "Colleton", time: 14.802, parcel: "115-00-00-237.001", status: "PASS" },
  { name: "Darlington", time: 13.803, parcel: "056-03-03-020", status: "PASS" },
  { name: "Dillon", time: 14.793, parcel: "104-12-12-005", status: "PASS" },
  { name: "Edgefield", time: 14.601, parcel: "078-00-01-037-100", status: "PASS" },
  { name: "Horry", time: 15.8, parcel: "0690001072", status: "PASS" },
  { name: "Kershaw", time: 14.604, parcel: "338-01-00-004-SCK", status: "PASS" },
  { name: "Lancaster", time: 15.094, parcel: "0042 -00-059.03", status: "PASS" },
  { name: "Laurens", time: 13.187, parcel: "901-01-18-011", status: "PASS" },
  { name: "Lee", time: 12.205, parcel: "023-00-00-286-000", status: "PASS" },
  { name: "Lexington", time: 13.612, parcel: "004493-01-010", status: "PASS" },
  { name: "Marlboro", time: 12.503, parcel: "013-00-03-132", status: "PASS" },
  { name: "McCormick", time: 12.787, parcel: "110-00-00-038", status: "PASS" },
  { name: "Newberry", time: 13.608, parcel: "641-18", status: "PASS" },
  { name: "Oconee", time: 15.094, parcel: "134-00-07-004", status: "PASS" },
  { name: "Orangeburg", time: 14.197, parcel: "03030001039000", status: "PASS" },
  { name: "Saluda", time: 12.802, parcel: "114-00-00-034", status: "PASS" },
  { name: "Sumter", time: 12.087, parcel: "2050404049", status: "PASS" },
  { name: "Union", time: 12.519, parcel: "058-00-00-114 000", status: "PASS" },
  { name: "Williamsburg", time: 12.825, parcel: "45-035-067", status: "PASS" },
  { name: "Spartanburg", time: 12.987, parcel: "7-13-09-120.01", status: "PASS" },
]

const issuesResolved = [
  {
    issue: "Unnecessary Awaits",
    fixed: 100,
    description: "Only await actual Promises",
    errorMechanisms: [
      "Promise validation before await",
      "Type checking for async functions",
      "Runtime Promise detection",
    ],
    validations: [
      "Check if return type is Promise<T>",
      "Validate async/await usage patterns",
      "Ensure no await on synchronous functions",
    ],
  },
  {
    issue: "Artificial Delays",
    fixed: 100,
    description: "Using waitForSelectors",
    errorMechanisms: ["Selector timeout handling", "Element visibility validation", "DOM state verification"],
    validations: [
      "Verify selector exists in DOM",
      "Check element is visible and interactable",
      "Validate selector timeout (max 30s)",
    ],
  },
  {
    issue: "Code Branching",
    fixed: 98,
    description: "Atomic helper functions",
    errorMechanisms: ["Function arity validation", "Return type enforcement", "Side-effect isolation"],
    validations: ["Single responsibility principle check", "Parameter count validation", "Pure function verification"],
  },
  {
    issue: "Error Handling",
    fixed: 100,
    description: "6 error mechanisms",
    errorMechanisms: [
      "Try-catch wrapper for network errors",
      "Parser error handling for malformed data",
      "Timeout error detection (>30s)",
      "Account validation failure handler",
      "Selector not found error recovery",
      "State validation error management",
    ],
    validations: [
      "Account object existence check",
      "Account.countyData array validation",
      "Account.parcelNumber format validation",
      "Response data structure validation",
      "Network status verification",
      "Data type conformance check",
    ],
  },
  {
    issue: "Empty Account",
    fixed: 100,
    description: "Input validation",
    errorMechanisms: ["Null/undefined check", "Empty object detection", "Missing property validation"],
    validations: [
      "if (!account || !account.countyData) throw error",
      "Array length > 0 validation",
      "Required fields: name, id, countyData",
      "Type checking: typeof account === 'object'",
    ],
  },
  {
    issue: "Error Logging",
    fixed: 100,
    description: "JSON structured logs",
    errorMechanisms: [
      "JSON.stringify() for object serialization",
      "Timestamp attachment to all logs",
      "Error stack trace capture",
      "Context metadata preservation",
    ],
    validations: [
      "Log format: {timestamp, level, message, error, context}",
      "All errors include stack traces",
      "Sensitive data redaction",
      "Log level validation (error, warn, info, debug)",
    ],
  },
]

export default function Dashboard() {
  const [hoveredCounty, setHoveredCounty] = useState<string | null>(null)
  const [animateCards, setAnimateCards] = useState(false)
  const [filteredCounties, setFilteredCounties] = useState(countiesData)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeIssueTab, setActiveIssueTab] = useState<string | null>(null)
  const [expandedIssueDetail, setExpandedIssueDetail] = useState<string | null>(null)

  useEffect(() => {
    setAnimateCards(true)
  }, [])

  useEffect(() => {
    const filtered = countiesData.filter((county) => county.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilteredCounties(filtered)
  }, [searchTerm])

  useEffect(() => {
    setActiveIssueTab(issuesResolved[0].issue)
  }, [])

  const avgTime = (countiesData.reduce((sum, c) => sum + c.time, 0) / countiesData.length).toFixed(2)
  const totalCounties = countiesData.length
  const successRate = 100
  const maxTime = Math.max(...countiesData.map((c) => c.time)).toFixed(3)
  const minTime = Math.min(...countiesData.map((c) => c.time)).toFixed(3)

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Background gradient effect */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-5xl font-heading font-bold bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent tracking-tight">
                  County Parcel Processing Hub
                </h1>
                <p className="text-lg text-muted-foreground mt-2 font-normal leading-relaxed">
                  Real-time monitoring & code optimization metrics
                </p>
              </div>
              <div className="text-right">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/50 text-sm font-medium px-3 py-1">
                  28 Counties Active
                </Badge>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-12">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Counties", value: totalCounties, icon: "🗺️", color: "from-blue-500 to-cyan-500" },
              { label: "Success Rate", value: `${successRate}%`, icon: "✓", color: "from-green-500 to-emerald-500" },
              { label: "Avg Duration", value: `${avgTime}s`, icon: "⏱️", color: "from-purple-500 to-pink-500" },
              { label: "Code Quality", value: "To be checked", icon: "⭐", color: "from-yellow-500 to-orange-500" },
            ].map((kpi, idx) => (
              <Card
                key={idx}
                className={`border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden group hover:border-accent/50 transition-all duration-300 ${
                  animateCards ? "slide-in" : ""
                }`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wide">
                        {kpi.label}
                      </p>
                      <p
                        className={`text-3xl font-heading font-bold mt-3 bg-gradient-to-r ${kpi.color} bg-clip-text text-transparent`}
                      >
                        {kpi.value}
                      </p>
                    </div>
                    <div className="text-3xl opacity-60 group-hover:scale-110 transition-transform">{kpi.icon}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-border/50 bg-card/40 backdrop-blur-sm mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 font-heading text-2xl">
                <Bug className="w-6 h-6 text-red-500 flex-shrink-0" />
                <span>Code Quality Improvements</span>
              </CardTitle>
              <CardDescription className="text-base font-normal leading-relaxed">
                Interactive view of how the refactored controller solves each issue
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Tab Navigation */}
              <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-border/50">
                {issuesResolved.map((issue, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveIssueTab(issue.issue)
                      setExpandedIssueDetail(null)
                    }}
                    className={`px-4 py-2 rounded-lg font-heading font-semibold text-sm transition-all duration-300 ${
                      activeIssueTab === issue.issue
                        ? "bg-gradient-to-r from-accent to-primary text-background shadow-lg shadow-accent/30"
                        : "bg-card/50 text-muted-foreground hover:bg-card border border-border/30 hover:border-accent/50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      {issue.issue}
                    </div>
                  </button>
                ))}
              </div>

              {activeIssueTab && issuesResolved.find((i) => i.issue === activeIssueTab) && (
                <div className="space-y-6">
                  {/* Header Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 rounded-lg bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/20">
                      <p className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-widest letter-spacing-wide">
                        Issue
                      </p>
                      <p className="text-2xl font-heading font-bold mt-2 leading-tight">
                        {issuesResolved.find((i) => i.issue === activeIssueTab)?.issue}
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
                      <p className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-widest">
                        Resolution
                      </p>
                      <p className="text-2xl font-heading font-bold text-green-400 mt-2 leading-tight">
                        {issuesResolved.find((i) => i.issue === activeIssueTab)?.fixed}% Fixed
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                      <p className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-widest">
                        Approach
                      </p>
                      <p className="text-lg font-heading font-semibold text-cyan-400 mt-2 leading-tight">
                        {issuesResolved.find((i) => i.issue === activeIssueTab)?.description}
                      </p>
                    </div>
                  </div>

                  {/* Split View: Error Mechanisms & Validations */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Error Mechanisms */}
                    <div className="space-y-4">
                      <h3 className="font-heading font-bold text-xl flex items-center gap-2 text-red-400 tracking-tight">
                        <span className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/50 flex items-center justify-center text-sm flex-shrink-0">
                          ⚠️
                        </span>
                        Error Mechanisms
                      </h3>
                      <div className="space-y-2">
                        {issuesResolved
                          .find((i) => i.issue === activeIssueTab)
                          ?.errorMechanisms.map((mechanism, midx) => (
                            <div
                              key={midx}
                              className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer group ${
                                expandedIssueDetail === `err-${midx}`
                                  ? "bg-red-500/20 border-red-500/50"
                                  : "bg-red-500/5 border-red-500/20 hover:bg-red-500/10"
                              }`}
                              onClick={() =>
                                setExpandedIssueDetail(expandedIssueDetail === `err-${midx}` ? null : `err-${midx}`)
                              }
                            >
                              <div className="flex items-start gap-3">
                                <span className="text-red-400 font-bold mt-1 flex-shrink-0">●</span>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                                    {mechanism}
                                  </p>
                                </div>
                                <span
                                  className={`text-xs opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ${expandedIssueDetail === `err-${midx}` ? "opacity-100" : ""}`}
                                >
                                  {expandedIssueDetail === `err-${midx}` ? "−" : "+"}
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Input Validations */}
                    <div className="space-y-4">
                      <h3 className="font-heading font-bold text-xl flex items-center gap-2 text-blue-400 tracking-tight">
                        <span className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-sm flex-shrink-0">
                          ✓
                        </span>
                        Input Validations
                      </h3>
                      <div className="space-y-2">
                        {issuesResolved
                          .find((i) => i.issue === activeIssueTab)
                          ?.validations.map((validation, vidx) => (
                            <div
                              key={vidx}
                              className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer group ${
                                expandedIssueDetail === `val-${vidx}`
                                  ? "bg-blue-500/20 border-blue-500/50"
                                  : "bg-blue-500/5 border-blue-500/20 hover:bg-blue-500/10"
                              }`}
                              onClick={() =>
                                setExpandedIssueDetail(expandedIssueDetail === `val-${vidx}` ? null : `val-${vidx}`)
                              }
                            >
                              <div className="flex items-start gap-3">
                                <span className="text-blue-400 font-bold mt-1 flex-shrink-0">✓</span>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                                    {validation}
                                  </p>
                                </div>
                                <span
                                  className={`text-xs opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ${expandedIssueDetail === `val-${vidx}` ? "opacity-100" : ""}`}
                                >
                                  {expandedIssueDetail === `val-${vidx}` ? "−" : "+"}
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-sm text-green-400 leading-relaxed">
                      <span className="font-heading font-bold">All instances fixed</span> – Fully implemented in
                      refactored controller with zero regressions
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* County Details Table */}
          <Card className="border-border/50 bg-card/40 backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 font-heading text-2xl">
                <GitBranch className="w-6 h-6 text-primary flex-shrink-0" />
                <span>County Processing Details</span>
              </CardTitle>
              <CardDescription className="text-base font-normal leading-relaxed">
                All 28 South Carolina counties with real-time status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search counties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border/50 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 font-sans"
                />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50 text-muted-foreground">
                      <th className="text-left py-3 px-4 font-heading font-semibold text-xs uppercase tracking-wider">
                        County
                      </th>
                      <th className="text-left py-3 px-4 font-heading font-semibold text-xs uppercase tracking-wider">
                        Parcel Number
                      </th>
                      <th className="text-right py-3 px-4 font-heading font-semibold text-xs uppercase tracking-wider">
                        Duration (ms)
                      </th>
                      <th className="text-center py-3 px-4 font-heading font-semibold text-xs uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCounties.map((county, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-border/50 hover:bg-accent/5 transition-colors duration-200"
                        onMouseEnter={() => setHoveredCounty(county.name)}
                        onMouseLeave={() => setHoveredCounty(null)}
                      >
                        <td className="py-3 px-4 font-medium">{county.name}</td>
                        <td className="py-3 px-4 text-muted-foreground font-mono text-xs">{county.parcel}</td>
                        <td className="py-3 px-4 text-right font-medium">{county.time.toFixed(3)}</td>
                        <td className="py-3 px-4 text-center">
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/50 font-medium">
                            {county.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredCounties.length === 0 && (
                <div className="text-center py-8 text-muted-foreground font-normal">
                  No counties found matching "{searchTerm}"
                </div>
              )}
            </CardContent>
          </Card>

          {/* Charts Section - Single centered pie chart as main focus */}
          <div className="mb-8">
            {/* Pie Chart - Main Focus */}
            <Card className="border-border/50 bg-card/40 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 font-heading text-3xl font-bold tracking-tight">
                  <CheckCircle2 className="w-7 h-7 text-green-500 flex-shrink-0" />
                  <span className="text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text">
                    Multi-controller File Analysis
                  </span>
                </CardTitle>
                <CardDescription className="text-lg font-normal leading-relaxed text-muted-foreground mt-2">
                  6 critical issues with 100% resolution rate
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={issuesResolved}
                      dataKey="fixed"
                      nameKey="issue"
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={140}
                      paddingAngle={3}
                      label={({ issue, fixed }) => `${issue}: ${fixed}%`}
                      labelLine={false}
                      labelStyle={{
                        fill: "#ffffff",
                        fontSize: "13px",
                        fontWeight: 600,
                      }}
                      labelPosition="outside"
                    >
                      {issuesResolved.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            [
                              "var(--chart-1)",
                              "var(--chart-2)",
                              "var(--chart-3)",
                              "var(--chart-4)",
                              "var(--chart-5)",
                              "#10b981",
                            ][index % 6]
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0, 0, 0, 0.95)",
                        border: "2px solid #10b981",
                        borderRadius: "12px",
                        padding: "12px",
                        color: "#ffffff",
                      }}
                      formatter={(value) => [`${value}%`, "Resolution"]}
                      labelStyle={{ color: "#ffffff", fontWeight: 700, fontSize: "14px" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl">
                  {issuesResolved.map((issue, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border/50"
                    >
                      <div
                        className="w-4 h-4 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor: [
                            "var(--chart-1)",
                            "var(--chart-2)",
                            "var(--chart-3)",
                            "var(--chart-4)",
                            "var(--chart-5)",
                            "#10b981",
                          ][idx % 6],
                        }}
                      />
                      <div>
                        <p className="font-heading font-bold text-sm leading-tight text-white">{issue.issue}</p>
                        <p className="text-xs text-gray-300 font-normal">{issue.fixed}% Fixed</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics - Moved after pie chart */}
          <Card className="border-border/50 bg-card/40 backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 font-heading text-3xl font-bold tracking-tight">
                <TrendingUp className="w-7 h-7 text-accent flex-shrink-0" />
                <span className="text-transparent bg-gradient-to-r from-accent to-primary bg-clip-text">
                  Performance Metrics
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="p-6 rounded-lg bg-primary/10 border border-primary/20 hover:border-primary/50 transition-all duration-300">
                  <p className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-widest letter-spacing-wide">
                    Min Time
                  </p>
                  <p className="text-3xl font-heading font-bold text-primary mt-3 leading-tight">{minTime}s</p>
                </div>
                <div className="p-6 rounded-lg bg-accent/10 border border-accent/20 hover:border-accent/50 transition-all duration-300">
                  <p className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-widest">
                    Max Time
                  </p>
                  <p className="text-3xl font-heading font-bold text-accent mt-3 leading-tight">{maxTime}s</p>
                </div>
                <div className="p-6 rounded-lg bg-green-500/10 border border-green-500/20 hover:border-green-500/50 transition-all duration-300">
                  <p className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-widest">
                    Avg Time
                  </p>
                  <p className="text-3xl font-heading font-bold text-green-400 mt-3 leading-tight">{avgTime}s</p>
                </div>
                <div className="p-6 rounded-lg bg-blue-500/10 border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300">
                  <p className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-widest">
                    All 28 Counties
                  </p>
                  <p className="text-3xl font-heading font-bold text-blue-400 mt-3 leading-tight">{totalCounties}</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={countiesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                  />
                  <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "2px solid var(--accent)",
                      borderRadius: "12px",
                      padding: "12px",
                    }}
                    formatter={(value) => `${value.toFixed(2)}s`}
                    labelStyle={{ color: "var(--foreground)", fontWeight: 600, fontSize: "13px" }}
                  />
                  <Legend wrapperStyle={{ fontSize: "13px", fontWeight: 600, color: "var(--muted-foreground)" }} />
                  <Line
                    type="monotone"
                    dataKey="time"
                    stroke="var(--accent)"
                    strokeWidth={3}
                    dot={{ fill: "var(--accent)", r: 5 }}
                    activeDot={{ r: 7 }}
                    isAnimationActive={true}
                    name="Processing Time (s)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </main>

        {/* Footer */}
        <footer className="border-t border-border/50 backdrop-blur-sm bg-background/80 mt-12 py-6">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-muted-foreground text-sm font-normal leading-relaxed">
              Real-time parcel processing across 28 South Carolina counties | Optimized with atomic async functions &
              structured error handling
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
