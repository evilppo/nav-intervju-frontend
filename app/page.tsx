import React from "react";
import clientComponent from "./ClientComponent";
import ClientComponent from "./ClientComponent";
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

            <ClientComponent/>
        </main>
    )
}
