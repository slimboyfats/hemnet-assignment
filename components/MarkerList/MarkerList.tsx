import { FunctionComponent } from 'react'
import { Markers } from 'types'

type MarkerListProps = {
  markers: Markers | undefined
  setSelectedMarker: React.Dispatch<React.SetStateAction<number | undefined>>
  selectedMarker: number | undefined
}

const MarkerList: FunctionComponent<MarkerListProps> = ({
  markers,
  selectedMarker,
  setSelectedMarker,
}) => {
  const onClickHandler = (id: number) => {
    setSelectedMarker(id)
  }
  return (
    <ul className="flex max-h-[25vh] flex-col overflow-scroll md:max-h-full md:overflow-auto">
      {markers?.map((marker) => (
        <li key={marker.id}>
          <button
            className={` w-full bg-green-200 px-4 py-2 transition-all hover:bg-green-100  focus:bg-green-500 ${
              selectedMarker === marker.id && 'bg-green-500'
            }`}
            onClick={() => onClickHandler(marker.id)}
          >
            {marker.description}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default MarkerList
