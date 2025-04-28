"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, FileText, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { analyzeBloodTest } from "@/lib/api"
import { LoadingSpinner } from "@/components/loading-spinner"

export default function UploadPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    setFile(selectedFile)
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file) {
      setError("Please select a file to upload")
      return
    }

    // Check file type
    const fileType = file.type
    const validTypes = ["image/jpeg", "image/png", "application/pdf"]

    if (!validTypes.includes(fileType)) {
      setError("Please upload a JPG, PNG, or PDF file")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // In a real app, you would upload the file to the server
      // For this demo, we'll simulate a delay and use mock data
      const formData = new FormData()
      formData.append("file", file)

      // Simulate API call
      const results = await analyzeBloodTest(formData)

      // Store results in localStorage for the results page
      localStorage.setItem("bloodTestResults", JSON.stringify(results))

      // Navigate to results page
      router.push("/results")
    } catch (err) {
      setError("An error occurred while analyzing your results. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center text-sm font-medium text-sky-600 mb-6 hover:underline">
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to Home
      </Link>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <FileText className="h-6 w-6 text-sky-600" />
            Upload Blood Test Results
          </CardTitle>
          <CardDescription>Upload an image or PDF of your blood test results for analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="file-upload">Upload File</Label>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                <div className="flex flex-col items-center justify-center gap-2">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <div className="flex flex-col items-center gap-1">
                    <p className="text-sm font-medium">Drag and drop your file here or click to browse</p>
                    <p className="text-xs text-muted-foreground">Supports JPG, PNG, and PDF files</p>
                  </div>
                  <Input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handleFileChange}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById("file-upload")?.click()}
                  >
                    Select File
                  </Button>
                </div>
              </div>
              {file && (
                <p className="text-sm text-muted-foreground mt-2">
                  Selected file: <span className="font-medium">{file.name}</span>
                </p>
              )}
              {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
            </div>
            <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700" disabled={!file || isLoading}>
              {isLoading ? (
                <>
                  <LoadingSpinner className="mr-2" />
                  Analyzing Results...
                </>
              ) : (
                "Analyze Results"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col text-center text-sm text-muted-foreground">
          <p>Your data is processed securely and confidentially.</p>
        </CardFooter>
      </Card>
    </div>
  )
}
