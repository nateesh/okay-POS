<script>
    import { GET_PRODUCTS } from "./queries.js";
    import { query } from "svelte-apollo";
    import ProductCard from "./ProductCard.svelte";

    export let selectedCategory;

    const products = query(GET_PRODUCTS, {
        variables: {
            _in: selectedCategory,
        },
    });
    

    export function refetchProducts(selectedCategory) {
        // console.log("final: " + selectedCategory);
        console.log("!", selectedCategory)
        products.refetch({ _in: selectedCategory });
    }
</script>

<div class="">
    {#if $products.fetching}
        <div>Loading...</div>
    {:else if $products.error}
        <div>Error: ${$products.error.message}</div>
    {:else if !$products.data}
        no data
    {:else}
        <div class="grid grid-cols-2 gap-0 sm:grid-cols-3 md:grid-cols-4 snap-both">
            {#each $products.data.products as product}
                <ProductCard
                    prodCat={product.category}
                    prodId={product.id}
                    prodPrice={product.price}
                >
                    <div class="">
                        <p>
                            {product.name}
                        </p>
                        <p class="jusify-between">
                            ${product.price}
                        </p>
                    </div>
                </ProductCard>
            {/each}
        </div>
    {/if}
</div>

<style>

</style>
