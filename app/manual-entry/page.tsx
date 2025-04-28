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
      setError("Пожалуйста, заполните все обязательные поля")
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
      setError("Произошла ошибка при анализе ваших результатов. Пожалуйста, попробуйте снова.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center text-sm font-medium text-sky-600 mb-6 hover:underline">
        <ArrowLeft className="mr-1 h-4 w-4" />
        Вернуться на Главную
      </Link>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <PenLine className="h-6 w-6 text-sky-600" />
            Ручной Ввод
          </CardTitle>
          <CardDescription>
            Введите значения анализа крови вручную для персонализированной интерпретации
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4 md:col-span-2">
                <h3 className="text-lg font-medium">Личная Информация</h3>

                <div className="space-y-2">
                  <Label htmlFor="gender">Пол</Label>
                  <RadioGroup value={formData.gender} onValueChange={handleRadioChange} className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Мужской</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Женский</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Возраст</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    placeholder="Введите ваш возраст"
                    value={formData.age}
                    onChange={handleChange}
                    min="1"
                    max="120"
                  />
                </div>
              </div>

              {/* Complete Blood Count */}
              <div className="space-y-4 md:col-span-2">
                <h3 className="text-lg font-medium">Общий Анализ Крови (ОАК)</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hemoglobin">Гемоглобин (г/дл)</Label>
                    <Input
                      id="hemoglobin"
                      name="hemoglobin"
                      type="text"
                      placeholder="напр., 14.5"
                      value={formData.hemoglobin}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="wbc">Лейкоциты (×10³/мкл)</Label>
                    <Input
                      id="wbc"
                      name="wbc"
                      type="text"
                      placeholder="напр., 7.5"
                      value={formData.wbc}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rbc">Эритроциты (×10⁶/мкл)</Label>
                    <Input
                      id="rbc"
                      name="rbc"
                      type="text"
                      placeholder="напр., 5.0"
                      value={formData.rbc}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="platelets">Тромбоциты (×10³/мкл)</Label>
                    <Input
                      id="platelets"
                      name="platelets"
                      type="text"
                      placeholder="напр., 250"
                      value={formData.platelets}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hematocrit">Гематокрит (%)</Label>
                    <Input
                      id="hematocrit"
                      name="hematocrit"
                      type="text"
                      placeholder="напр., 45"
                      value={formData.hematocrit}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mcv">MCV (фл)</Label>
                    <Input
                      id="mcv"
                      name="mcv"
                      type="text"
                      placeholder="напр., 90"
                      value={formData.mcv}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mch">MCH (пг)</Label>
                    <Input
                      id="mch"
                      name="mch"
                      type="text"
                      placeholder="напр., 30"
                      value={formData.mch}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mchc">MCHC (г/дл)</Label>
                    <Input
                      id="mchc"
                      name="mchc"
                      type="text"
                      placeholder="напр., 33"
                      value={formData.mchc}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Differential */}
              <div className="space-y-4 md:col-span-2">
                <h3 className="text-lg font-medium">Лейкоцитарная Формула</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="neutrophils">Нейтрофилы (%)</Label>
                    <Input
                      id="neutrophils"
                      name="neutrophils"
                      type="text"
                      placeholder="напр., 60"
                      value={formData.neutrophils}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lymphocytes">Лимфоциты (%)</Label>
                    <Input
                      id="lymphocytes"
                      name="lymphocytes"
                      type="text"
                      placeholder="напр., 30"
                      value={formData.lymphocytes}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="monocytes">Моноциты (%)</Label>
                    <Input
                      id="monocytes"
                      name="monocytes"
                      type="text"
                      placeholder="напр., 7"
                      value={formData.monocytes}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="eosinophils">Эозинофилы (%)</Label>
                    <Input
                      id="eosinophils"
                      name="eosinophils"
                      type="text"
                      placeholder="напр., 2"
                      value={formData.eosinophils}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="basophils">Базофилы (%)</Label>
                    <Input
                      id="basophils"
                      name="basophils"
                      type="text"
                      placeholder="напр., 1"
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
                  Анализ Результатов...
                </>
              ) : (
                "Анализировать Результаты"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col text-center text-sm text-muted-foreground">
          <p>Ваши данные обрабатываются безопасно и конфиденциально.</p>
        </CardFooter>
      </Card>
    </div>
  )
}
