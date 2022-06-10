import { FunctionComponent, useEffect, useRef } from 'react'
import Button from 'components/Button/Button'

type DialogProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const Dialog: FunctionComponent<DialogProps> = ({ open, setOpen }) => {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (open) {
      ref.current?.showModal()
    }
  }, [open])
  return (
    <dialog
      ref={ref}
      className="backdrop:bg-slate-400/50"
      onClose={() => setOpen(false)}
    >
      <p className="mb-4">Oops, you didn't type anything</p>
      <form method="dialog">
        <Button text="Ok" />
      </form>
    </dialog>
  )
}

export default Dialog
