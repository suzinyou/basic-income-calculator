"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function HousingForm({ formData, onFormChange, validationErrors = {} }: any) {
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

  const CurrencyInput = ({ id, fieldKey, currentValue, label, hasError, errorMessage, required = false }: any) => {
    const { ok, man } = getOkAndManValues(currentValue || 0)

    return (
      <div className="space-y-2">
        <Label htmlFor={id}>
          {label} {required && "*"}
        </Label>
        <div className="flex gap-2 max-w-md items-center">
          <div className="flex-1">
            <Input
              id={`${id}_ok`}
              type="number"
              placeholder="0"
              value={ok || ""}
              onChange={(e) =>
                onFormChange({
                  [fieldKey]: convertToWons(e.target.value, String(man)),
                })
              }
              className={hasError ? "border-destructive" : ""}
            />
          </div>
          <div className="text-sm text-muted-foreground font-medium">억</div>
          <div className="flex-1">
            <Input
              id={`${id}_man`}
              type="number"
              placeholder="0"
              value={man || ""}
              onChange={(e) =>
                onFormChange({
                  [fieldKey]: convertToWons(String(ok), e.target.value),
                })
              }
              className={hasError ? "border-destructive" : ""}
            />
          </div>
          <div className="text-sm text-muted-foreground font-medium">만원</div>
        </div>
        {hasError && <p className="text-xs text-destructive">{errorMessage}</p>}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="housing_type">주택 입주 형태 *</Label>
        <Select value={formData.housing_type} onValueChange={(value) => onFormChange({ housing_type: value })}>
          <SelectTrigger className={`max-w-xs ${validationErrors.housing_type ? "border-destructive" : ""}`}>
            <SelectValue placeholder="선택해주세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="own">자가</SelectItem>
            <SelectItem value="jeonse">전세</SelectItem>
            <SelectItem value="rented_with_deposit">보증금 있는 월세</SelectItem>
            <SelectItem value="rented_without_deposit">월세</SelectItem>
            <SelectItem value="free">무상</SelectItem>
          </SelectContent>
        </Select>
        {validationErrors.housing_type && <p className="text-xs text-destructive">{validationErrors.housing_type}</p>}
      </div>

      {formData.housing_type === "own" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="single_or_multi">주택 유형 *</Label>
            <Select
              value={formData.single_or_multi}
              onValueChange={(value) => onFormChange({ single_or_multi: value })}
            >
              <SelectTrigger className={`max-w-xs ${validationErrors.single_or_multi ? "border-destructive" : ""}`}>
                <SelectValue placeholder="선택해주세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">단독주택</SelectItem>
                <SelectItem value="multi">공동주택</SelectItem>
              </SelectContent>
            </Select>
            {validationErrors.single_or_multi && (
              <p className="text-xs text-destructive">{validationErrors.single_or_multi}</p>
            )}
          </div>

          <CurrencyInput
            id="housing_market_price"
            fieldKey="housing_market_price"
            currentValue={formData.housing_market_price}
            label="주택 시장가격"
            hasError={!!validationErrors.housing_market_price}
            errorMessage={validationErrors.housing_market_price}
            required={true}
          />
          <p className="text-xs text-muted-foreground">시장가격과 공시가격 중 하나만 입력하면 됩니다</p>

          <CurrencyInput
            id="housing_published_price"
            fieldKey="housing_published_price"
            currentValue={formData.housing_published_price}
            label="주택 공시가격"
          />
        </>
      )}

      {formData.housing_type === "jeonse" && (
        <CurrencyInput
          id="housing_deposit"
          fieldKey="housing_deposit"
          currentValue={formData.housing_deposit}
          label="주택 보증금"
          hasError={!!validationErrors.housing_deposit}
          errorMessage={validationErrors.housing_deposit}
          required={true}
        />
      )}

      {(formData.housing_type === "rented_with_deposit" || formData.housing_type === "rented_without_deposit") && (
        <>
          {formData.housing_type === "rented_with_deposit" && (
            <CurrencyInput
              id="housing_deposit"
              fieldKey="housing_deposit"
              currentValue={formData.housing_deposit}
              label="보증금"
              hasError={!!validationErrors.housing_deposit}
              errorMessage={validationErrors.housing_deposit}
              required={true}
            />
          )}
          <div className="space-y-2">
            <Label htmlFor="housing_rent">월세 (원) *</Label>
            <Input
              id="housing_rent"
              type="number"
              placeholder="월세"
              value={formData.housing_rent || ""}
              onChange={(e) => onFormChange({ housing_rent: Number.parseInt(e.target.value) || 0 })}
              className={`max-w-xs ${validationErrors.housing_rent ? "border-destructive" : ""}`}
            />
            {validationErrors.housing_rent && (
              <p className="text-xs text-destructive">{validationErrors.housing_rent}</p>
            )}
          </div>
        </>
      )}

      {formData.housing_type === "free" && (
        <>
          <CurrencyInput
            id="housing_market_price"
            fieldKey="housing_market_price"
            currentValue={formData.housing_market_price}
            label="주택 시장가격"
            hasError={!!validationErrors.housing_market_price}
            errorMessage={validationErrors.housing_market_price}
            required={true}
          />
          <p className="text-xs text-muted-foreground">시장가격과 공시가격 중 하나만 입력하면 됩니다</p>

          <CurrencyInput
            id="housing_published_price"
            fieldKey="housing_published_price"
            currentValue={formData.housing_published_price}
            label="주택 공시가격"
          />
        </>
      )}

      <div className="pt-4 border-t space-y-4">
        <p className="text-sm font-semibold">추가 부동산 소유 현황</p>

        {/* Own other house */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Checkbox
              id="own_other_house"
              checked={formData.own_other_house}
              onCheckedChange={(checked) => onFormChange({ own_other_house: checked })}
            />
            <Label htmlFor="own_other_house" className="font-normal">
              자가 외 본인 소유 주택 있음
            </Label>
          </div>

          {formData.own_other_house && (
            <div className="ml-6 space-y-3 pl-4 border-l-2 border-muted">
              <CurrencyInput
                id="other_house_market_price"
                fieldKey="other_house_market_price"
                currentValue={formData.other_house_market_price}
                label="시장가격"
                hasError={!!validationErrors.other_house_market_price}
                errorMessage={validationErrors.other_house_market_price}
                required={true}
              />

              <CurrencyInput
                id="other_house_published_price"
                fieldKey="other_house_published_price"
                currentValue={formData.other_house_published_price}
                label="공시가격"
              />
            </div>
          )}
        </div>

        {/* Own building */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Checkbox
              id="own_building"
              checked={formData.own_building}
              onCheckedChange={(checked) => onFormChange({ own_building: checked })}
            />
            <Label htmlFor="own_building" className="font-normal">
              본인 소유 건물 있음
            </Label>
          </div>

          {formData.own_building && (
            <div className="ml-6 space-y-3 pl-4 border-l-2 border-muted">
              <CurrencyInput
                id="building_land_market_price"
                fieldKey="building_land_market_price"
                currentValue={formData.building_land_market_price}
                label="부속토지 시장가격"
                hasError={!!validationErrors.building_land_market_price}
                errorMessage={validationErrors.building_land_market_price}
                required={true}
              />

              <CurrencyInput
                id="building_land_published_price"
                fieldKey="building_land_published_price"
                currentValue={formData.building_land_published_price}
                label="부속토지 공시지가"
              />
            </div>
          )}
        </div>

        {/* Own land */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Checkbox
              id="own_land"
              checked={formData.own_land}
              onCheckedChange={(checked) => onFormChange({ own_land: checked })}
            />
            <Label htmlFor="own_land" className="font-normal">
              본인 소유 토지 있음
            </Label>
          </div>

          {formData.own_land && (
            <div className="ml-6 space-y-3 pl-4 border-l-2 border-muted">
              <CurrencyInput
                id="land_market_price"
                fieldKey="land_market_price"
                currentValue={formData.land_market_price}
                label="시장가격"
                hasError={!!validationErrors.land_market_price}
                errorMessage={validationErrors.land_market_price}
                required={true}
              />

              <CurrencyInput
                id="land_published_price"
                fieldKey="land_published_price"
                currentValue={formData.land_published_price}
                label="공시지가"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
