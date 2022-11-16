import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { CyclesContext } from '../../../../contexts/CyclesContext'
import { FormContainer, MinutesAmountInput, TaskInput } from './styles'

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        {...register('task')}
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycle}
      />

      <datalist id="task-suggestions">
        <option value="Projeto 01" />
        <option value="Projeto 02" />
        <option value="Projeto 03" />
        <option value="Projeto 04" />
        <option value="Projeto 05" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        {...register('minutesAmount', { valueAsNumber: true })}
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        disabled={!!activeCycle}
      />

      <span>minutos</span>
    </FormContainer>
  )
}
