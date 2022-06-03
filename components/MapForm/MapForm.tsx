import { FunctionComponent } from 'react'

interface FormElement extends HTMLFormElement {
  mapId: HTMLInputElement
}

const MapForm: FunctionComponent = () => {
  const goToMap = (event: React.FormEvent<FormElement>) => {
    event.preventDefault()
    if (event.currentTarget.mapId.value) {
      window.location.href = `/map/${event.currentTarget.mapId.value}`
    }
  }
  return (
    <form onSubmit={goToMap}>
      <label className="mb-2 block" htmlFor="mapId">
        Type a map id from{' '}
        <a
          className="font-bold text-blue-500 hover:underline"
          href="https://cartes.io/"
          target="_blank"
        >
          Cartes.io
        </a>
      </label>
      <div className="flex flex-nowrap justify-center gap-2">
        <input
          type="string"
          name="mapId"
          id="mapId"
          className="overflow-hidden border-2 border-gray-500 p-2 transition-all hover:bg-blue-50 focus:border-black focus:bg-blue-100"
        />
        <button
          className="border-2 border-gray-500 bg-white px-4 py-2 transition-all hover:border-black hover:bg-blue-50 focus:border-black focus:bg-blue-100"
          type="submit"
        >
          Ok
        </button>
      </div>
    </form>
  )
}

export default MapForm
