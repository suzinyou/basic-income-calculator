"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const currencyFields = [
  { key: "income_wage", label: "근로소득" },
  { key: "income_biz", label: "사업소득" },
  { key: "income_assets", label: "재산소득" },
  { key: "income_insurance", label: "산재 및 고용보험 급여" },
  { key: "income_public_pension", label: "공적연금 소득" },
  { key: "tax_credit_earned_income", label: "근로장려금" },
  { key: "tax_credit_child", label: "자녀장려금" },
  { key: "allowance_child_parental", label: "아동양육수당" },
  { key: "income_capital_gains", label: "양도소득" },
  { key: "income_others", label: "기타소득" },
]

export default function IncomeForm({ formData, onFormChange }: any) {
  const getOkAndManValues = (wons: number) => {
    const ok = Math.floor(wons / 100000000)
    const man = Math.floor((wons % 100000000) / 10000)
    return { ok, man }
  }

  const convertToWons = (okStr: string, manStr: string) => {
    const ok = Number.parseInt(okStr) || 0
    const man = Number.parseInt(manStr) || 0
    return ok * 100000000 + man * 10000
  }

  const handleCurrencyChange = (key: string, okValue: string, manValue: string) => {
    const totalWons = convertToWons(okValue, manValue)
    onFormChange({ [key]: totalWons })
  }

  return (
    <div className="space-y-6">
      {currencyFields.map((field) => {
        const { ok, man } = getOkAndManValues(formData[field.key] || 0)

        return (
          <div key={field.key} className="space-y-2">
            <Label htmlFor={field.key}>{field.label}</Label>
            <div className="flex gap-2 max-w-md items-center">
              <div className="flex-1">
                <Input
                  id={`${field.key}_ok`}
                  type="number"
                  placeholder="0"
                  value={ok || ""}
                  onChange={(e) => handleCurrencyChange(field.key, e.target.value, String(man))}
                />
              </div>
              <div className="text-sm text-muted-foreground font-medium">억</div>
              <div className="flex-1">
                <Input
                  id={`${field.key}_man`}
                  type="number"
                  placeholder="0"
                  value={man || ""}
                  onChange={(e) => handleCurrencyChange(field.key, String(ok), e.target.value)}
                />
              </div>
              <div className="text-sm text-muted-foreground font-medium">만원</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
