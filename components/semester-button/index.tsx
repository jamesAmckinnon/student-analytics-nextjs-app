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
        'bg-customGreen',
        'text-black',
        'p-2',
        'rounded',
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
