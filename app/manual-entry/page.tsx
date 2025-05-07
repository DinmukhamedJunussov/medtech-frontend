"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, PenLine } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { analyzeManualEntry } from "@/lib/api"
import { LoadingSpinner } from "@/components/loading-spinner"

// Define the form data structure
interface FormData {
  hemoglobin: string
  white_blood_cells: string
  red_blood_cells: string
  platelets: string
  neutrophils_percent: string
  neutrophils_absolute: string
  lymphocytes_percent: string
  lymphocytes_absolute: string
  monocytes_percent: string
  monocytes_absolute: string
  eosinophils_percent: string
  eosinophils_absolute: string
  basophils_percent: string
  basophils_absolute: string
  test_date: string
  patient_id: string
  lab_id: string
  notes: string
}

export default function ManualEntryPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Initialize form data with default values
  const [formData, setFormData] = useState<FormData>({
    hemoglobin: "333",
    white_blood_cells: "3.74",
    red_blood_cells: "4.57",
    platelets: "207",
    neutrophils_percent: "57.7",
    neutrophils_absolute: "2.16",
    lymphocytes_percent: "29.4",
    lymphocytes_absolute: "1.1",
    monocytes_percent: "11",
    monocytes_absolute: "0.41",
    eosinophils_percent: "1.6",
    eosinophils_absolute: "0.06",
    basophils_percent: "0.3",
    basophils_absolute: "0.01",
    test_date: "",
    patient_id: "",
    lab_id: "",
    notes: ""
  })

  // Загружаем данные из localStorage при монтировании компонента
  useEffect(() => {
    const uploadedResults = localStorage.getItem("uploadedResults")
    if (uploadedResults) {
      try {
        const results = JSON.parse(uploadedResults)
        // Обновляем форму данными из результатов загрузки
        setFormData(prev => ({
          ...prev,
          hemoglobin: results.results[0]?.value?.toString() || prev.hemoglobin,
          white_blood_cells: results.results[1]?.value?.toString() || prev.white_blood_cells,
          red_blood_cells: results.results[2]?.value?.toString() || prev.red_blood_cells,
          platelets: results.results[3]?.value?.toString() || prev.platelets,
          neutrophils_percent: results.results[4]?.value?.toString() || prev.neutrophils_percent,
          neutrophils_absolute: results.results[5]?.value?.toString() || prev.neutrophils_absolute,
          lymphocytes_percent: results.results[6]?.value?.toString() || prev.lymphocytes_percent,
          lymphocytes_absolute: results.results[7]?.value?.toString() || prev.lymphocytes_absolute,
          monocytes_percent: results.results[8]?.value?.toString() || prev.monocytes_percent,
          monocytes_absolute: results.results[9]?.value?.toString() || prev.monocytes_absolute,
          eosinophils_percent: results.results[10]?.value?.toString() || prev.eosinophils_percent,
          eosinophils_absolute: results.results[11]?.value?.toString() || prev.eosinophils_absolute,
          basophils_percent: results.results[12]?.value?.toString() || prev.basophils_percent,
          basophils_absolute: results.results[13]?.value?.toString() || prev.basophils_absolute,
        }))
        // Очищаем данные из localStorage после использования
        localStorage.removeItem("uploadedResults")
      } catch (err) {
        console.error("Ошибка при загрузке данных из localStorage:", err)
      }
    }
  }, [])

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Basic validation
    if (!formData.hemoglobin || !formData.white_blood_cells) {
      setError("Пожалуйста, заполните обязательные поля")
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
              {/* Basic Blood Count */}
              <div className="space-y-4 md:col-span-2">
                <h3 className="text-lg font-medium">Основные показатели</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hemoglobin">Гемоглобин (г/л)</Label>
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
                    <Label htmlFor="white_blood_cells">Лейкоциты (×10³/мкл)</Label>
                    <Input
                      id="white_blood_cells"
                      name="white_blood_cells"
                      type="text"
                      placeholder="напр., 6.8"
                      value={formData.white_blood_cells}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="red_blood_cells">Эритроциты (×10⁶/мкл)</Label>
                    <Input
                      id="red_blood_cells"
                      name="red_blood_cells"
                      type="text"
                      placeholder="напр., 4.5"
                      value={formData.red_blood_cells}
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
                </div>
              </div>

              {/* Differential */}
              <div className="space-y-4 md:col-span-2">
                <h3 className="text-lg font-medium">Лейкоцитарная Формула</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="neutrophils_percent">Нейтрофилы (%)</Label>
                    <Input
                      id="neutrophils_percent"
                      name="neutrophils_percent"
                      type="text"
                      placeholder="напр., 60.0"
                      value={formData.neutrophils_percent}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="neutrophils_absolute">Нейтрофилы (×10³/мкл)</Label>
                    <Input
                      id="neutrophils_absolute"
                      name="neutrophils_absolute"
                      type="text"
                      placeholder="напр., 4.1"
                      value={formData.neutrophils_absolute}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lymphocytes_percent">Лимфоциты (%)</Label>
                    <Input
                      id="lymphocytes_percent"
                      name="lymphocytes_percent"
                      type="text"
                      placeholder="напр., 30.0"
                      value={formData.lymphocytes_percent}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lymphocytes_absolute">Лимфоциты (×10³/мкл)</Label>
                    <Input
                      id="lymphocytes_absolute"
                      name="lymphocytes_absolute"
                      type="text"
                      placeholder="напр., 2.0"
                      value={formData.lymphocytes_absolute}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="monocytes_percent">Моноциты (%)</Label>
                    <Input
                      id="monocytes_percent"
                      name="monocytes_percent"
                      type="text"
                      placeholder="напр., 5.0"
                      value={formData.monocytes_percent}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="monocytes_absolute">Моноциты (×10³/мкл)</Label>
                    <Input
                      id="monocytes_absolute"
                      name="monocytes_absolute"
                      type="text"
                      placeholder="напр., 0.3"
                      value={formData.monocytes_absolute}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="eosinophils_percent">Эозинофилы (%)</Label>
                    <Input
                      id="eosinophils_percent"
                      name="eosinophils_percent"
                      type="text"
                      placeholder="напр., 3.0"
                      value={formData.eosinophils_percent}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="eosinophils_absolute">Эозинофилы (×10³/мкл)</Label>
                    <Input
                      id="eosinophils_absolute"
                      name="eosinophils_absolute"
                      type="text"
                      placeholder="напр., 0.2"
                      value={formData.eosinophils_absolute}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="basophils_percent">Базофилы (%)</Label>
                    <Input
                      id="basophils_percent"
                      name="basophils_percent"
                      type="text"
                      placeholder="напр., 2.0"
                      value={formData.basophils_percent}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="basophils_absolute">Базофилы (×10³/мкл)</Label>
                    <Input
                      id="basophils_absolute"
                      name="basophils_absolute"
                      type="text"
                      placeholder="напр., 0.1"
                      value={formData.basophils_absolute}
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
