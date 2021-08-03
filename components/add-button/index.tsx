import cn from 'clsx'

function AddButton({
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
        'border-2',
        'font-bold',
        'py-1',
        'px-2',
        'rounded',
        'border-green-500',
        {
          [className]: Boolean(className),
        }
      )}
    >
      {children}
    </button>
  )
}

export default AddButton