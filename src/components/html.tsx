import h from 'helix-react/lib/html'

import * as renderHtml from 'react-render-html'

interface Props {
  children: string
}

export default function ({
  children,
}: Props) {
  return (
    <div className='html'>
      {renderHtml(children)}
    </div>
  )
}
