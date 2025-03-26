type Props = {
  error?: string
}

export function DisplayError(props: Props) {
  const {error} = props
  if(error) {
    return <>
      <output
        className="flex items-center absolute pt-1.5 pl-2 text-sm text-red-800 rounded-lg  dark:text-red-400"
        role="alert">
        {error}
      </output>
    </>
  }
}