import React from "react";

async function getData() {
    const token: string = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwdWJsaWMudG9rZW4udjFAbmF2Lm5vIiwiYXVkIjoiZmVlZC1hcGktdjEiLCJpc3MiOiJuYXYubm8iLCJpYXQiOjE1NTc0NzM0MjJ9.jNGlLUF9HxoHo5JrQNMkweLj_91bgk97ZebLdfx3_UQ"
    const requestHeaders = new Headers({
        'Authorization': `Bearer ${token}`
    });
    const response = await fetch('https://arbeidsplassen.nav.no/public-feed/api/v1/ads?size=100', {headers: requestHeaders});
    return response.json();
}


interface OccupationCategoriesLevels {
    level1: string,
    level2: string
}


interface Add {
    uuid: string,
    published: string,
    expires: string,
    updated: string,
    workLocations: string[],
    "title": string
    "description": string,
    "sourceurl": string,
    "source": string,
    "applicationUrl": string,
    "applicationDue": string,
    "occupationCategories": OccupationCategoriesLevels[],
    "jobtitle": string,
    "link": string,
    "employer": {},
    "engagementtype": string,
    "extent": string,
    "starttime": string,
    "positioncount": string,
    "sector": string
}

const displaySingleAd = (add: Add) => {
    return (
        <div>
            <p>{add.title}</p>
            <p>{add.description}</p>
            <p>{add.sourceurl}</p>
            <p>{add.source}</p>
            <p>{add.applicationUrl}</p>
            <p>{add.applicationDue}</p>
            <p>{add.jobtitle}</p>
            <p>{add.link}</p>
            <p>{add.engagementtype}</p>
            <p>{add.extent}</p>
            <p>{add.starttime}</p>
            <p>{add.positioncount}</p>
            <p>{add.sector}</p>
        </div>
    )
}


const displayAds = (ads: Add[]) => {
    return ads.map(add => displaySingleAd(add))
}
export default async function Page() {

    const data = await getData()
    console.log("data.totalElements: " + data?.totalElements)

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">

            <p>Forsiden</p>
            <p>data totalelements: {data ? data.totalElements : "no data"}</p>
            <p>data pageNumber: {data ? data.pageNumber : "no data"}</p>
            <p>data pageSize: {data ? data.pageSize : "no data"}</p>
            <p>data first: {data ? data.first : "no data"}</p>
            <p>data last: {data ? data.last : "no data"}</p>

            {data ? displayAds(data.content) : "no data"}
        </main>
    )
}
