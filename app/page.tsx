import {GetServerSideProps} from "next";
export async function getServerSideProps() {
    // Fetch data from an API, a database, or any other source.
    // For example, fetching a list of items:
    const token: string = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwdWJsaWMudG9rZW4udjFAbmF2Lm5vIiwiYXVkIjoiZmVlZC1hcGktdjEiLCJpc3MiOiJuYXYubm8iLCJpYXQiOjE1NTc0NzM0MjJ9.jNGlLUF9HxoHo5JrQNMkweLj_91bgk97ZebLdfx3_UQ"

    const requestHeaders = new Headers({
        'Authorization': `Bearer ${token}`
    });

    const response = await fetch('https://arbeidsplassen.nav.no/public-feed/api/v1/ads', {headers: requestHeaders});
    const data = await response.json();

    // Return the data as props to your component.
    return {
        props: {
            items: data,
        },
    };
}


export default function Home(props: any) {


    console.log(props.items)

    const renderItems = () => {
        if (props.items) {
            return props.items.map((item: any) => {
                return (
                    <div key={item.id}>
                        <h1>{item.data}</h1>
                        <p>{item.text}</p>
                    </div>
                )
            })
        } else {
            return <div>no items</div>
        }
    }
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1>HELLO WORLD</h1>
            {renderItems()}
        </main>
    )
}
