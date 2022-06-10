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
    <fieldset className="flex flex-col md:w-80">
      <legend className="text-md my-2 font-bold">Markers</legend>
      <div className="box-border flex max-h-[15vh] flex-col overflow-scroll md:max-h-full md:overflow-auto">
        {markers?.map((marker) => (
          <label
            key={marker.id}
            className={`${
              selectedMarker === marker.id && 'bg-green-500'
            } flex min-h-[2.5rem] w-full cursor-pointer items-baseline gap-1 border-x-0 border-b border-green-300 bg-green-200 px-4 py-2 transition-all hover:bg-green-100 focus:bg-green-500`}
          >
            <input
              type="radio"
              name="marker"
              id={marker.id.toString()}
              className=""
              onChange={() => onClickHandler(marker.id)}
              value={marker.id}
            />
            {marker.description ? marker.description : `Markerid: ${marker.id}`}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export default MarkerList
