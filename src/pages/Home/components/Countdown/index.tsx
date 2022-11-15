import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect, useState } from 'react'
import { CyclesContext } from '../..'
import { CountdownContainer, Separator } from './styles'

export function Countdown() {
  const { activeCycle, activeCycleId, markCurrentCycleAsFinished } =
    useContext(CyclesContext)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0 // Convert minutes to seconds
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0 // Subtracting from the total seconds the ones that have already passed

  const minutesAmount = Math.floor(currentSeconds / 60) // Converting to minutes from the current second
  const secondsAmount = currentSeconds % 60 // Taking the rest of what wasn't for minutes

  // Converting to string and adding two position string
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const newDifferencInSeconds = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (newDifferencInSeconds >= totalSeconds) {
          markCurrentCycleAsFinished()
          setAmountSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setAmountSecondsPassed(newDifferencInSeconds)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, activeCycleId, markCurrentCycleAsFinished, totalSeconds])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}: ${seconds}`
    }
  }, [activeCycle, minutes, seconds])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
