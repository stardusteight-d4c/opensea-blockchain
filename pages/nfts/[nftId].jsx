import React, { useEffect, useState } from 'react'
import { useAddress } from '@thirdweb-dev/react'
import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import Head from 'next/head'
import { useRouter } from 'next/router'

import ReactLoading from 'react-loading'
import Header from '../../components/Header'
import NFTImage from '../../components/nft/NFTImage'
import GeneralDetails from '../../components/nft/GeneralDetails'
import ItemActivity from '../../components/nft/ItemActivity'
import Purchase from '../../components/nft/Purchase'

const style = {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
  container: `container p-6`,
  topContent: `flex flex-col md:flex-row mb-16`,
  nftImgContainer: `flex-1 md:mr-4`,
  detailsContainer: `flex-[2] md:ml-4`,
}

const Nft = () => {
  const address = useAddress()
  const router = useRouter()
  const [selectedNft, setSelectedNft] = useState(null)
  const [listings, setListings] = useState([])
  const [calledPush, setCalledPush] = useState(false)

  setInterval(
    () => (Boolean(address) ? setCalledPush(false) : setCalledPush(true)),
    6000
  )

  useEffect(() => {
    // console.log('calledPush in useEffect', calledPush)
    if (Boolean(address)) return
    setTimeout(() => {
      calledPush && router.push('/')
    }, 8000)
  }, [address, calledPush, router])

  useEffect(() => {
    const sdk = new ThirdwebSDK('rinkeby')
    const nftModule = sdk.getNFTCollection(
      '0xa08b847d5dC8833700C28200475Ac3c64cb0DFaE'
    )
    if (!router.query.nftId)
      return // Get only one NFT in the collection according to the route
    ;(async () => {
      const selectedNftItem = await nftModule.getTokenMetadata(
        router.query.nftId
      )
      setSelectedNft(selectedNftItem)
    })()
  }, [router.query.nftId])

  useEffect(() => {
    const sdk = new ThirdwebSDK('rinkeby')
    const marketPlaceModule = sdk.getMarketplace(
      '0x7600aB00c4524E11da066650Dd053040D0880EB0'
    )
    ;(async () => {
      // Get all NFT in marketplace (listings)
      const listings = await marketPlaceModule.getActiveListings()
      setListings(listings)
    })()
  }, [])

  // useEffect(() => {
  //   ;(async () => {
  //     const sdk = new ThirdwebSDK('rinkeby')
  //     const collection = sdk.getNFTCollection(
  //       '0xa08b847d5dC8833700C28200475Ac3c64cb0DFaE'
  //     )
  //     const marketplace = sdk.getMarketplace(
  //       '0x7600aB00c4524E11da066650Dd053040D0880EB0'
  //     )

  //     const nft = await collection.get(router.query.nftId)
  //     const listings = await marketplace.getActiveListings()
  //     setSelectedNft(nft)
  //     setListings(listings)
  //   })()
  // }, [router.query.nftId])

  return (
    <>
      <Head>
        <title>NFT / {selectedNft?.name}</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      {!address ? (
        <div className="h-[100vh] flex flex-col items-center justify-center scroll-smooth">
          <ReactLoading
            type={'spinningBubbles'}
            color={'#2081e2'}
            width={65}
            height={65}
          />
          <span className="text-base z-50 text-center text-[#cccccc] font-semibold mt-8">
            Checking connectivity with Metamask...
          </span>
        </div>
      ) : (
        <>
          <Header />
          <div className={style.wrapper}>
            <div className={style.container}>
              <div className={style.topContent}>
                <div className={style.nftImgContainer}>
                  <NFTImage selectedNft={selectedNft} />
                </div>
                <div className={style.detailsContainer}>
                  <GeneralDetails selectedNft={selectedNft} />
                  <Purchase
                    isListed={router.query.isListed}
                    selectedNft={selectedNft}
                    listings={listings}
                  />
                </div>
              </div>
              <ItemActivity />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Nft
