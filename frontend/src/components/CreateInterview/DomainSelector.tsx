import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Target } from 'lucide-react'
import type { Domain } from '@/helpers/InterviewData'

interface Props {
  domains: Domain[]
  selectedDomain: string
  onSelect: (domainId: string) => void
}

const DomainSelector: React.FC<Props> = ({ domains, selectedDomain, onSelect }) => (
  <Card className="shadow-lg border-0">
    <CardHeader className="bg-gradient-to-r text-white">
      <CardTitle className="flex items-center gap-2">
        <Target className="w-5 h-5" />
        Select Domain
      </CardTitle>
    </CardHeader>
    <CardContent className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {domains.map(domain => (
          <div
            key={domain.id}
            onClick={() => onSelect(domain.id)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedDomain === domain.id
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{domain.icon}</span>
              <span className="font-medium text-gray-400">{domain.name}</span>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)

export default DomainSelector
