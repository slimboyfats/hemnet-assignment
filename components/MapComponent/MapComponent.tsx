import { FunctionComponent, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { type Markers } from 'types'

import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'

type MapComponentProps = {
  markers: Markers | undefined
  selectedMarker: number | undefined
}

const MyFlyToComponent: FunctionComponent<MapComponentProps> = ({
  markers,
  selectedMarker,
}) => {
  const map = useMap()

  useEffect(() => {
    if (markers && selectedMarker) {
      const marker = markers.find((m) => m.id === selectedMarker)
      if (marker) {
        map.flyTo(marker.location.coordinates, 14)
      }
    }
  }, [markers, selectedMarker])

  return null
}

const MapComponent: FunctionComponent<MapComponentProps> = ({
  markers,
  selectedMarker,
}) => {
  return (
    <div className="flex flex-auto">
      <MapContainer
        center={markers?.[0]?.location.coordinates}
        zoom={14}
        scrollWheelZoom={false}
        style={{ flex: '1 1 auto' }}
      >
        <MyFlyToComponent markers={markers} selectedMarker={selectedMarker} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers?.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.location.coordinates}
            draggable={true}
          >
            <Popup>{marker.description}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default MapComponent
