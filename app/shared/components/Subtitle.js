
function Subtitle({ styleClass, children }) {
  return (
    <div className={`text-xl font-semibold cursor-default pb-4 md:pb-0 ${styleClass}`}>{children}</div>
  )
}

export default Subtitle

