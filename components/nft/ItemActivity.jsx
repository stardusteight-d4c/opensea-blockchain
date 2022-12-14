import React, { useState } from 'react'

import { dummyEvents } from '../../public/static/dummyEvents'
import { CgArrowsExchangeV } from 'react-icons/cg'
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import EventItem from './itemActivity/EventItem'

const style = {
  wrapper: `w-full rounded-xl bg-[#303339] overflow-hidden`,
  title: `bg-[#262b2f] px-6 py-4 flex items-center`,
  titleLeft: `flex-1 flex items-center text-xl font-bold`,
  titleIcon: `text-3xl mr-2`,
  titleRight: `text-xl`,
  filter: `flex items-center border border-[#151b22] mx-4 my-6 px-3 py-4 rounded-xl bg-[#363840]`,
  filterTitle: `flex-1`,
  tableHeader: `flex w-full bg-[#262b2f] border-y border-[#151b22] mt-8 px-4 py-1`,
  eventItem: `flex px-4`,
  ethLogo: `h-5 mr-2`,
  accent: `text-[#2081e2]`,
}

const ItemActivity = () => {
  const [toggle, setToggle] = useState(false)

  return (
    <div className={style.wrapper}>
      <div className={style.title} onClick={() => setToggle(!toggle)}>
        <div className={style.titleLeft}>
          <span className={style.titleIcon}>
            <CgArrowsExchangeV />
          </span>
          Item Activity
        </div>
        <div className={style.titleRight}>
          {toggle ? <AiOutlineUp /> : <AiOutlineDown />}
        </div>
      </div>
      {toggle && (
        <div>
          <div className={style.filter}>
            <div className={style.filterTitle}>Filter</div>
            <div>
              {' '}
              <AiOutlineDown />{' '}
            </div>
          </div>
          <div className={style.tableHeader}>
            <div className='flex-[2]'>Event</div>
            <div className='flex-[2]'>Price</div>
            <div className='flex-[3]'>From</div>
            <div className='flex-[3]'>To</div>
            <div className='hidden md:flex flex-[2]'>Date</div>
          </div>
          {dummyEvents.map((event, index) => (
            <EventItem key={index} event={event} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ItemActivity
