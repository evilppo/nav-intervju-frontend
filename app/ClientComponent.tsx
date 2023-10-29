'use client';

import {useState} from 'react'

async function ClientComponent() {

    const [res, setRes] = useState(null)

    const token: string = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwdWJsaWMudG9rZW4udjFAbmF2Lm5vIiwiYXVkIjoiZmVlZC1hcGktdjEiLCJpc3MiOiJuYXYubm8iLCJpYXQiOjE1NTc0NzM0MjJ9.jNGlLUF9HxoHo5JrQNMkweLj_91bgk97ZebLdfx3_UQ"

    const requestHeaders = new Headers({
        'Authorization': `Bearer ${token}`
    });


    const response = await fetch('https://arbeidsplassen.nav.no/public-feed/api/v1/ads', {headers: requestHeaders});
     const data = await response.json();
    setRes(data);


    return (
        <div>
            {res}
        </div>)
}


export default ClientComponent;
