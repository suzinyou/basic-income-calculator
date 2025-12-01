"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function PersonalInfoForm({ formData, onFormChange, validationErrors = {} }: any) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="age">나이 (만 기준) *</Label>
        <Input
          id="age"
          type="number"
          placeholder="예: 35"
          value={formData.age}
          onChange={(e) => onFormChange({ age: e.target.value })}
          className={`max-w-xs ${validationErrors.age ? "border-destructive" : ""}`}
        />
        {validationErrors.age && <p className="text-xs text-destructive">{validationErrors.age}</p>}
        <p className="text-xs text-muted-foreground">만 나이를 입력해주세요</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tax_category">납세 지위 *</Label>
        <Select value={formData.tax_category} onValueChange={(value) => onFormChange({ tax_category: value })}>
          <SelectTrigger className={`max-w-xs ${validationErrors.tax_category ? "border-destructive" : ""}`}>
            <SelectValue placeholder="선택해주세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="종합소득세">종합소득세 신고자</SelectItem>
            <SelectItem value="연말정산">연말정산자 (근로, 사업, 연금소득)</SelectItem>
            <SelectItem value="기타">종합소득 신고도 연말정산도 하지 않음</SelectItem>
          </SelectContent>
        </Select>
        {validationErrors.tax_category && <p className="text-xs text-destructive">{validationErrors.tax_category}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="n_basic_deductions">기본공제 인원</Label>
        <Input
          id="n_basic_deductions"
          type="number"
          placeholder="예: 2"
          value={formData.n_basic_deductions}
          onChange={(e) => onFormChange({ n_basic_deductions: e.target.value })}
          className="max-w-xs"
        />
        <p className="text-xs text-muted-foreground">본인과 연 소득금액 100만원 이하의 부양가족</p>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="rural"
          checked={formData.is_rural_resident}
          onCheckedChange={(checked) => onFormChange({ is_rural_resident: checked })}
        />
        <Label htmlFor="rural" className="font-normal">
          인구감소 농어촌지역 거주
        </Label>
      </div>
    </div>
  )
}
