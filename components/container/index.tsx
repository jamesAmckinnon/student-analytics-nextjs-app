function Container({ className = '', children }) {
  return <div className={'container ' + className}>{children}</div>
}

export default Container
