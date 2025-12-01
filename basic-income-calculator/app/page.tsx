"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import PersonalInfoForm from "@/components/forms/personal-info-form"
import IncomeForm from "@/components/forms/income-form"
import HousingForm from "@/components/forms/housing-form"
import HouseholdForm from "@/components/forms/household-form"
import ResultsDisplay from "@/components/results-display"
import EducationSection from "@/components/education-section"

export default function Home() {
  const [formData, setFormData] = useState({
    // Personal
    age: "",
    tax_category: "",
    n_basic_deductions: "",
    is_rural_resident: false,

    // Income
    income_wage: 0,
    income_biz: 0,
    income_assets: 0,
    income_insurance: 0,
    income_public_pension: 0,
    tax_credit_earned_income: 0,
    tax_credit_child: 0,
    allowance_child_parental: 0,
    income_capital_gains: 0,
    income_others: 0,

    // Housing
    housing_type: "",
    single_or_multi: "",
    housing_market_price: 0,
    housing_published_price: 0,
    housing_deposit: 0,
    housing_rent: 0,
    own_other_house: false,
    other_house_market_price: 0,
    other_house_published_price: 0,
    own_building: false,
    building_land_market_price: 0,
    building_land_published_price: 0,
    own_land: false,
    land_market_price: 0,
    land_published_price: 0,

    // Household
    household_size: 0,
  })

  const [results, setResults] = useState(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [completedSections, setCompletedSections] = useState({
    personal: false,
    income: false,
    housing: false,
    household: false,
  })
  const [currentSection, setCurrentSection] = useState("personal")
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  const sectionRefs = {
    personal: useRef<HTMLDivElement>(null),
    income: useRef<HTMLDivElement>(null),
    housing: useRef<HTMLDivElement>(null),
    household: useRef<HTMLDivElement>(null),
  }

  const handleFormChange = (fieldUpdates: any) => {
    setFormData((prev) => ({ ...prev, ...fieldUpdates }))
    setValidationErrors((prev) => {
      const newErrors = { ...prev }
      Object.keys(fieldUpdates).forEach((key) => {
        delete newErrors[key]
      })
      return newErrors
    })
  }

  const validatePersonalInfo = (): Record<string, string> => {
    const errors: Record<string, string> = {}
    if (!formData.age) errors.age = "나이를 입력해주세요"
    if (!formData.tax_category) errors.tax_category = "납세 지위를 선택해주세요"
    return errors
  }

  const validateHousingInfo = (): Record<string, string> => {
    const errors: Record<string, string> = {}
    if (!formData.housing_type) {
      errors.housing_type = "주택 입주 형태를 선택해주세요"
      return errors
    }

    if (formData.housing_type === "own") {
      if (!formData.single_or_multi) errors.single_or_multi = "주택 유형을 선택해주세요"
      const hasPrice = formData.housing_market_price > 0 || formData.housing_published_price > 0
      if (!hasPrice) {
        errors.housing_market_price = "시장가격 또는 공시가격을 입력해주세요"
      }
    }

    if (formData.housing_type === "jeonse") {
      if (!formData.housing_deposit) errors.housing_deposit = "보증금을 입력해주세요"
    }

    if (formData.housing_type === "rented_with_deposit" || formData.housing_type === "rented_without_deposit") {
      if (!formData.housing_deposit && formData.housing_type === "rented_with_deposit") {
        errors.housing_deposit = "보증금을 입력해주세요"
      }
      if (!formData.housing_rent) errors.housing_rent = "월세를 입력해주세요"
    }

    if (formData.housing_type === "free") {
      const hasPrice = formData.housing_market_price > 0 || formData.housing_published_price > 0
      if (!hasPrice) {
        errors.housing_market_price = "시장가격 또는 공시가격을 입력해주세요"
      }
    }

    if (formData.own_other_house) {
      const hasPrice = formData.other_house_market_price > 0 || formData.other_house_published_price > 0
      if (!hasPrice) {
        errors.other_house_market_price = "시장가격 또는 공시가격을 입력해주세요"
      }
    }

    if (formData.own_building) {
      const hasPrice = formData.building_land_market_price > 0 || formData.building_land_published_price > 0
      if (!hasPrice) {
        errors.building_land_market_price = "시장가격 또는 공시지가를 입력해주세요"
      }
    }

    if (formData.own_land) {
      const hasPrice = formData.land_market_price > 0 || formData.land_published_price > 0
      if (!hasPrice) {
        errors.land_market_price = "시장가격 또는 공시지가를 입력해주세요"
      }
    }

    return errors
  }

  const handlePersonalComplete = () => {
    const errors = validatePersonalInfo()
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors)
      return
    }
    setValidationErrors({})
    setCompletedSections((prev) => ({ ...prev, personal: true }))
    setCurrentSection("income")
    setTimeout(() => {
      sectionRefs.income.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  const handleIncomeComplete = () => {
    setValidationErrors({})
    setCompletedSections((prev) => ({ ...prev, income: true }))
    setCurrentSection("housing")
    setTimeout(() => {
      sectionRefs.housing.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  const handleHousingComplete = () => {
    const errors = validateHousingInfo()
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors)
      return
    }
    setValidationErrors({})
    setCompletedSections((prev) => ({ ...prev, housing: true }))
    setCurrentSection("household")
    setTimeout(() => {
      sectionRefs.household.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  const handleHouseholdComplete = () => {
    setValidationErrors({})
    setCompletedSections((prev) => ({ ...prev, household: true }))
  }

  const handleCalculate = async () => {
    if (!formData.age || !formData.tax_category || formData.housing_type === "") {
      alert("필수 항목을 모두 입력해주세요.")
      return
    }

    setIsCalculating(true)

    await new Promise((resolve) => setTimeout(resolve, 800))

    const mockResults = {
      benefits: {
        bi_universal: 25 * Number.parseInt(formData.n_basic_deductions || 0) * 100000,
        bi_land_dividend: 750000,
        bi_carbon_dividend: 500000,
        bi_rural: formData.is_rural_resident ? 1800000 : 0,
        bi_common_wealth_total: 0,
        bi_negative_income_tax: Math.random() * 3000000,
        universal_eitc: Math.random() * 3000000,
      },
      contributions: {
        basic_income_tax: Math.random() * 5000000,
        land_owning_tax: Math.random() * 2000000,
      },
      netBenefit: Math.random() * 10000000 - 5000000,
    }

    mockResults.benefits.bi_common_wealth_total =
      mockResults.benefits.bi_universal +
      mockResults.benefits.bi_land_dividend +
      mockResults.benefits.bi_carbon_dividend +
      mockResults.benefits.bi_rural

    setResults(mockResults)
    setIsCalculating(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">기본소득 계산기</h1>
          <p className="text-lg text-muted-foreground">새로운 기본소득 정책에 따른 귀하의 예상 수혜액을 계산하세요</p>
        </div>
      </div>

      <div className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex gap-2">
            {[
              { id: "personal", label: "기본정보" },
              { id: "income", label: "소득" },
              { id: "housing", label: "주거" },
              { id: "household", label: "가구" },
            ].map((section) => (
              <div
                key={section.id}
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-md text-center ${
                  completedSections[section.id as keyof typeof completedSections]
                    ? "bg-primary text-primary-foreground"
                    : currentSection === section.id
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {section.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      {!results ? (
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
          {/* Personal Info Section */}
          <div ref={sectionRefs.personal} className="scroll-mt-32">
            <Card>
              <CardHeader>
                <CardTitle>1. 기본정보</CardTitle>
                <CardDescription>귀하의 개인정보와 납세 지위를 입력해주세요</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <PersonalInfoForm
                  formData={formData}
                  onFormChange={handleFormChange}
                  validationErrors={validationErrors}
                />
                <Button
                  onClick={handlePersonalComplete}
                  disabled={!formData.age || !formData.tax_category}
                  className="w-full"
                >
                  다음: 소득정보 →
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Income Section */}
          {completedSections.personal && (
            <div ref={sectionRefs.income} className="scroll-mt-32">
              <Card>
                <CardHeader>
                  <CardTitle>2. 소득정보</CardTitle>
                  <CardDescription>지난 1년간의 다양한 소득을 입력해주세요</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <IncomeForm formData={formData} onFormChange={handleFormChange} />
                  <div className="flex gap-4">
                    <Button
                      onClick={() => {
                        setCurrentSection("personal")
                        sectionRefs.personal.current?.scrollIntoView({ behavior: "smooth" })
                      }}
                      variant="outline"
                      className="flex-1"
                    >
                      ← 이전
                    </Button>
                    <Button onClick={handleIncomeComplete} className="flex-1">
                      다음: 주거정보 →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Housing Section */}
          {completedSections.income && (
            <div ref={sectionRefs.housing} className="scroll-mt-32">
              <Card>
                <CardHeader>
                  <CardTitle>3. 주거정보</CardTitle>
                  <CardDescription>현재 거주중인 주택과 소유 부동산을 입력해주세요</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <HousingForm
                    formData={formData}
                    onFormChange={handleFormChange}
                    validationErrors={validationErrors}
                  />
                  <div className="flex gap-4">
                    <Button
                      onClick={() => {
                        setCurrentSection("income")
                        sectionRefs.income.current?.scrollIntoView({ behavior: "smooth" })
                      }}
                      variant="outline"
                      className="flex-1"
                    >
                      ← 이전
                    </Button>
                    <Button onClick={handleHousingComplete} className="flex-1">
                      다음: 가구정보 →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Household Section */}
          {completedSections.housing && (
            <div ref={sectionRefs.household} className="scroll-mt-32">
              <Card>
                <CardHeader>
                  <CardTitle>4. 가구정보</CardTitle>
                  <CardDescription>가구원에 대한 정보를 입력해주세요</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <HouseholdForm formData={formData} onFormChange={handleFormChange} />
                  <div className="flex gap-4">
                    <Button
                      onClick={() => {
                        setCurrentSection("housing")
                        sectionRefs.housing.current?.scrollIntoView({ behavior: "smooth" })
                      }}
                      variant="outline"
                      className="flex-1"
                    >
                      ← 이전
                    </Button>
                    <Button onClick={handleHouseholdComplete} className="flex-1">
                      모두 완료
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Calculate Button */}
          {completedSections.household && (
            <div className="space-y-4">
              <Button onClick={handleCalculate} disabled={isCalculating} size="lg" className="w-full py-6 text-lg">
                {isCalculating ? "계산 중..." : "계산하기"}
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
          <ResultsDisplay results={results} formData={formData} />

          <div className="flex gap-4">
            <Button
              onClick={() => {
                setResults(null)
                setCompletedSections({
                  personal: false,
                  income: false,
                  housing: false,
                  household: false,
                })
                setCurrentSection("personal")
                setValidationErrors({})
              }}
              className="flex-1"
            >
              다시 계산하기
            </Button>
          </div>
        </div>
      )}

      {/* Education Section */}
      {results && <EducationSection />}
    </main>
  )
}
