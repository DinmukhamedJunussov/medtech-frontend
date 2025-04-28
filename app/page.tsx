import type { Metadata } from "next"
import Link from "next/link"
import { FileText, PenLine } from "lucide-react"

import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Blood Test Interpreter | Home",
  description:
    "Upload or manually enter your blood test results for professional interpretation and personalized health recommendations.",
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-white">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg text-sky-600">
            <FileText className="h-5 w-5" />
            <span>BloodTest Interpreter</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              About
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              FAQ
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Contact
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
                  Understand Your Blood Test Results
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Get personalized interpretations and health recommendations based on your lab results.
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-5xl py-12">
              <h2 className="text-3xl font-bold text-center mb-12">How would you like to analyze your results?</h2>

              <div className="grid gap-8 md:grid-cols-2">
                <div className="border rounded-lg p-8 hover:shadow-md transition-shadow">
                  <div className="flex flex-col items-start">
                    <div className="bg-sky-100 rounded-full p-4 mb-6">
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
                        className="text-sky-600"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" x2="12" y1="3" y2="15" />
                      </svg>
                    </div>

                    <h3 className="text-2xl font-bold mb-2">Upload Test Results</h3>
                    <p className="text-muted-foreground mb-2">
                      Upload your lab report and our system will extract and analyze the values.
                    </p>
                    <p className="text-sm text-muted-foreground mb-8">Supported formats: JPG, PNG, PDF</p>

                    <Button asChild className="w-full bg-sky-500 hover:bg-sky-600">
                      <Link href="/upload" className="flex items-center justify-center">
                        Get Started
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
                  <div className="flex flex-col items-start">
                    <div className="bg-sky-100 rounded-full p-4 mb-6">
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
                        className="text-sky-600"
                      >
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    </div>

                    <h3 className="text-2xl font-bold mb-2">Manual Entry</h3>
                    <p className="text-muted-foreground mb-2">Input your blood test values manually into our form.</p>
                    <p className="text-muted-foreground mb-8">Enter your lab values manually in our form</p>

                    <Button asChild className="w-full bg-sky-500 hover:bg-sky-600">
                      <Link href="/manual-entry" className="flex items-center justify-center">
                        Get Started
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
                Our advanced algorithm analyzes your blood test results and provides personalized insights based on the
                latest medical research.
              </p>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Easy Upload</h3>
                <p className="text-muted-foreground">
                  Simply upload an image or PDF of your blood test results for instant analysis.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                  <PenLine className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Manual Entry</h3>
                <p className="text-muted-foreground">
                  Enter your blood test values manually for a detailed interpretation.
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
                <h3 className="text-xl font-bold">Personalized Insights</h3>
                <p className="text-muted-foreground">
                  Receive tailored health recommendations based on your unique results.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-white">
        <div className="container flex flex-col gap-2 sm:flex-row py-6 w-full items-center px-4 md:px-6">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} BloodTest Interpreter. All rights reserved.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link href="#" className="text-xs hover:underline underline-offset-4">
              Terms of Service
            </Link>
            <Link href="#" className="text-xs hover:underline underline-offset-4">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
