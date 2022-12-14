import React, { useEffect, useState } from 'react'
import { useAddress, useMarketplace } from '@thirdweb-dev/react'

import { HiTag } from 'react-icons/hi'
import { IoMdWallet } from 'react-icons/io'
import toast, { Toaster } from 'react-hot-toast'

const style = {
  button: `md:!mr-8 flex items-center py-2 px-4 md:px-12 rounded-lg cursor-pointer`,
  buttonIcon: `text-xl`,
  buttonText: `md:ml-2 mdtext-lg text-base font-semibold`,
}

const Purchase = ({ isListed, selectedNft, listings }) => {
  const [selectedMarketNft, setSelectedMarketNft] = useState()
  const [enableButton, setEnableButton] = useState()
  const address = useAddress()
  const marketplaceContract = useMarketplace(
    '0x7600aB00c4524E11da066650Dd053040D0880EB0'
  )

  useEffect(() => {
    if (!listings || isListed === 'false') return
    ;(async () => {
      setSelectedMarketNft(
        listings.find(
          (marketNft) =>
            marketNft.asset?.id.toNumber() === selectedNft.id.toNumber()
        )
      )
    })()
  }, [selectedNft, isListed, listings])

  // console.log('selectedMarketNft', selectedMarketNft)
  // console.log('listings', listings)

  useEffect(() => {
    if (!selectedMarketNft || !selectedNft) return

    setEnableButton(true)
  }, [address, selectedMarketNft, selectedNft])

  const confirmPurchase = (toastHandler = toast) => {
    toastHandler.success(`Purchase successful!`, {
      style: {
        background: '#04111d',
        color: '#fff',
      },
    })
  }

  const buyItem = async (
    listingId = selectedMarketNft.id,
    quantityDesired = 1,
    module = marketplaceContract
  ) => {
    if (!address) return
    // Error: This action requires a connected wallet to sign a transaction. Pass a valid signer to the SDK. -> Resolved
    // If the application does not receive the wallet address, the action is not performed, later on, block the page view if this happens
    console.log(address)
    await module.buyoutListing(listingId, quantityDesired)
    confirmPurchase()
  }

  return (
    <div className="flex space-x-4 md:space-x-0 h-20 w-full items-center rounded-lg bg-[#303339] px-12">
      <Toaster position="top-center" reverseOrder={false} />
      {isListed === 'true' ? (
        <>
          <button
            onClick={() => {
              enableButton ? buyItem(selectedMarketNft.id, 1) : null
            }}
            className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}
          >
            <IoMdWallet className={style.buttonIcon} />
            <div className={style.buttonText}>Buy Now</div>
          </button>
          <div
            className={`${style.button} border border-[#151c22]  bg-[#363840] hover:bg-[#4c505c]`}
          >
            <HiTag className={style.buttonIcon} />
            <div className={style.buttonText}>Make Offer</div>
          </div>
        </>
      ) : (
        <div className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}>
          <IoMdWallet className={style.buttonIcon} />
          <div className={style.buttonText}>List Item</div>
        </div>
      )}
    </div>
  )
}

export default Purchase
