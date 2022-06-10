import { FunctionComponent, useState } from 'react'
import Dialog from 'components/Dialog/Dialog'
import Button from 'components/Button/Button'
interface FormElement extends HTMLFormElement {
  mapId: HTMLInputElement
}

const MapForm: FunctionComponent = () => {
  const [open, setOpen] = useState<boolean>(false)
  const goToMap = (event: React.FormEvent<FormElement>) => {
    event.preventDefault()
    if (event.currentTarget.mapId.value) {
      window.location.href = `/map/${event.currentTarget.mapId.value}`
    } else {
      setOpen(true)
    }
  }
  return (
    <>
      <form onSubmit={goToMap}>
        <label className="mb-2 block" htmlFor="mapId">
          Type a map id from{' '}
          <a
            className="font-bold text-blue-700 hover:underline"
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
          <Button text="Ok" />
        </div>
      </form>
      <Dialog open={open} setOpen={setOpen} />
    </>
  )
}

export default MapForm
