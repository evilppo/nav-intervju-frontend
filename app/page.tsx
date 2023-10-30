import React from "react";

async function getData() {
    const token: string = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwdWJsaWMudG9rZW4udjFAbmF2Lm5vIiwiYXVkIjoiZmVlZC1hcGktdjEiLCJpc3MiOiJuYXYubm8iLCJpYXQiOjE1NTc0NzM0MjJ9.jNGlLUF9HxoHo5JrQNMkweLj_91bgk97ZebLdfx3_UQ"
    const requestHeaders = new Headers({
        'Authorization': `Bearer ${token}`
    });
    const response = await fetch('https://arbeidsplassen.nav.no/public-feed/api/v1/ads?size=100', {headers: requestHeaders});
    return response.json();
}
export default async function Page() {

    const data = await getData()
    console.log("data.totalElements: " + data?.totalElements)

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">

            <p>Forsiden</p>
            <p>data totalelements: {data? data.totalElements :"no data"}</p>
        </main>
    )
}
