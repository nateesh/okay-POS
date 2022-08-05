<script>
    import { ApolloClient } from "@apollo/client/core/ApolloClient.js";
    import { InMemoryCache } from "@apollo/client/cache/inmemory/inMemoryCache.js";
    import { setClient } from "svelte-apollo";
    import Nav from "./lib/Nav.svelte";
    import Products from "./lib/Products.svelte";
    import Sidebar from "./lib/Sidebar.svelte";
    import Footer from "./lib/Footer.svelte";

    const client = new ApolloClient({
        uri: "https://guided-seahorse-31.hasura.app/v1/graphql",
        headers: {
            "content-type": "application/json",
            "x-hasura-public": "public"
        },
        cache: new InMemoryCache(),
    });

    setClient(client);

    export function refetchProducts() {}

    let products;
    let selectedCategory;
    function handleCatSelect(event) {
        selectedCategory = event.detail;
        console.log(selectedCategory);
        products.refetchProducts(selectedCategory);
    }
</script>

<main class="">
    <div class="p-7 pb-60 ">
        <div class="grid items-center justify-center">
            <div class="">
                <Nav on:category-select={handleCatSelect} />
            </div>
            <div class="grid grid-cols-4">
                <div
                    class="h-64 min-h-full col-span-3 overflow-y-auto scroll-smooth snap-both"
                >
                    <Products {selectedCategory} bind:this={products} />
                </div>
                <div class="col-span-1">
                    <Sidebar />
                </div>
            </div>
            <div class="">
                <Footer />
            </div>
        </div>
    </div>
</main>

<style>
    main {
        background-color: rgb(131, 163, 76);
        height: 100%;
    }
</style>
