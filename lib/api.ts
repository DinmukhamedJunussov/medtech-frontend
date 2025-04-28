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
        name: "Гемоглобин",
        value: formData?.hemoglobin ? Number.parseFloat(formData.hemoglobin) : 14.2,
        unit: "г/дл",
        referenceRange: "13.5-17.5",
        status: "normal",
      },
      {
        name: "Лейкоциты",
        value: formData?.wbc ? Number.parseFloat(formData.wbc) : 11.5,
        unit: "×10³/мкл",
        referenceRange: "4.5-11.0",
        status: "high",
      },
      {
        name: "Эритроциты",
        value: formData?.rbc ? Number.parseFloat(formData.rbc) : 5.2,
        unit: "×10⁶/мкл",
        referenceRange: "4.5-5.9",
        status: "normal",
      },
      {
        name: "Тромбоциты",
        value: formData?.platelets ? Number.parseFloat(formData.platelets) : 140,
        unit: "×10³/мкл",
        referenceRange: "150-450",
        status: "low",
      },
      {
        name: "Гематокрит",
        value: formData?.hematocrit ? Number.parseFloat(formData.hematocrit) : 42,
        unit: "%",
        referenceRange: "41-50",
        status: "normal",
      },
      {
        name: "MCV",
        value: formData?.mcv ? Number.parseFloat(formData.mcv) : 88,
        unit: "фл",
        referenceRange: "80-96",
        status: "normal",
      },
      {
        name: "MCH",
        value: formData?.mch ? Number.parseFloat(formData.mch) : 29,
        unit: "пг",
        referenceRange: "27-33",
        status: "normal",
      },
      {
        name: "MCHC",
        value: formData?.mchc ? Number.parseFloat(formData.mchc) : 33,
        unit: "г/дл",
        referenceRange: "32-36",
        status: "normal",
      },
      {
        name: "Нейтрофилы",
        value: formData?.neutrophils ? Number.parseFloat(formData.neutrophils) : 75,
        unit: "%",
        referenceRange: "40-60",
        status: "high",
      },
      {
        name: "Лимфоциты",
        value: formData?.lymphocytes ? Number.parseFloat(formData.lymphocytes) : 20,
        unit: "%",
        referenceRange: "20-40",
        status: "normal",
      },
      {
        name: "Моноциты",
        value: formData?.monocytes ? Number.parseFloat(formData.monocytes) : 3,
        unit: "%",
        referenceRange: "2-8",
        status: "normal",
      },
      {
        name: "Эозинофилы",
        value: formData?.eosinophils ? Number.parseFloat(formData.eosinophils) : 1,
        unit: "%",
        referenceRange: "1-4",
        status: "normal",
      },
      {
        name: "Базофилы",
        value: formData?.basophils ? Number.parseFloat(formData.basophils) : 0.5,
        unit: "%",
        referenceRange: "0-1",
        status: "normal",
      },
    ],
    explanation:
      "Результаты вашего анализа крови показывают повышенное количество лейкоцитов (лейкоцитоз) и процент нейтрофилов (нейтрофилия), что может указывать на текущую инфекцию или воспалительный процесс. Количество тромбоцитов немного ниже референсного диапазона, что может быть связано с различными факторами, включая недавнюю инфекцию, определенные лекарства или другие основные состояния. Все остальные параметры находятся в пределах нормы.",
    recommendations: [
      "Рассмотрите возможность последующего приема у вашего лечащего врача для обсуждения этих результатов.",
      "Если вы испытываете такие симптомы, как лихорадка, усталость или необъяснимая боль, сообщите об этом своему врачу.",
      "Поддерживайте хорошую гидратацию и сбалансированную диету, богатую железом и витаминами.",
      "Если вы в настоящее время принимаете какие-либо лекарства, обсудите с вашим врачом, могут ли они влиять на ваши показатели крови.",
      "Может быть рекомендовано повторное исследование крови через 2-4 недели для мониторинга изменений в количестве лейкоцитов и тромбоцитов.",
    ],
  }
}
