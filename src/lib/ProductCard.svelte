<script>
	import { query, mutation } from 'svelte-apollo';
	import { INSERT_ORDER, GET_LAST_COMPLETE_ORDER } from './queries';
	import { GET_CURRENT_ORDER, GET_CURRENT_ORDER_INFO } from './queries';

	export let prodCat;
	export let prodId;
	export let prodPrice;

	const lastCompleteOrder = query(GET_LAST_COMPLETE_ORDER);

	let lastOrd;

	lastCompleteOrder.subscribe((data) => {
		lastOrd = data;
	});

	const addOrderProduct = mutation(INSERT_ORDER);

	const orderInfo = query(GET_CURRENT_ORDER_INFO);

	const orderInProgress = query(GET_CURRENT_ORDER);

	async function handleClick() {
		try {
			// console.log(lastOrd.data.orders_aggregate.aggregate.max.id + 1);
			// console.log({ prodId }.prodId);
			// console.log({ prodPrice }.prodPrice);
			let selectedProduct = { prodId }.prodId;
			let currentOrderNum = lastOrd.data.orders_aggregate.aggregate.max.id + 1;
			let price = { prodPrice }.prodPrice;
			await addOrderProduct({
				variables: {
					product_id: selectedProduct,
					order_id: currentOrderNum,
					product_price: price
				}
			});
			orderInfo.refetch();
			orderInProgress.refetch();
		} catch (error) {
			console.log('error!! ' + error);
		}
	}
</script>

{#if { prodCat } === 'drink'}
	<div>what?</div>
{:else}
	<div
		on:click={handleClick}
		{prodId}
		{prodPrice}
		class="p-2 border snap-top border-white h-32 category-class-{prodCat}"
	>
		<slot />
	</div>
{/if}

<style>
	.prod-card {
		border-color: white;
	}
	.category-class-food {
		background-color: #efd894;
	}
	.category-class-drink {
		background-color: #91bff0;
	}
	.category-class-dessert {
		background-color: rgb(189, 228, 179);
	}
	.category-class-retail {
		background-color: #e0a2a2;
	}
</style>
