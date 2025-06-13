'use client'

import { useEffect, useState } from 'react'
import {APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import Image from 'next/image'
import blueDot from '../public/icons/blueBlinkingDot.svg'

import SearchBar from './components/SearchBar';

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
    <>
      <APIProvider apiKey={apiKey}>
          <Map
            style={{width: '100dvw', height: '100dvh'}}
            center={mapCenter}
            defaultZoom={17}
            disableDefaultUI={true}
            mapId='3b51350f1553c5e4b1f29045'
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

            <SearchBar />
          </Map>
      </APIProvider>
    </>
  )
}
