import cn from 'clsx'

function SemesterButton({
  onClick = console.log,
  className = '',
  children = null,
  type = null,
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'bg-gray-400',
        'text-black',
        'px-2',
        'py-1',
        'rounded-md',
        'uppercase',
        'text-sm',
        'font-bold',

        {
          [className]: Boolean(className),
        }
      )}
    >
      {children}
    </button>
  )
}

export default SemesterButton
