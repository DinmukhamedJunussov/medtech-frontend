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

interface BloodTestResults {
  // Основные показатели
  hemoglobin: number | null
  white_blood_cells: number | null
  red_blood_cells: number | null
  platelets: number | null
  
  // Нейтрофилы
  neutrophils_percent: number | null
  neutrophils_absolute: number | null
  
  // Лимфоциты
  lymphocytes_percent: number | null
  lymphocytes_absolute: number | null
  
  // Моноциты
  monocytes_percent: number | null
  monocytes_absolute: number | null
  
  // Эозинофилы
  eosinophils_percent: number | null
  eosinophils_absolute: number | null
  
  // Базофилы
  basophils_percent: number | null
  basophils_absolute: number | null
  
  // Метаданные
  test_date: string | null
  patient_id: number | null
  lab_id: number | null
  notes: string | null

  // Анализ
  analysis?: {
    sii: number
    level: string
    interpretation: string
  }

  results: {
    name: string
    value: number | null
    unit: string
    referenceRange: string
    status: string
  }[]
}

interface AnalysisResponse {
  sii: number
  level: string
  interpretation: string
}

// Функция для форматирования чисел
function formatValue(value: number | null): string {
  if (value === null || isNaN(value)) return 'Н/Д'
  
  // Для очень маленьких чисел (меньше 0.01) показываем 3 знака после запятой
  if (value < 0.01) {
    return value.toFixed(3)
  }
  // Для остальных чисел показываем 2 знака после запятой
  return value.toFixed(2)
}

export default function ResultsPage() {
  const router = useRouter()
  const [results, setResults] = useState<BloodTestResults | null>(null)
  const [loading, setLoading] = useState(true)
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null)
  const [analysisLoading, setAnalysisLoading] = useState(false)
  const [analysisError, setAnalysisError] = useState<string | null>(null)

  useEffect(() => {
    const storedResults = localStorage.getItem("bloodTestResults")
    if (storedResults) {
      try {
        setResults(JSON.parse(storedResults))
      } catch (error) {
        console.error('Ошибка при парсинге данных:', error)
        router.push("/")
      }
    } else {
      router.push("/")
    }
    setLoading(false)
  }, [router])

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!results) return

      setAnalysisLoading(true)
      setAnalysisError(null)

      try {
        const response = await fetch('https://witty-comic-mackerel.ngrok-free.app/blood-results', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
          },
          body: JSON.stringify({
            hemoglobin: results.results[0].value,
            white_blood_cells: results.results[1].value,
            red_blood_cells: results.results[2].value,
            platelets: results.results[3].value,
            neutrophils_percent: results.results[4].value,
            neutrophils_absolute: results.results[5].value,
            lymphocytes_percent: results.results[6].value,
            lymphocytes_absolute: results.results[7].value,
            monocytes_percent: results.results[8].value,
            monocytes_absolute: results.results[9].value,
            eosinophils_percent: results.results[10].value,
            eosinophils_absolute: results.results[11].value,
            basophils_percent: results.results[12].value,
            basophils_absolute: results.results[13].value,
          }),
        })

        if (!response.ok) {
          throw new Error('Ошибка при получении анализа')
        }

        const data = await response.json()
        setAnalysis(data)
      } catch (error) {
        setAnalysisError(error instanceof Error ? error.message : 'Произошла ошибка при получении анализа')
      } finally {
        setAnalysisLoading(false)
      }
    }

    fetchAnalysis()
  }, [results])

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

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center text-sm font-medium text-sky-600 mb-6 hover:underline">
        <ArrowLeft className="mr-1 h-4 w-4" />
        Вернуться на Главную
      </Link>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Результаты Анализа Крови</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results?.results?.map((result, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">{result.name}</span>
                    <span className={`px-2 py-1 rounded text-sm ${
                      result.status === 'normal' ? 'bg-green-100 text-green-800' :
                      result.status === 'high' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {result.status === 'normal' ? 'Норма' :
                       result.status === 'high' ? 'Повышен' : 'Понижен'}
                    </span>
                  </div>
                  <div className="mt-2">
                    <span className="text-2xl font-semibold text-gray-900">
                      {formatValue(result.value)}
                    </span>
                    <span className="text-gray-500 ml-2">{result.unit}</span>
                  </div>
                  <div className="mt-1 text-sm text-gray-500">
                    Референсный интервал: {result.referenceRange}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {(results.patient_id || results.lab_id || results.notes) && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="font-semibold text-lg mb-4">Метаданные</h3>
              <div className="space-y-2 text-muted-foreground">
                {results.patient_id && <p>ID пациента: {results.patient_id}</p>}
                {results.lab_id && <p>ID лаборатории: {results.lab_id}</p>}
                {results.notes && <p>Дополнительные заметки: {results.notes}</p>}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader className="bg-sky-50 border-b">
          <CardTitle className="text-2xl">Персонализированный Анализ</CardTitle>
          <CardDescription>
            На основе результатов вашего анализа крови наш алгоритм сгенерировал следующий анализ
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {analysisLoading ? (
            <div className="flex items-center justify-center py-8">
              <LoadingSpinner className="h-8 w-8 text-sky-600" />
            </div>
          ) : analysisError ? (
            <Alert variant="destructive">
              <AlertTitle>Ошибка</AlertTitle>
              <AlertDescription>{analysisError}</AlertDescription>
            </Alert>
          ) : analysis ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Индекс воспаления</h3>
                <div className="text-muted-foreground">
                  <p className="text-2xl font-semibold mb-2">{analysis.sii.toFixed(2)}</p>
                  <div className="space-y-4">
                    <Badge 
                      variant={
                        analysis.level.includes('🟢') ? 'default' :
                        analysis.level.includes('🟩') ? 'default' :
                        analysis.level.includes('🟡') ? 'secondary' :
                        analysis.level.includes('🟠') ? 'secondary' :
                        'destructive'
                      }
                      className="text-base"
                    >
                      {analysis.level}
                    </Badge>
                    
                    <div className="mt-4 space-y-2">
                      <h4 className="font-medium">Клиническое значение:</h4>
                      <p>{analysis.interpretation}</p>
                    </div>
                  </div>
                </div>
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
          ) : null}
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-4 pt-6">
          <Button 
            className="w-full sm:w-auto bg-sky-600 hover:bg-sky-700"
            onClick={() => window.open('https://api.whatsapp.com/send/?phone=77053756633&text=%D0%9F%D0%B8%D1%88%D1%83+%D1%81+%D1%81%D0%B0%D0%B9%D1%82%D0%B0+oncotest.kz&type=phone_number&app_absent=0', '_blank')}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Записаться на Прием в Онкомед
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
