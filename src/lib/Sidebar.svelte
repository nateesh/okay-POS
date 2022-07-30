<script>
	import { scale } from 'svelte/transition';
	import { mutation, query } from 'svelte-apollo';
	import { GET_CURRENT_ORDER, REMOVE_PROD_FROM_ORDER, GET_PRODUCTS } from './queries';
	import { COMPLETE_ORDER, NEW_ORDER, GET_LAST_COMPLETE_ORDER, GET_CURRENT_ORDER_INFO } from './queries';

	//queries
	const orderInProgress = query(GET_CURRENT_ORDER);
	const orderInfo = query(GET_CURRENT_ORDER_INFO);
	const removeProductFromOrder = mutation(REMOVE_PROD_FROM_ORDER);
	const products = query(GET_PRODUCTS);

	//refetch function
	export function reload() {
		lastCompleteOrder.refetch();
		orderInProgress.refetch();
		orderInfo.refetch();
		products.refetch();
	}
	
	let ordId = "";
	
	//mutation to handle removing an order
	async function handleRemove(ordId) {
		console.log(ordId);
		try {
      console.log('removing...');
			await removeProductFromOrder({
				variables: {
					id: ordId
				}
			});
			reload();
		} catch (error) {
			console.log('error!! ', error);
		}
	}


	const completeCurrOrder = mutation(COMPLETE_ORDER);
	const lastCompleteOrder = query(GET_LAST_COMPLETE_ORDER);
	const newOrder = mutation(NEW_ORDER);

	let lastOrd;
	lastCompleteOrder.subscribe((data) => {
		lastOrd = data;
	});

	let orderInfoStore;
	orderInfo.subscribe((data) => {
		orderInfoStore = data;
	});

	//mutations (2) to handle:
	//completing an order
	//creating a new order
	async function handleComplete() {
		try {
			let orderIdToComplete = lastOrd.data.orders_aggregate.aggregate.max.id + 1;
			let orderTotal = orderInfoStore.data.order_product_aggregate.aggregate.sum.product_price;
			let lastOrder = lastOrd.data.orders_aggregate.aggregate.max.id + 2;
			await completeCurrOrder({
				variables: {
					_eq: orderIdToComplete,
					order_total: orderTotal
				}
			});

			console.log('new order: ' + lastOrder);
			await newOrder({
				variables: {
					id: lastOrder
				}
			});
			reload();
		} catch (error) {
			console.log('error!! ' + error);
		}
	}

</script>

<div class="">
	<!-- order pane -->
	<div class="overflow-y-scroll h-80 bg-slate-100 p-2">
		{#if $orderInProgress.fetching}
			<div>Loading...</div>
		{:else if $orderInProgress.error}
			<div>Error: {$orderInProgress.error.message}</div>
		{:else if !$orderInProgress.data}
			no data
		{:else}
			{#each $orderInProgress.data.order_product as order}
				<button class="inline-flex items-center justify-center mr-2 text-indigo-100 transition-colors duration-150 rounded-full w-7 h-7 bg-stone-400 bg focus:shadow-outline hover:bg-stone-700" on:click={handleRemove((ordId = order.id))}>X</button>
				{order.product.name} ${order.product_price}
				<div in:scale class="justify-content-end" />
			{/each}
		{/if}
	</div>

	<!-- order total pane -->
	<div class="bg-slate-200 p-2">
		{#if $orderInfo.fetching}
			<div>Loading...</div>
		{:else if $orderInfo.error}
			<div>Error: ${$orderInfo.error.message}</div>
		{:else if !$orderInfo.data}
			no data
		{:else if $orderInfo.data.order_product_aggregate.aggregate.sum.product_price > 0}	
		<div>
				Total: {$orderInfo.data.order_product_aggregate.aggregate.sum.product_price}
			</div>
			<button class="inline-flex items-center justify-center w-24 mr-2 text-indigo-100 transition-colors duration-150 rounded-full h-7 bg-stone-400 bg focus:shadow-outline hover:bg-stone-700" on:click={handleComplete}>Check Out</button>
		{:else}
			<div>Total: 0</div>
			<button class="inline-flex items-center justify-center w-24 mr-2 text-indigo-100 transition-colors duration-150 rounded-full h-7 bg-stone-400 bg focus:shadow-outline hover:bg-stone-700" disabled on:click={handleComplete}>Check Out</button>
		{/if}
	</div>
</div>

<style>

</style>
