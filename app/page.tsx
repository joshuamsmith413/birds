import React from 'react';
import styles from './page.module.css';

type TBirdData = {
  speciesCode: string;
  comName: string;
  sciName: string;
  locId: string;
  locName: string;
  obsDt: string;
  howMany: number;
  lat: number;
  lng: number;
  obsValid: boolean;
  obsReviewed: boolean;
  locationPrivate: boolean;
  subId: string;
  subnational2Code: string;
  subnational2Name: string;
  subnational1Code: string;
  subnational1Name: string;
  countryCode: string;
  countryName: string;
  userDisplayName: string,
  obsId: string,
  checklistId: string,
  presenceNoted: boolean,
  hasComments: boolean,
  lastName: string,
  firstName: string,
  hasRichMedia: boolean
};

const HTTPS_HEADERS = {
  'X-eBirdApiToken': `${process.env.BIRD_KEY}`,
};

const BASE_URL = 'https://api.ebird.org/v2';
const HEADERS = new Headers(HTTPS_HEADERS);

async function getSpeciesByRegion(regionCode = 'US-NY-053') {
  const res = await fetch(`${BASE_URL}/product/spplist/${regionCode}`, {
    method: 'GET',
    headers: HEADERS,
    redirect: 'follow'
  })
  return res.json();
}

async function getNotableSitingByRegion(regionCode = 'US-NY-053') {
  const res = await fetch(`${BASE_URL}/data/obs/${regionCode}/recent/notable?detail=full`, {
    method: 'GET',
    headers: HEADERS,
    redirect: 'follow'
  });
  return res.json();
}

export default function Home() {
  const fetchSitingsData = async () => {
    const result: TBirdData[] = await getNotableSitingByRegion();
    // console.log('result', result);
    return result;
  };

  const fetchSpeciesByRegion = async () => {
    const result = await getSpeciesByRegion();
    console.log('result',result)
    return result
  }

  const showSpecies = async () => {
    const birdData: TBirdData[] = await fetchSitingsData();
    return birdData.map((data, index) => (
        <div className={styles.card} key={index}>
          <h4>{data.comName}</h4>
          <p className={styles.description}>{data.subnational2Name}, {data.subnational1Name}</p>
        </div>
      ));
    }

  return (
    <main className={`${styles.grid} ${styles.main}`}>
      <div>
        <h3>Recent Notable Sitings</h3>
        {showSpecies()}
      </div>
      <div>
        <h3>Species List For a Region</h3>
        {fetchSpeciesByRegion()}
      </div>
    </main>
  );
}
