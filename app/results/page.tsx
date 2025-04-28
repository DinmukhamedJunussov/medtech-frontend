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
          <AlertTitle>Результаты не найдены</AlertTitle>
          <AlertDescription>
            Мы не смогли найти результаты анализа. Пожалуйста, вернитесь на главную страницу и попробуйте снова.
          </AlertDescription>
        </Alert>
        <Button asChild className="mt-4">
          <Link href="/">Вернуться на Главную</Link>
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
        Вернуться на Главную
      </Link>

      <div className="space-y-8">
        <Card>
          <CardHeader className="bg-sky-50 border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl flex items-center gap-2">
                <FileText className="h-6 w-6 text-sky-600" />
                Результаты Анализа Крови
              </CardTitle>
              <Badge variant={abnormalResults.length > 0 ? "destructive" : "default"}>
                {abnormalResults.length > 0 ? "Обнаружены Отклонения" : "Все Результаты в Норме"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">Все Результаты</TabsTrigger>
                <TabsTrigger value="abnormal">
                  Отклонения
                  {abnormalResults.length > 0 && (
                    <Badge variant="destructive" className="ml-2">
                      {abnormalResults.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="normal">Норма</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="pt-4">
                <div className="space-y-4">
                  <div className="rounded-md border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="px-4 py-2.5 text-left font-medium">Тест</th>
                          <th className="px-4 py-2.5 text-left font-medium">Результат</th>
                          <th className="px-4 py-2.5 text-left font-medium">Референсный Диапазон</th>
                          <th className="px-4 py-2.5 text-left font-medium">Статус</th>
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
                                          Повышен
                                        </Badge>
                                      ) : (
                                        <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50">
                                          Понижен
                                        </Badge>
                                      )}
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    {result.status === "normal"
                                      ? "В пределах нормы"
                                      : result.status === "critical"
                                        ? "Критическое значение - требует немедленного внимания"
                                        : result.status === "high"
                                          ? "Выше нормы"
                                          : "Ниже нормы"}
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
                            <th className="px-4 py-2.5 text-left font-medium">Тест</th>
                            <th className="px-4 py-2.5 text-left font-medium">Результат</th>
                            <th className="px-4 py-2.5 text-left font-medium">Референсный Диапазон</th>
                            <th className="px-4 py-2.5 text-left font-medium">Статус</th>
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
                                  <Badge variant="destructive">Критический</Badge>
                                ) : result.status === "high" ? (
                                  <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
                                    Повышен
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50">
                                    Понижен
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
                    <h3 className="text-lg font-medium">Все Результаты в Норме</h3>
                    <p className="text-muted-foreground mt-1">
                      Все ваши результаты анализов находятся в пределах нормы.
                    </p>
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
                            <th className="px-4 py-2.5 text-left font-medium">Тест</th>
                            <th className="px-4 py-2.5 text-left font-medium">Результат</th>
                            <th className="px-4 py-2.5 text-left font-medium">Референсный Диапазон</th>
                            <th className="px-4 py-2.5 text-left font-medium">Статус</th>
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
                    <h3 className="text-lg font-medium">Нет Нормальных Результатов</h3>
                    <p className="text-muted-foreground mt-1">
                      Все ваши результаты анализов находятся вне пределов нормы.
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-sky-50 border-b">
            <CardTitle className="text-2xl">Персонализированный Анализ</CardTitle>
            <CardDescription>
              На основе результатов вашего анализа крови наш алгоритм сгенерировал следующий анализ
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Объяснение</h3>
                <div className="text-muted-foreground">
                  <p>{results.explanation}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Рекомендации</h3>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  {results.recommendations.map((recommendation, index) => (
                    <li key={index}>{recommendation}</li>
                  ))}
                </ul>
              </div>

              <Alert className="bg-sky-50 border-sky-200">
                <Info className="h-4 w-4 text-sky-600" />
                <AlertTitle>Важное Примечание</AlertTitle>
                <AlertDescription>
                  Этот анализ сгенерирован алгоритмом и не должен заменять профессиональную медицинскую консультацию.
                  Всегда консультируйтесь с медицинским специалистом относительно ваших результатов анализов.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center gap-4 pt-6">
            <Button className="w-full sm:w-auto bg-sky-600 hover:bg-sky-700">
              <Calendar className="mr-2 h-4 w-4" />
              Записаться на Прием в Онкомед
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              Скачать Результаты в PDF
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
