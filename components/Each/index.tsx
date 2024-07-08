import { Children } from 'react'

const Each = <T,>({
  of,
  render,
}: {
  render: (item: T, index: number) => React.ReactNode
  of: T[]
}) => Children.toArray(of.map((item, index) => render(item, index)))

export default Each
