"use client"
import { Button } from "@/components/ui/button"

export default function EducationSection() {
  return (
    <section className="bg-secondary text-secondary-foreground py-16 mt-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image Placeholder */}
          <div className="flex items-center justify-center bg-muted rounded-lg p-8">
            <div className="text-center">
              <div className="w-48 h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground text-lg">📚 정책 서적 이미지</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">기본소득 정책 이해하기</h2>
              <p className="text-lg text-secondary-foreground/80">
                새로운 기본소득 정책의 세부 내용과 이론적 배경에 대해 알아보세요
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="font-semibold">공유부 기본소득</h3>
                <p className="text-sm text-secondary-foreground/80">
                  사회의 공유 자산에서 나오는 배당을 모든 시민과 나눕니다
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="font-semibold">마이너스 소득세</h3>
                <p className="text-sm text-secondary-foreground/80">
                  일정 소득 이하 시민에게 직접 지원하는 보충 수당입니다
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="font-semibold">보편적 근로장려금</h3>
                <p className="text-sm text-secondary-foreground/80">근로 활동에 참여하는 모든 시민을 지원합니다</p>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => window.open("#", "_blank")}
            >
              📖 기본소득 정책 서적 구매하기
            </Button>

            <p className="text-xs text-secondary-foreground/70 text-center">
              더 자세한 정책 내용은 공식 정책 서적에서 확인하실 수 있습니다
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
