import React from 'react';
import {Heading, VStack} from '@navikt/ds-react';
import Divider from '@navikt/ds-react/esm/dropdown/Menu/Divider';
import DOMPurify from 'isomorphic-dompurify';

async function getData() {
  const token: string =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwdWJsaWMudG9rZW4udjFAbmF2Lm5vIiwiYXVkIjoiZmVlZC1hcGktdjEiLCJpc3MiOiJuYXYubm8iLCJpYXQiOjE1NTc0NzM0MjJ9.jNGlLUF9HxoHo5JrQNMkweLj_91bgk97ZebLdfx3_UQ';
  const requestHeaders = new Headers({
    Authorization: `Bearer ${token}`,
  });
  const response = await fetch(
    'https://arbeidsplassen.nav.no/public-feed/api/v1/ads?size=100',
    { headers: requestHeaders }
  );
  return response.json();
}

interface OccupationCategory {
  level1: string;
  level2: string;
}

interface OccupationCategories {
  occupationCategories: OccupationCategory[];
}

interface Employer {
  name: string;
  orgnr: string;
  description: string;
  homepage: string;
}

interface Ad {
  uuid: string;
  published: string;
  expires: string;
  updated: string;
  workLocations: string[];
  title: string;
  description: string;
  sourceurl: string;
  source: string;
  applicationUrl: string;
  applicationDue: string;
  occupationCategories: OccupationCategories;
  jobtitle: string;
  link: string;
  employer: Employer;
  engagementtype: string;
  extent: string;
  starttime: string;
  positioncount: string;
  sector: string;
}

const displaySingleAd = (ad: Ad) => {
  return (
    <VStack gap='4'>
      <Heading size='large' level='1' style={{ fontSize: 'x-large' }}>
        Stillingstittel: {ad.title}
      </Heading>
      <div>
        <Heading size='large' style={{ fontSize: 'x-large' }}>
          Arbeidsgiver: {ad.employer.name}
        </Heading>
      </div>
      <div>
        <Heading size='large' style={{ fontSize: 'x-large', margin: '1rem 0' }}>
          Beskrivelse:
        </Heading>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(ad.description),
          }}
        />
      </div>
      <Divider style={{ margin: '2rem 0' }} />
    </VStack>
  );
};
export default async function Page() {
  const data = await getData();

  return (
    <main className='flex flex-col items-center justify-between p-24'>
      <Heading
        size='large'
        style={{ fontSize: 'xxx-large', marginBottom: '2rem' }}
      >
        Stillingsannonser
      </Heading>
      {data
        ? data.content.map((ad: Ad) => displaySingleAd(ad))
        : 'Ingen annonser funnet'}
      <Divider style={{ margin: '2rem 0' }} />
    </main>
  );
}
