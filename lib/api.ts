// Mock API functions for blood test analysis

// Mock function to analyze uploaded blood test results
export async function analyzeBloodTest(formData: FormData) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Return mock data
  return getMockResults()
}

// Mock function to analyze manually entered blood test values
export async function analyzeManualEntry(formData: any) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Return mock data
  return getMockResults(formData)
}

// Helper function to generate mock results
function getMockResults(formData?: any) {
  // Generate some abnormal results for demonstration
  const hasAbnormalities = true

  // Basic mock data
  return {
    results: [
      {
        name: "Hemoglobin",
        value: formData?.hemoglobin ? Number.parseFloat(formData.hemoglobin) : 14.2,
        unit: "g/dL",
        referenceRange: "13.5-17.5",
        status: "normal",
      },
      {
        name: "White Blood Cells",
        value: formData?.wbc ? Number.parseFloat(formData.wbc) : 11.5,
        unit: "×10³/µL",
        referenceRange: "4.5-11.0",
        status: "high",
      },
      {
        name: "Red Blood Cells",
        value: formData?.rbc ? Number.parseFloat(formData.rbc) : 5.2,
        unit: "×10⁶/µL",
        referenceRange: "4.5-5.9",
        status: "normal",
      },
      {
        name: "Platelets",
        value: formData?.platelets ? Number.parseFloat(formData.platelets) : 140,
        unit: "×10³/µL",
        referenceRange: "150-450",
        status: "low",
      },
      {
        name: "Hematocrit",
        value: formData?.hematocrit ? Number.parseFloat(formData.hematocrit) : 42,
        unit: "%",
        referenceRange: "41-50",
        status: "normal",
      },
      {
        name: "MCV",
        value: formData?.mcv ? Number.parseFloat(formData.mcv) : 88,
        unit: "fL",
        referenceRange: "80-96",
        status: "normal",
      },
      {
        name: "MCH",
        value: formData?.mch ? Number.parseFloat(formData.mch) : 29,
        unit: "pg",
        referenceRange: "27-33",
        status: "normal",
      },
      {
        name: "MCHC",
        value: formData?.mchc ? Number.parseFloat(formData.mchc) : 33,
        unit: "g/dL",
        referenceRange: "32-36",
        status: "normal",
      },
      {
        name: "Neutrophils",
        value: formData?.neutrophils ? Number.parseFloat(formData.neutrophils) : 75,
        unit: "%",
        referenceRange: "40-60",
        status: "high",
      },
      {
        name: "Lymphocytes",
        value: formData?.lymphocytes ? Number.parseFloat(formData.lymphocytes) : 20,
        unit: "%",
        referenceRange: "20-40",
        status: "normal",
      },
      {
        name: "Monocytes",
        value: formData?.monocytes ? Number.parseFloat(formData.monocytes) : 3,
        unit: "%",
        referenceRange: "2-8",
        status: "normal",
      },
      {
        name: "Eosinophils",
        value: formData?.eosinophils ? Number.parseFloat(formData.eosinophils) : 1,
        unit: "%",
        referenceRange: "1-4",
        status: "normal",
      },
      {
        name: "Basophils",
        value: formData?.basophils ? Number.parseFloat(formData.basophils) : 0.5,
        unit: "%",
        referenceRange: "0-1",
        status: "normal",
      },
    ],
    explanation:
      "Your blood test results show an elevated white blood cell count (leukocytosis) and neutrophil percentage (neutrophilia), which may indicate an ongoing infection or inflammatory process. Your platelet count is slightly below the reference range, which could be due to various factors including recent infection, certain medications, or other underlying conditions. All other parameters are within normal ranges.",
    recommendations: [
      "Consider a follow-up appointment with your healthcare provider to discuss these findings.",
      "If you're experiencing symptoms like fever, fatigue, or unexplained pain, mention these to your doctor.",
      "Stay well-hydrated and maintain a balanced diet rich in iron and vitamins.",
      "If you're currently taking any medications, discuss with your doctor if they might be affecting your blood counts.",
      "A repeat blood test in 2-4 weeks may be recommended to monitor changes in your white blood cell and platelet counts.",
    ],
  }
}
