'use client'

import { useEffect, useState } from 'react'
import {APIProvider, Map, AdvancedMarker, Pin, MapCameraChangedEvent } from '@vis.gl/react-google-maps';
import Image from 'next/image'
import blueDot from '../public/icons/blueBlinkingDot.svg'

import SearchBar from './components/SearchBar';
import LoginBtns from './components/LoginBtns';
import Header from './components/Header';
import QuickActionChips from './components/QuickActionChips';

interface Coords {
  lat: number,
  lng: number
}

export default function MapPage() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string

  const [mapCenter, setMapCenter] = useState<Coords>({ lat: 52.2297, lng: 21.0122 })
  const [userLocation, setUserLocation] = useState<Coords | null>(null)

  let watchId: number

  useEffect(() => {
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
          // success
          (position) => {
            const { latitude, longitude } = position.coords
            const newLocation: Coords = { lat: latitude, lng: longitude }

            setUserLocation(newLocation)
            setMapCenter(newLocation)
          },
          // error
          (error) => {
            console.log(error.message)
          },
          // options for watchPosition()
          {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 10000
          }
      )
    } else {
      // in case if browser does not support Geolocation API
      const browserSupportError = 'Twoja przeglądarka nie obsługuje Geolocation API.';
      console.error(browserSupportError);
      setMapCenter({ lat: 52.2297, lng: 21.0122 });
    }

    return () => navigator.geolocation.clearWatch(watchId)
  }, [])

  return (
    <div className='flex w-dvw h-dvh'>
      <div id='mapContainer' className='w-[70dvw] h-dvh overflow-y-hidden' >
        <APIProvider apiKey={apiKey}>
          <Map
            center={mapCenter}
            defaultZoom={17}
            disableDefaultUI={true}
            onCameraChanged={ (ev: MapCameraChangedEvent) => {
              console.log('camera changed: ', ev.detail.center, 'zoom: ', ev.detail.zoom)
            } }
            mapId='a0407ea725346dc3817df4f3'
          >
            <AdvancedMarker
              position={userLocation}
              title="UserLocation"
            >
              <Image 
                src={blueDot}
                width={48}
                height={48}
                alt="Blinking Blue Dot Marker"
              />
            </AdvancedMarker>
            <div className='absolute top-4 left-1/2 -translate-x-1/2 z-50 p-4'>
                <SearchBar />
                <QuickActionChips />
            </div>
            
          </Map>
        </APIProvider>
      </div>
      <div id='listings' className='w-[30dvw] h-dvh overflow-y-auto'>
          <div id='accountBtns' className='flex flex-col w-full items-end gap-6 p-8'>
            <LoginBtns />
            <Header />
          </div>
      </div>
    </div>
  )
}
