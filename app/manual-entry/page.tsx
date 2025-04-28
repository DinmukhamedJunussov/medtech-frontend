"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, PenLine } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { analyzeManualEntry } from "@/lib/api"
import { LoadingSpinner } from "@/components/loading-spinner"

// Define the form data structure
interface FormData {
  gender: string
  age: string
  hemoglobin: string
  wbc: string
  rbc: string
  platelets: string
  hematocrit: string
  mcv: string
  mch: string
  mchc: string
  neutrophils: string
  lymphocytes: string
  monocytes: string
  eosinophils: string
  basophils: string
}

export default function ManualEntryPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Initialize form data with empty values
  const [formData, setFormData] = useState<FormData>({
    gender: "",
    age: "",
    hemoglobin: "",
    wbc: "",
    rbc: "",
    platelets: "",
    hematocrit: "",
    mcv: "",
    mch: "",
    mchc: "",
    neutrophils: "",
    lymphocytes: "",
    monocytes: "",
    eosinophils: "",
    basophils: "",
  })

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle radio group changes
  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, gender: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Basic validation
    if (!formData.gender || !formData.age) {
      setError("Please fill in all required fields")
      setIsLoading(false)
      return
    }

    try {
      // Call API with form data
      const results = await analyzeManualEntry(formData)

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
            <PenLine className="h-6 w-6 text-sky-600" />
            Manual Entry
          </CardTitle>
          <CardDescription>Enter your blood test values manually for personalized interpretation</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4 md:col-span-2">
                <h3 className="text-lg font-medium">Personal Information</h3>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <RadioGroup value={formData.gender} onValueChange={handleRadioChange} className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    placeholder="Enter your age"
                    value={formData.age}
                    onChange={handleChange}
                    min="1"
                    max="120"
                  />
                </div>
              </div>

              {/* Complete Blood Count */}
              <div className="space-y-4 md:col-span-2">
                <h3 className="text-lg font-medium">Complete Blood Count (CBC)</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hemoglobin">Hemoglobin (g/dL)</Label>
                    <Input
                      id="hemoglobin"
                      name="hemoglobin"
                      type="text"
                      placeholder="e.g., 14.5"
                      value={formData.hemoglobin}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="wbc">White Blood Cells (×10³/µL)</Label>
                    <Input
                      id="wbc"
                      name="wbc"
                      type="text"
                      placeholder="e.g., 7.5"
                      value={formData.wbc}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rbc">Red Blood Cells (×10⁶/µL)</Label>
                    <Input
                      id="rbc"
                      name="rbc"
                      type="text"
                      placeholder="e.g., 5.0"
                      value={formData.rbc}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="platelets">Platelets (×10³/µL)</Label>
                    <Input
                      id="platelets"
                      name="platelets"
                      type="text"
                      placeholder="e.g., 250"
                      value={formData.platelets}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hematocrit">Hematocrit (%)</Label>
                    <Input
                      id="hematocrit"
                      name="hematocrit"
                      type="text"
                      placeholder="e.g., 45"
                      value={formData.hematocrit}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mcv">MCV (fL)</Label>
                    <Input
                      id="mcv"
                      name="mcv"
                      type="text"
                      placeholder="e.g., 90"
                      value={formData.mcv}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mch">MCH (pg)</Label>
                    <Input
                      id="mch"
                      name="mch"
                      type="text"
                      placeholder="e.g., 30"
                      value={formData.mch}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mchc">MCHC (g/dL)</Label>
                    <Input
                      id="mchc"
                      name="mchc"
                      type="text"
                      placeholder="e.g., 33"
                      value={formData.mchc}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Differential */}
              <div className="space-y-4 md:col-span-2">
                <h3 className="text-lg font-medium">White Blood Cell Differential</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="neutrophils">Neutrophils (%)</Label>
                    <Input
                      id="neutrophils"
                      name="neutrophils"
                      type="text"
                      placeholder="e.g., 60"
                      value={formData.neutrophils}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lymphocytes">Lymphocytes (%)</Label>
                    <Input
                      id="lymphocytes"
                      name="lymphocytes"
                      type="text"
                      placeholder="e.g., 30"
                      value={formData.lymphocytes}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="monocytes">Monocytes (%)</Label>
                    <Input
                      id="monocytes"
                      name="monocytes"
                      type="text"
                      placeholder="e.g., 7"
                      value={formData.monocytes}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="eosinophils">Eosinophils (%)</Label>
                    <Input
                      id="eosinophils"
                      name="eosinophils"
                      type="text"
                      placeholder="e.g., 2"
                      value={formData.eosinophils}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="basophils">Basophils (%)</Label>
                    <Input
                      id="basophils"
                      name="basophils"
                      type="text"
                      placeholder="e.g., 1"
                      value={formData.basophils}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700" disabled={isLoading}>
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
