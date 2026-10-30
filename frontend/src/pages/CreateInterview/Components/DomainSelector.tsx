import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Target } from 'lucide-react'
import type { Domain } from '@/helpers/InterviewData'
import { cn } from '@/lib/utils'

interface Props {
  domains: Domain[]
  selectedDomain: string
  onSelect: (domainId: string) => void
}

const DomainSelector: React.FC<Props> = ({ domains, selectedDomain, onSelect }) => (
  <Card className={cn('card-elevated', 'shadow-lg border-0')}>
    <CardHeader className="bg-slate-50 border-b border-slate-200">
      <CardTitle className="flex items-center gap-2 text-slate-900">
        <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
          <Target className="w-5 h-5" />
        </div>
        Select Domain
      </CardTitle>
    </CardHeader>
    <CardContent className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {domains.map(domain => (
          <button
            key={domain.id}
            type="button"
            onClick={() => onSelect(domain.id)}
            className={cn(
              'p-4 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md border-2',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2',
              selectedDomain === domain.id
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            )}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{domain.icon}</span>
              <span className="font-medium text-slate-900">{domain.name}</span>
            </div>
            {selectedDomain === domain.id && (
              <div className="mt-2 flex items-center gap-1 text-sm text-blue-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Selected
              </div>
            )}
          </button>
        ))}
      </div>
    </CardContent>
  </Card>
)

export default DomainSelector
