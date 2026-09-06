import { useSearchParams } from 'react-router-dom'
import type { ReportFilterValue } from '@/features/report-filter'
import {
  reportsFiltersToSearchParams,
  searchParamsToReports,
} from './reportsParams'

export function useReportsFilters() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { filters, queryParams } = searchParamsToReports(searchParams)

  function setFilters(next: ReportFilterValue) {
    setSearchParams(reportsFiltersToSearchParams(next, searchParams), {
      replace: true,
    })
  }

  return {
    filters,
    queryParams,
    setFilters,
  }
}
