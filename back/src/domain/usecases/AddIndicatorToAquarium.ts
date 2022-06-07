import { IndicatorRepository } from '@/domain/contracts/repository'
import { Indicator } from '../../domain/entity'

type setup = (indicatorRepository: IndicatorRepository) => AddIndicatorToAquariumUseCase
export type AddIndicatorToAquariumUseCase = (input: IndicatorRepository.Input) => Promise<void>

export const setupAddIndicatorToAquarium: setup = (indicatorRepository) => async input => {
  const dataIndicator = await indicatorRepository.get(input.indicatorId)
  const indicator = new Indicator(
    input.indicatorId,
    input.aquariumId,
    dataIndicator.name,
    dataIndicator.unit,
    dataIndicator.description,
    dataIndicator.currentValue,
    dataIndicator.acceptedValue,
    dataIndicator.minValue,
    dataIndicator.maxValue
  )
  await indicatorRepository.save(indicator)
}
