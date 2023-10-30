import React from 'react';
import { Box, BodyLong } from '@navikt/ds-react';

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

interface Add {
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
  employer: {};
  engagementtype: string;
  extent: string;
  starttime: string;
  positioncount: string;
  sector: string;
}

const displaySingleAd = (add: Add) => {
  return (
    <Box background='surface-default' padding='6'>
      <BodyLong>{add.title}</BodyLong>
      <BodyLong>{add.description}</BodyLong>
      <BodyLong>{add.sourceurl}</BodyLong>
      <BodyLong>{add.source}</BodyLong>
      <BodyLong>{add.applicationUrl}</BodyLong>
      <BodyLong>{add.applicationDue}</BodyLong>
      <BodyLong>{add.jobtitle}</BodyLong>
      <BodyLong>{add.link}</BodyLong>
      <BodyLong>{add.engagementtype}</BodyLong>
      <BodyLong>{add.extent}</BodyLong>
      <BodyLong>{add.starttime}</BodyLong>
      <BodyLong>{add.positioncount}</BodyLong>
      <BodyLong>{add.sector}</BodyLong>
    </Box>
  );
};

const displayAds = (ads: Add[]) => {
  return ads.map((add) => displaySingleAd(add));
};
export default async function Page() {
  const data = await getData();
  console.log('data.totalElements: ' + data?.totalElements);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <p>Forsiden</p>
      <p>data totalelements: {data ? data.totalElements : 'no data'}</p>
      <p>data pageNumber: {data ? data.pageNumber : 'no data'}</p>
      <p>data pageSize: {data ? data.pageSize : 'no data'}</p>
      <p>data first: {data ? data.first : 'no data'}</p>
      <p>data last: {data ? data.last : 'no data'}</p>

      {data ? displayAds(data.content) : 'no data'}
    </main>
  );
}
