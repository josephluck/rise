import h from 'helix-react/lib/html'

export type Style = 'primary' | 'secondary'
export type Size = 'small' | 'medium' | 'large'

export interface Tab {
  name: string
  label: string
  href: string
}

export interface Props {
  activeTab: string
  tabs: Tab[]
}

export default function ({
  tabs,
  activeTab,
}: Props) {
  return (
    <ul>
      {tabs.map((tab, index) => {
        return (
          <li
            key={index}
            className='d-ib'
          >
            <a
              className={`
                pv-3 bb bw-medium fw-500 fc-grey-800 d-ib tt-uppercase fs-small ff-link
                ${index !== 0 ? 'ml-4' : ''}
                ${tab.name === activeTab ? 'bc-primary' : 'bc-white'}
              `}
              href={tab.href}
            >
              {tab.label}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
