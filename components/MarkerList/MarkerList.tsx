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
    <ul className="flex flex-col">
      {markers?.map((marker) => (
        <li>
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
