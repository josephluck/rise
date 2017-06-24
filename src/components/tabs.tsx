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
    <ul className='pos-relative'>
      {tabs.map((tab, index) => {
        return (
          <li
            key={index}
            className='d-ib'
          >
            <a
              className={`
                fw-500 d-ib tt-uppercase fs-small ff-link transition ph-2 pv-3
                ${tab.name === activeTab ? 'fc-grey-900' : 'fc-grey-400'}
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
