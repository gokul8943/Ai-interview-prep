import Link from 'next/link'
import React, { ReactNode } from 'react'

import Image from 'next/image'

const Rootlayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <nav>
        <Link href='/' className='flex item-center gap-2'>
          <Image src="/logo.svg" alt="logo" width={38} height={32} />
          <h2 className='text-primary-100'>Prepwise</h2>
        </Link>
      </nav>
      {children}
    </div>
  )
}

export default Rootlayout
