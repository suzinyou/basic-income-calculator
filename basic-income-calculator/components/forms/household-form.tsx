"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function HouseholdForm({ formData, onFormChange }: any) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="household_size">함께 거주하는 가구원수</Label>
        <Input
          id="household_size"
          type="number"
          placeholder="본인 제외"
          value={formData.household_size}
          onChange={(e) => onFormChange({ household_size: Number.parseInt(e.target.value) || 0 })}
          className="max-w-xs"
        />
        <p className="text-xs text-muted-foreground">본인을 제외한 가구원의 수</p>
      </div>

      <div className="p-4 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground">
          추가 가구원 정보는 선택사항입니다. 더 정확한 계산을 원하시면 입력해주세요.
        </p>
      </div>
    </div>
  )
}
