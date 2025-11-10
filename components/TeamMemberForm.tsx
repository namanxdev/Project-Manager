'use client'

import type { ChangeEvent, FormEvent } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export type TeamMemberFormState = {
  name: string
  role: string
  capacity: string
}

interface TeamMemberFormProps {
  mode: "create" | "edit"
  values: TeamMemberFormState
  onChange: (values: TeamMemberFormState) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onCancel?: () => void
  submitLabel?: string
  helperText?: string
}

export function TeamMemberForm({
  mode,
  values,
  onChange,
  onSubmit,
  onCancel,
  submitLabel,
  helperText,
}: TeamMemberFormProps) {
  const label = submitLabel ?? (mode === "edit" ? "Save changes" : "Add teammate")
  const showHelper = mode === "create" && helperText
  const showCancel = mode === "edit" && onCancel

  const updateField =
    (field: keyof TeamMemberFormState) => (event: ChangeEvent<HTMLInputElement>) => {
      onChange({ ...values, [field]: event.target.value })
    }

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="space-y-2">
        <Label htmlFor={`member-name-${mode}`}>Name</Label>
        <Input
          id={`member-name-${mode}`}
          value={values.name}
          onChange={updateField("name")}
          placeholder="Alex, Priya, Malik..."
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`member-role-${mode}`}>Role</Label>
        <Input
          id={`member-role-${mode}`}
          value={values.role}
          onChange={updateField("role")}
          placeholder="Project architect, BIM lead..."
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`member-capacity-${mode}`}>Weekly capacity (tasks)</Label>
        <Input
          id={`member-capacity-${mode}`}
          type="number"
          min={0}
          value={values.capacity}
          onChange={updateField("capacity")}
          placeholder="6"
        />
      </div>
      <div className="flex items-center justify-between gap-3">
        {showCancel ? (
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
          >
            Cancel
          </Button>
        ) : showHelper ? (
          <span className="text-xs text-muted-foreground">{helperText}</span>
        ) : (
          <span />
        )}
        <Button type="submit">{label}</Button>
      </div>
    </form>
  )
}


