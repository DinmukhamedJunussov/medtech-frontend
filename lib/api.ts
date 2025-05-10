// Mock API functions for blood test analysis

// Референсные интервалы для показателей крови
const REFERENCE_RANGES = {
  hemoglobin: "120-140", // г/л
  white_blood_cells: "4.00-9.00", // ×10⁹/л
  red_blood_cells: "3.90-4.70", // ×10¹²/л
  platelets: "180-320", // ×10⁹/л
  neutrophils_percent: "47.0-72.0", // %
  neutrophils_absolute: "2.00-5.50", // ×10⁹/л
  lymphocytes_percent: "18.0-40.0", // %
  lymphocytes_absolute: "1.20-3.00", // ×10⁹/л
  monocytes_percent: "2.0-9.0", // %
  monocytes_absolute: "0.09-0.60", // ×10⁹/л
  eosinophils_percent: "0.5-5.0", // %
  eosinophils_absolute: "0.02-0.30", // ×10⁹/л
  basophils_percent: "0.00-1.00", // %
  basophils_absolute: "0.000-0.065", // ×10⁹/л
  color_index: "0.86-1.05", // без единиц
  hematocrit: "34.0-46.0", // %
  mcv: "80.0-99.0", // фл
  mch: "27.0-34.5", // пг
  mchc: "317-354", // г/л
  rdw: "11.5-14.5", // %
  pct: "0.150-0.400", // %
  mpv: "9.2-12.1", // фл
  esr_panchenkov: "2-18", // мм/час
  esr_westergren: "2-20" // мм/час
} as const;

// Функция для определения статуса показателя
function getStatus(value: number, referenceRange: string): string {
  // Очищаем строку от пробелов и заменяем запятые на точки
  const cleanRange = referenceRange.replace(/\s/g, '').replace(/,/g, '.');
  const [min, max] = cleanRange.split('-').map(Number);
  
  if (isNaN(value) || value === null) return 'normal';
  if (value < min) return 'low';
  if (value > max) return 'high';
  return 'normal';
}

// Mock function to analyze uploaded blood test results
export async function analyzeBloodTest(formData: FormData) {
  try {
    // Отправляем файл на сервер для парсинга
    const parseResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/parse-blood-test`, {
      method: 'POST',
      body: formData,
    })

    if (!parseResponse.ok) {
      throw new Error('Ошибка при парсинге файла')
    }

    const parsedData = await parseResponse.json()

    // Отправляем полученные данные на сервер для анализа
    const analysisResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blood-results`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
      },
      body: JSON.stringify(parsedData),
    })

    if (!analysisResponse.ok) {
      throw new Error('Ошибка при анализе данных')
    }

    const analysisData = await analysisResponse.json()

    // Форматируем данные в том же формате, что и при ручном вводе
    const processedData = {
      results: [
        {
          name: "Гемоглобин",
          value: Number(parsedData.hemoglobin),
          unit: "г/л",
          referenceRange: REFERENCE_RANGES.hemoglobin,
          status: getStatus(Number(parsedData.hemoglobin), REFERENCE_RANGES.hemoglobin),
        },
        {
          name: "Лейкоциты",
          value: Number(parsedData.white_blood_cells),
          unit: "×10⁹/л",
          referenceRange: REFERENCE_RANGES.white_blood_cells,
          status: getStatus(Number(parsedData.white_blood_cells), REFERENCE_RANGES.white_blood_cells),
        },
        {
          name: "Эритроциты",
          value: Number(parsedData.red_blood_cells),
          unit: "×10¹²/л",
          referenceRange: REFERENCE_RANGES.red_blood_cells,
          status: getStatus(Number(parsedData.red_blood_cells), REFERENCE_RANGES.red_blood_cells),
        },
        {
          name: "Тромбоциты",
          value: Number(parsedData.platelets),
          unit: "×10⁹/л",
          referenceRange: REFERENCE_RANGES.platelets,
          status: getStatus(Number(parsedData.platelets), REFERENCE_RANGES.platelets),
        },
        {
          name: "Нейтрофилы",
          value: Number(parsedData.neutrophils_percent),
          unit: "%",
          referenceRange: REFERENCE_RANGES.neutrophils_percent,
          status: getStatus(Number(parsedData.neutrophils_percent), REFERENCE_RANGES.neutrophils_percent),
        },
        {
          name: "Нейтрофилы (абс.)",
          value: Number(parsedData.neutrophils_absolute),
          unit: "×10⁹/л",
          referenceRange: REFERENCE_RANGES.neutrophils_absolute,
          status: getStatus(Number(parsedData.neutrophils_absolute), REFERENCE_RANGES.neutrophils_absolute),
        },
        {
          name: "Лимфоциты",
          value: Number(parsedData.lymphocytes_percent),
          unit: "%",
          referenceRange: REFERENCE_RANGES.lymphocytes_percent,
          status: getStatus(Number(parsedData.lymphocytes_percent), REFERENCE_RANGES.lymphocytes_percent),
        },
        {
          name: "Лимфоциты (абс.)",
          value: Number(parsedData.lymphocytes_absolute),
          unit: "×10⁹/л",
          referenceRange: REFERENCE_RANGES.lymphocytes_absolute,
          status: getStatus(Number(parsedData.lymphocytes_absolute), REFERENCE_RANGES.lymphocytes_absolute),
        },
        {
          name: "Моноциты",
          value: Number(parsedData.monocytes_percent),
          unit: "%",
          referenceRange: REFERENCE_RANGES.monocytes_percent,
          status: getStatus(Number(parsedData.monocytes_percent), REFERENCE_RANGES.monocytes_percent),
        },
        {
          name: "Моноциты (абс.)",
          value: Number(parsedData.monocytes_absolute),
          unit: "×10⁹/л",
          referenceRange: REFERENCE_RANGES.monocytes_absolute,
          status: getStatus(Number(parsedData.monocytes_absolute), REFERENCE_RANGES.monocytes_absolute),
        },
        {
          name: "Эозинофилы",
          value: Number(parsedData.eosinophils_percent),
          unit: "%",
          referenceRange: REFERENCE_RANGES.eosinophils_percent,
          status: getStatus(Number(parsedData.eosinophils_percent), REFERENCE_RANGES.eosinophils_percent),
        },
        {
          name: "Эозинофилы (абс.)",
          value: Number(parsedData.eosinophils_absolute),
          unit: "×10⁹/л",
          referenceRange: REFERENCE_RANGES.eosinophils_absolute,
          status: getStatus(Number(parsedData.eosinophils_absolute), REFERENCE_RANGES.eosinophils_absolute),
        },
        {
          name: "Базофилы",
          value: Number(parsedData.basophils_percent),
          unit: "%",
          referenceRange: REFERENCE_RANGES.basophils_percent,
          status: getStatus(Number(parsedData.basophils_percent), REFERENCE_RANGES.basophils_percent),
        },
        {
          name: "Базофилы (абс.)",
          value: Number(parsedData.basophils_absolute),
          unit: "×10⁹/л",
          referenceRange: REFERENCE_RANGES.basophils_absolute,
          status: getStatus(Number(parsedData.basophils_absolute), REFERENCE_RANGES.basophils_absolute),
        },
      ],
      analysis: analysisData
    }

    return processedData
  } catch (error) {
    console.error('Error in analyzeBloodTest:', error)
    throw error
  }
}

// Function to analyze manually entered blood test values
export async function analyzeManualEntry(formData: any) {
  try {
    console.log('Отправляем данные на анализ:', formData);
    
    // Отправляем данные на сервер для анализа
    const analysisResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blood-results`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
      },
      body: JSON.stringify({
        hemoglobin: Number.parseFloat(formData.hemoglobin),
        white_blood_cells: Number.parseFloat(formData.white_blood_cells),
        red_blood_cells: Number.parseFloat(formData.red_blood_cells),
        platelets: Number.parseFloat(formData.platelets),
        neutrophils_percent: Number.parseFloat(formData.neutrophils_percent),
        neutrophils_absolute: Number.parseFloat(formData.neutrophils_absolute),
        lymphocytes_percent: Number.parseFloat(formData.lymphocytes_percent),
        lymphocytes_absolute: Number.parseFloat(formData.lymphocytes_absolute),
        monocytes_percent: Number.parseFloat(formData.monocytes_percent),
        monocytes_absolute: Number.parseFloat(formData.monocytes_absolute),
        eosinophils_percent: Number.parseFloat(formData.eosinophils_percent),
        eosinophils_absolute: Number.parseFloat(formData.eosinophils_absolute),
        basophils_percent: Number.parseFloat(formData.basophils_percent),
        basophils_absolute: Number.parseFloat(formData.basophils_absolute),
      }),
    })

    console.log('Статус ответа:', analysisResponse.status);
    console.log('Заголовки ответа:', Object.fromEntries(analysisResponse.headers.entries()));

    if (!analysisResponse.ok) {
      const errorText = await analysisResponse.text();
      console.error('Ошибка ответа:', errorText);
      throw new Error(`Ошибка при анализе данных: ${errorText}`);
    }

    const analysisData = await analysisResponse.json();
    console.log('Полученные данные анализа:', analysisData);

    // Преобразуем все числовые значения и логируем их для отладки
    const processedData = {
      results: [
        {
          name: "Гемоглобин",
          value: Number(formData.hemoglobin),
          unit: "г/л",
          referenceRange: REFERENCE_RANGES.hemoglobin,
          status: getStatus(Number(formData.hemoglobin), REFERENCE_RANGES.hemoglobin),
        },
        {
          name: "Лейкоциты",
          value: Number(formData.white_blood_cells),
          unit: "×10⁹/л",
          referenceRange: REFERENCE_RANGES.white_blood_cells,
          status: getStatus(Number(formData.white_blood_cells), REFERENCE_RANGES.white_blood_cells),
        },
        {
          name: "Эритроциты",
          value: Number(formData.red_blood_cells),
          unit: "×10¹²/л",
          referenceRange: REFERENCE_RANGES.red_blood_cells,
          status: getStatus(Number(formData.red_blood_cells), REFERENCE_RANGES.red_blood_cells),
        },
        {
          name: "Тромбоциты",
          value: Number(formData.platelets),
          unit: "×10⁹/л",
          referenceRange: REFERENCE_RANGES.platelets,
          status: getStatus(Number(formData.platelets), REFERENCE_RANGES.platelets),
        },
        {
          name: "Нейтрофилы",
          value: Number(formData.neutrophils_percent),
          unit: "%",
          referenceRange: REFERENCE_RANGES.neutrophils_percent,
          status: getStatus(Number(formData.neutrophils_percent), REFERENCE_RANGES.neutrophils_percent),
        },
        {
          name: "Нейтрофилы (абс.)",
          value: Number(formData.neutrophils_absolute),
          unit: "×10⁹/л",
          referenceRange: REFERENCE_RANGES.neutrophils_absolute,
          status: getStatus(Number(formData.neutrophils_absolute), REFERENCE_RANGES.neutrophils_absolute),
        },
        {
          name: "Лимфоциты",
          value: Number(formData.lymphocytes_percent),
          unit: "%",
          referenceRange: REFERENCE_RANGES.lymphocytes_percent,
          status: getStatus(Number(formData.lymphocytes_percent), REFERENCE_RANGES.lymphocytes_percent),
        },
        {
          name: "Лимфоциты (абс.)",
          value: Number(formData.lymphocytes_absolute),
          unit: "×10⁹/л",
          referenceRange: REFERENCE_RANGES.lymphocytes_absolute,
          status: getStatus(Number(formData.lymphocytes_absolute), REFERENCE_RANGES.lymphocytes_absolute),
        },
        {
          name: "Моноциты",
          value: Number(formData.monocytes_percent),
          unit: "%",
          referenceRange: REFERENCE_RANGES.monocytes_percent,
          status: getStatus(Number(formData.monocytes_percent), REFERENCE_RANGES.monocytes_percent),
        },
        {
          name: "Моноциты (абс.)",
          value: Number(formData.monocytes_absolute),
          unit: "×10⁹/л",
          referenceRange: REFERENCE_RANGES.monocytes_absolute,
          status: getStatus(Number(formData.monocytes_absolute), REFERENCE_RANGES.monocytes_absolute),
        },
        {
          name: "Эозинофилы",
          value: Number(formData.eosinophils_percent),
          unit: "%",
          referenceRange: REFERENCE_RANGES.eosinophils_percent,
          status: getStatus(Number(formData.eosinophils_percent), REFERENCE_RANGES.eosinophils_percent),
        },
        {
          name: "Эозинофилы (абс.)",
          value: Number(formData.eosinophils_absolute),
          unit: "×10⁹/л",
          referenceRange: REFERENCE_RANGES.eosinophils_absolute,
          status: getStatus(Number(formData.eosinophils_absolute), REFERENCE_RANGES.eosinophils_absolute),
        },
        {
          name: "Базофилы",
          value: Number(formData.basophils_percent),
          unit: "%",
          referenceRange: REFERENCE_RANGES.basophils_percent,
          status: getStatus(Number(formData.basophils_percent), REFERENCE_RANGES.basophils_percent),
        },
        {
          name: "Базофилы (абс.)",
          value: Number(formData.basophils_absolute),
          unit: "×10⁹/л",
          referenceRange: REFERENCE_RANGES.basophils_absolute,
          status: getStatus(Number(formData.basophils_absolute), REFERENCE_RANGES.basophils_absolute),
        },
      ],
      explanation: analysisData.explanation,
      recommendations: analysisData.recommendations,
      analysis: analysisData
    }

    console.log('Processed data:', processedData)
    return processedData
  } catch (error) {
    console.error('Error in analyzeManualEntry:', error)
    throw error
  }
}

// Helper function to generate mock results
function getMockResults(formData?: any) {
  return {
    results: [
      {
        name: "Гемоглобин",
        value: formData?.hemoglobin ? Number.parseFloat(formData.hemoglobin) : 130,
        unit: "г/л",
        referenceRange: REFERENCE_RANGES.hemoglobin,
        status: getStatus(Number.parseFloat(formData?.hemoglobin || "130"), REFERENCE_RANGES.hemoglobin),
      },
      {
        name: "Лейкоциты",
        value: formData?.white_blood_cells ? Number.parseFloat(formData.white_blood_cells) : 6.5,
        unit: "×10⁹/л",
        referenceRange: REFERENCE_RANGES.white_blood_cells,
        status: getStatus(Number.parseFloat(formData?.white_blood_cells || "6.5"), REFERENCE_RANGES.white_blood_cells),
      },
      {
        name: "Эритроциты",
        value: formData?.red_blood_cells ? Number.parseFloat(formData.red_blood_cells) : 4.3,
        unit: "×10¹²/л",
        referenceRange: REFERENCE_RANGES.red_blood_cells,
        status: getStatus(Number.parseFloat(formData?.red_blood_cells || "4.3"), REFERENCE_RANGES.red_blood_cells),
      },
      {
        name: "Тромбоциты",
        value: formData?.platelets ? Number.parseFloat(formData.platelets) : 250,
        unit: "×10⁹/л",
        referenceRange: REFERENCE_RANGES.platelets,
        status: getStatus(Number.parseFloat(formData?.platelets || "250"), REFERENCE_RANGES.platelets),
      },
      {
        name: "Нейтрофилы",
        value: formData?.neutrophils_percent ? Number.parseFloat(formData.neutrophils_percent) : 55,
        unit: "%",
        referenceRange: REFERENCE_RANGES.neutrophils_percent,
        status: getStatus(Number.parseFloat(formData?.neutrophils_percent || "55"), REFERENCE_RANGES.neutrophils_percent),
      },
      {
        name: "Нейтрофилы (абс.)",
        value: formData?.neutrophils_absolute ? Number.parseFloat(formData.neutrophils_absolute) : 3.5,
        unit: "×10⁹/л",
        referenceRange: REFERENCE_RANGES.neutrophils_absolute,
        status: getStatus(Number.parseFloat(formData?.neutrophils_absolute || "3.5"), REFERENCE_RANGES.neutrophils_absolute),
      },
      {
        name: "Лимфоциты",
        value: formData?.lymphocytes_percent ? Number.parseFloat(formData.lymphocytes_percent) : 35,
        unit: "%",
        referenceRange: REFERENCE_RANGES.lymphocytes_percent,
        status: getStatus(Number.parseFloat(formData?.lymphocytes_percent || "35"), REFERENCE_RANGES.lymphocytes_percent),
      },
      {
        name: "Лимфоциты (абс.)",
        value: formData?.lymphocytes_absolute ? Number.parseFloat(formData.lymphocytes_absolute) : 2.3,
        unit: "×10⁹/л",
        referenceRange: REFERENCE_RANGES.lymphocytes_absolute,
        status: getStatus(Number.parseFloat(formData?.lymphocytes_absolute || "2.3"), REFERENCE_RANGES.lymphocytes_absolute),
      },
      {
        name: "Моноциты",
        value: formData?.monocytes_percent ? Number.parseFloat(formData.monocytes_percent) : 7,
        unit: "%",
        referenceRange: REFERENCE_RANGES.monocytes_percent,
        status: getStatus(Number.parseFloat(formData?.monocytes_percent || "7"), REFERENCE_RANGES.monocytes_percent),
      },
      {
        name: "Моноциты (абс.)",
        value: formData?.monocytes_absolute ? Number.parseFloat(formData.monocytes_absolute) : 0.5,
        unit: "×10⁹/л",
        referenceRange: REFERENCE_RANGES.monocytes_absolute,
        status: getStatus(Number.parseFloat(formData?.monocytes_absolute || "0.5"), REFERENCE_RANGES.monocytes_absolute),
      },
      {
        name: "Эозинофилы",
        value: formData?.eosinophils_percent ? Number.parseFloat(formData.eosinophils_percent) : 2.5,
        unit: "%",
        referenceRange: REFERENCE_RANGES.eosinophils_percent,
        status: getStatus(Number.parseFloat(formData?.eosinophils_percent || "2.5"), REFERENCE_RANGES.eosinophils_percent),
      },
      {
        name: "Эозинофилы (абс.)",
        value: formData?.eosinophils_absolute ? Number.parseFloat(formData.eosinophils_absolute) : 0.2,
        unit: "×10⁹/л",
        referenceRange: REFERENCE_RANGES.eosinophils_absolute,
        status: getStatus(Number.parseFloat(formData?.eosinophils_absolute || "0.2"), REFERENCE_RANGES.eosinophils_absolute),
      },
      {
        name: "Базофилы",
        value: formData?.basophils_percent ? Number.parseFloat(formData.basophils_percent) : 0.5,
        unit: "%",
        referenceRange: REFERENCE_RANGES.basophils_percent,
        status: getStatus(Number.parseFloat(formData?.basophils_percent || "0.5"), REFERENCE_RANGES.basophils_percent),
      },
      {
        name: "Базофилы (абс.)",
        value: formData?.basophils_absolute ? Number.parseFloat(formData.basophils_absolute) : 0.03,
        unit: "×10⁹/л",
        referenceRange: REFERENCE_RANGES.basophils_absolute,
        status: getStatus(Number.parseFloat(formData?.basophils_absolute || "0.03"), REFERENCE_RANGES.basophils_absolute),
      },
    ],
    explanation:
      "Результаты вашего анализа крови показывают повышенное количество лейкоцитов (лейкоцитоз) и процент нейтрофилов (нейтрофилия), что может указывать на текущую инфекцию или воспалительный процесс. Количество тромбоцитов немного ниже референсного диапазона, что может быть связано с различными факторами, включая недавнюю инфекцию, определенные лекарства или другие основные состояния. Также отмечается повышенный уровень базофилов, что может указывать на аллергическую реакцию или воспалительный процесс. Все остальные параметры находятся в пределах нормы.",
    recommendations: [
      "Рассмотрите возможность последующего приема у вашего лечащего врача для обсуждения этих результатов.",
      "Если вы испытываете такие симптомы, как лихорадка, усталость или необъяснимая боль, сообщите об этом своему врачу.",
      "Поддерживайте хорошую гидратацию и сбалансированную диету, богатую железом и витаминами.",
      "Если вы в настоящее время принимаете какие-либо лекарства, обсудите с вашим врачом, могут ли они влиять на ваши показатели крови.",
      "Может быть рекомендовано повторное исследование крови через 2-4 недели для мониторинга изменений в количестве лейкоцитов и тромбоцитов.",
    ],
  }
}