import type { Metadata } from "next"
import Link from "next/link"
import { FileText, PenLine, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Интерпретатор Анализов Крови | Главная",
  description:
    "Загрузите или введите вручную результаты анализа крови для профессиональной интерпретации и персонализированных рекомендаций по здоровью.",
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-white">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg text-sky-600">
            <FileText className="h-5 w-5" />
            <span>Интерпретатор Анализов</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="https://oncomed.kz/" className="text-sm font-medium hover:underline underline-offset-4" target="_blank" rel="noopener noreferrer">
              О нас
            </Link>
            <Link href="https://oncomed.kz/vidylecheniya" className="text-sm font-medium hover:underline underline-offset-4" target="_blank" rel="noopener noreferrer">
              Виды лечения
            </Link>
            <Link href="https://oncomed.kz/nashyvrachi" className="text-sm font-medium hover:underline underline-offset-4" target="_blank" rel="noopener noreferrer">
              Наши врачи
            </Link>
            <Link href="https://www.youtube.com/@oncomedastana" className="text-sm font-medium hover:underline underline-offset-4" target="_blank" rel="noopener noreferrer">
              Отзывы на YouTube
            </Link>
            <Link href="https://oncomed.kz/" className="text-sm font-medium hover:underline underline-offset-4" target="_blank" rel="noopener noreferrer">
              Прайс
            </Link>
            <Link href="https://2gis.kz/astana/firm/70000001042561107" className="text-sm font-medium hover:underline underline-offset-4" target="_blank" rel="noopener noreferrer">
              Контакты
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-sky-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Расшифровка Результатов Ваших Анализов Крови
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Получите персонализированную интерпретацию и рекомендации по здоровью на основе ваших лабораторных
                  результатов.
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-5xl py-12">
              <h2 className="text-3xl font-bold text-center mb-12">Как вы хотите проанализировать ваши результаты?</h2>

              <div className="grid gap-8 md:grid-cols-2">
                <div className="border rounded-lg p-8 hover:shadow-md transition-shadow">
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <div className="w-24 h-24 bg-sky-100 rounded-full flex items-center justify-center mb-6">
                        <Upload className="h-10 w-10 text-sky-600" />
                      </div>

                      <h3 className="text-2xl font-bold mb-2">Загрузить Результаты Анализов</h3>
                      <p className="text-muted-foreground mb-2">
                        Загрузите ваш лабораторный отчет, и наша система извлечет и проанализирует значения.
                      </p>
                      <p className="text-sm text-muted-foreground mb-8">Поддерживаемые форматы: JPG, PNG, PDF</p>
                    </div>

                    <Button asChild className="w-full bg-sky-500 hover:bg-sky-600">
                      <Link href="/upload" className="flex items-center justify-center">
                        Начать
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="ml-2 h-4 w-4"
                        >
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="border rounded-lg p-8 hover:shadow-md transition-shadow">
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <div className="w-24 h-24 bg-sky-100 rounded-full flex items-center justify-center mb-6">
                        <FileText className="h-10 w-10 text-sky-600" />
                      </div>

                      <h3 className="text-2xl font-bold mb-2">Ручной Ввод</h3>
                      {/* <p className="text-muted-foreground mb-2">Введите значения анализа крови вручную в нашу форму.</p> */}
                      <p className="text-muted-foreground mb-8">
                        Введите значения ваших лабораторных показателей вручную в нашу форму
                      </p>
                    </div>

                    <Button asChild className="w-full bg-sky-500 hover:bg-sky-600">
                      <Link href="/manual-entry" className="flex items-center justify-center">
                        Начать
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="ml-2 h-4 w-4"
                        >
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-muted-foreground">
                Наш продвинутый алгоритм анализирует результаты вашего анализа крови и предоставляет персонализированные
                выводы на основе последних медицинских исследований.
              </p>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                  <Upload className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Простая Загрузка</h3>
                <p className="text-muted-foreground">
                  Просто загрузите изображение или PDF-файл с результатами анализа крови для мгновенного анализа.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                  <PenLine className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Ручной Ввод</h3>
                <p className="text-muted-foreground">
                  Введите значения анализа крови вручную для детальной интерпретации.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Персонализированные Выводы</h3>
                <p className="text-muted-foreground">
                  Получите индивидуальные рекомендации по здоровью на основе ваших уникальных результатов.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-white">
        <div className="container flex flex-col gap-2 sm:flex-row py-6 w-full items-center px-4 md:px-6">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Интерпретатор Анализов Крови. Все права защищены.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link href="#" className="text-xs hover:underline underline-offset-4" target="_blank" rel="noopener noreferrer">
              Условия использования
            </Link>
            <Link href="#" className="text-xs hover:underline underline-offset-4" target="_blank" rel="noopener noreferrer">
              Конфиденциальность
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
