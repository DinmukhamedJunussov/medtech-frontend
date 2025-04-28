"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Check, FileText, Info, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { LoadingSpinner } from "@/components/loading-spinner"

// Define the blood test result structure
interface BloodTestResult {
  name: string
  value: number
  unit: string
  referenceRange: string
  status: "normal" | "low" | "high" | "critical"
}

// Define the analysis result structure
interface AnalysisResult {
  results: BloodTestResult[]
  explanation: string
  recommendations: string[]
}

export default function ResultsPage() {
  const router = useRouter()
  const [results, setResults] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Retrieve results from localStorage
    const storedResults = localStorage.getItem("bloodTestResults")

    if (storedResults) {
      setResults(JSON.parse(storedResults))
    } else {
      // If no results found, redirect to home
      router.push("/")
    }

    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner className="h-8 w-8 text-sky-600" />
      </div>
    )
  }

  if (!results) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertTitle>No results found</AlertTitle>
          <AlertDescription>
            We couldn't find any analysis results. Please return to the home page and try again.
          </AlertDescription>
        </Alert>
        <Button asChild className="mt-4">
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    )
  }

  // Group results by status
  const normalResults = results.results.filter((r) => r.status === "normal")
  const abnormalResults = results.results.filter((r) => r.status !== "normal")

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center text-sm font-medium text-sky-600 mb-6 hover:underline">
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to Home
      </Link>

      <div className="space-y-8">
        <Card>
          <CardHeader className="bg-sky-50 border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl flex items-center gap-2">
                <FileText className="h-6 w-6 text-sky-600" />
                Blood Test Results
              </CardTitle>
              <Badge variant={abnormalResults.length > 0 ? "destructive" : "default"}>
                {abnormalResults.length > 0 ? "Abnormalities Detected" : "All Results Normal"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All Results</TabsTrigger>
                <TabsTrigger value="abnormal">
                  Abnormal
                  {abnormalResults.length > 0 && (
                    <Badge variant="destructive" className="ml-2">
                      {abnormalResults.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="normal">Normal</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="pt-4">
                <div className="space-y-4">
                  <div className="rounded-md border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="px-4 py-2.5 text-left font-medium">Test</th>
                          <th className="px-4 py-2.5 text-left font-medium">Result</th>
                          <th className="px-4 py-2.5 text-left font-medium">Reference Range</th>
                          <th className="px-4 py-2.5 text-left font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.results.map((result, index) => (
                          <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-muted/20"}>
                            <td className="px-4 py-2.5">{result.name}</td>
                            <td className="px-4 py-2.5 font-medium">
                              {result.value} {result.unit}
                            </td>
                            <td className="px-4 py-2.5">{result.referenceRange}</td>
                            <td className="px-4 py-2.5">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div className="flex items-center">
                                      {result.status === "normal" ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : result.status === "critical" ? (
                                        <X className="h-4 w-4 text-red-500" />
                                      ) : result.status === "high" ? (
                                        <Badge
                                          variant="outline"
                                          className="text-amber-500 border-amber-200 bg-amber-50"
                                        >
                                          High
                                        </Badge>
                                      ) : (
                                        <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50">
                                          Low
                                        </Badge>
                                      )}
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    {result.status === "normal"
                                      ? "Within normal range"
                                      : result.status === "critical"
                                        ? "Critical value - requires immediate attention"
                                        : result.status === "high"
                                          ? "Above normal range"
                                          : "Below normal range"}
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="abnormal" className="pt-4">
                {abnormalResults.length > 0 ? (
                  <div className="space-y-4">
                    <div className="rounded-md border">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="px-4 py-2.5 text-left font-medium">Test</th>
                            <th className="px-4 py-2.5 text-left font-medium">Result</th>
                            <th className="px-4 py-2.5 text-left font-medium">Reference Range</th>
                            <th className="px-4 py-2.5 text-left font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {abnormalResults.map((result, index) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-muted/20"}>
                              <td className="px-4 py-2.5">{result.name}</td>
                              <td className="px-4 py-2.5 font-medium">
                                {result.value} {result.unit}
                              </td>
                              <td className="px-4 py-2.5">{result.referenceRange}</td>
                              <td className="px-4 py-2.5">
                                {result.status === "critical" ? (
                                  <Badge variant="destructive">Critical</Badge>
                                ) : result.status === "high" ? (
                                  <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
                                    High
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50">
                                    Low
                                  </Badge>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Check className="h-12 w-12 text-green-500 mb-4" />
                    <h3 className="text-lg font-medium">All Results Normal</h3>
                    <p className="text-muted-foreground mt-1">All your test results are within normal ranges.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="normal" className="pt-4">
                {normalResults.length > 0 ? (
                  <div className="space-y-4">
                    <div className="rounded-md border">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="px-4 py-2.5 text-left font-medium">Test</th>
                            <th className="px-4 py-2.5 text-left font-medium">Result</th>
                            <th className="px-4 py-2.5 text-left font-medium">Reference Range</th>
                            <th className="px-4 py-2.5 text-left font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {normalResults.map((result, index) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-muted/20"}>
                              <td className="px-4 py-2.5">{result.name}</td>
                              <td className="px-4 py-2.5 font-medium">
                                {result.value} {result.unit}
                              </td>
                              <td className="px-4 py-2.5">{result.referenceRange}</td>
                              <td className="px-4 py-2.5">
                                <Check className="h-4 w-4 text-green-500" />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Info className="h-12 w-12 text-amber-500 mb-4" />
                    <h3 className="text-lg font-medium">No Normal Results</h3>
                    <p className="text-muted-foreground mt-1">All your test results are outside normal ranges.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-sky-50 border-b">
            <CardTitle className="text-2xl">Personalized Analysis</CardTitle>
            <CardDescription>
              Based on your blood test results, our algorithm has generated the following analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Explanation</h3>
                <div className="text-muted-foreground">
                  <p>{results.explanation}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Recommendations</h3>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  {results.recommendations.map((recommendation, index) => (
                    <li key={index}>{recommendation}</li>
                  ))}
                </ul>
              </div>

              <Alert className="bg-sky-50 border-sky-200">
                <Info className="h-4 w-4 text-sky-600" />
                <AlertTitle>Important Note</AlertTitle>
                <AlertDescription>
                  This analysis is generated by an algorithm and should not replace professional medical advice. Always
                  consult with a healthcare provider regarding your test results.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center gap-4 pt-6">
            <Button className="w-full sm:w-auto bg-sky-600 hover:bg-sky-700">
              <Calendar className="mr-2 h-4 w-4" />
              Book an Appointment at Oncomed
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              Download Results as PDF
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
