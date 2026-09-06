import type { HTMLAttributes, ReactNode, TdHTMLAttributes, ThHTMLAttributes } from 'react'
import { cn } from '@/shared/lib'

export function Table({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-border">
      <table
        className={cn('w-full border-collapse text-left text-body', className)}
        {...props}
      >
        {children}
      </table>
    </div>
  )
}

export function THead({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead className={cn('bg-surface-secondary', className)} {...props}>
      {children}
    </thead>
  )
}

export function TBody({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody className={cn('bg-surface', className)} {...props}>
      {children}
    </tbody>
  )
}

export function TR({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr className={cn('border-b border-border last:border-b-0', className)} {...props}>
      {children}
    </tr>
  )
}

export function TH({
  className,
  children,
  ...props
}: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        'px-4 py-3 text-caption font-medium text-text-secondary',
        className,
      )}
      {...props}
    >
      {children}
    </th>
  )
}

export function TD({
  className,
  children,
  ...props
}: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={cn('px-4 py-3 text-text-primary', className)} {...props}>
      {children}
    </td>
  )
}

export interface TableEmptyProps {
  children: ReactNode
  colSpan: number
}

export function TableEmpty({ children, colSpan }: TableEmptyProps) {
  return (
    <TR>
      <TD colSpan={colSpan} className="py-10 text-center text-text-secondary">
        {children}
      </TD>
    </TR>
  )
}
