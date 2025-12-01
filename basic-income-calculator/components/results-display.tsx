"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    minimumFractionDigits: 0,
  }).format(value)
}

export default function ResultsDisplay({ results, formData }: any) {
  const netBenefit =
    results.benefits.bi_common_wealth_total +
    results.benefits.bi_negative_income_tax +
    results.benefits.universal_eitc -
    results.contributions.basic_income_tax -
    results.contributions.land_owning_tax

  return (
    <div className="space-y-6">
      {/* Net Benefit Card */}
      <Card className="border-2 border-primary bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle className="text-primary">예상 순수혜액</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-primary">
            {netBenefit > 0 ? "+" : ""}
            {formatCurrency(netBenefit)}
          </div>
          <p className="text-sm text-muted-foreground mt-2">연간 예상 금액 (만 20세 이상 기준)</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Benefits */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge>수혜</Badge>
              기본소득 수혜액
            </CardTitle>
            <CardDescription>예상 받을 금액</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">공유부 기본소득</span>
                <span className="font-semibold">{formatCurrency(results.benefits.bi_common_wealth_total)}</span>
              </div>
              <div className="pl-4 space-y-2 border-l border-muted">
                <div className="flex justify-between text-sm">
                  <span>보편적 기본소득</span>
                  <span>{formatCurrency(results.benefits.bi_universal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>토지배당</span>
                  <span>{formatCurrency(results.benefits.bi_land_dividend)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>탄소배당</span>
                  <span>{formatCurrency(results.benefits.bi_carbon_dividend)}</span>
                </div>
                {results.benefits.bi_rural > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>농어촌 기본소득</span>
                    <span>{formatCurrency(results.benefits.bi_rural)}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">마이너스 소득세</span>
                <span className="font-semibold">{formatCurrency(results.benefits.bi_negative_income_tax)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">보편적 근로장려금</span>
                <span className="font-semibold">{formatCurrency(results.benefits.universal_eitc)}</span>
              </div>

              <div className="pt-3 border-t border-border">
                <div className="flex justify-between font-bold text-lg">
                  <span>총 수혜액</span>
                  <span className="text-accent">
                    {formatCurrency(
                      results.benefits.bi_common_wealth_total +
                        results.benefits.bi_negative_income_tax +
                        results.benefits.universal_eitc,
                    )}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contributions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="outline">기여</Badge>
              기본소득 재원
            </CardTitle>
            <CardDescription>예상 납부할 금액</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">기본소득세</span>
                <span className="font-semibold">{formatCurrency(results.contributions.basic_income_tax)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">토지보유세</span>
                <span className="font-semibold">{formatCurrency(results.contributions.land_owning_tax)}</span>
              </div>

              <div className="pt-3 border-t border-border">
                <div className="flex justify-between font-bold text-lg">
                  <span>총 기여액</span>
                  <span className="text-destructive">
                    {formatCurrency(results.contributions.basic_income_tax + results.contributions.land_owning_tax)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg">계산 요약</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">나이</p>
              <p className="font-semibold">{formData.age}세</p>
            </div>
            <div>
              <p className="text-muted-foreground">납세 지위</p>
              <p className="font-semibold text-xs">{formData.tax_category}</p>
            </div>
            <div>
              <p className="text-muted-foreground">주택 형태</p>
              <p className="font-semibold text-xs">{formData.housing_type || "-"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">가구원 수</p>
              <p className="font-semibold">{formData.household_size}명</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
