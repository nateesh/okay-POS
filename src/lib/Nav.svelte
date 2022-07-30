<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    let selectedId = 0;
    let selected;

    const variableDict = {
        0: ["drink", "retail", "food", "dessert"],
        1: ["drink"],
        2: ["food"],
        3: ["dessert"],
        4: ["retail"],
    };

    const onChange = (e) => {
        selectedId = e.currentTarget.value;
        selected = variableDict[selectedId];
       // console.log(selected);
        dispatch("category-select", selected);
    };
</script>

<div class="navbar-style pe-4">
    <ul class="category">
        <li>
            <input
                type="radio"
                id="all"
                name="category"
                value="0"
                on:change={onChange}
                checked={selectedId === 0}
            />
            <label for="all">💫 ALL 💫</label>
        </li>
        <li>
            <input
                type="radio"
                id="drink"
                name="category"
                value="1"
                on:change={onChange}
                checked={selectedId === 1}
            />
            <label for="drink">☕ DRINKS</label>
        </li>
        <li>
            <input
                type="radio"
                id="food"
                name="category"
                value="2"
                on:change={onChange}
                checked={selectedId === 2}
            />
            <label for="food">🍔 FOOD</label>
        </li>
        <li>
            <input
                type="radio"
                id="dessert"
                name="category"
                value="3"
                on:change={onChange}
                checked={selectedId === 3}
            />
            <label for="dessert">🎂 DESSERTS</label>
        </li>
        <li>
            <input
                type="radio"
                id="retail"
                name="category"
                value="4"
                on:change={onChange}
                checked={selectedId === 4}
            />
            <label for="retail">🛍️ RETAIL</label>
        </li>
    </ul>
</div>

<style>
    .navbar-style {
        background-color: #e0e0e0;
        border-radius: 25px 25px 0 0;
        height: 4rem;
    }
    .category {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 100%;
    }
    .category li {
        position: relative;
        background: #ffffff;
        width: 110px;
        height: 40px;
        padding: 10px;
        text-align: center;
        border-radius: 15px;
        font-size: 13px;
        border: 1px #eee solid;
        transition: 0.3s;
        list-style-type: none;
    }
    .category li label {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 110px;
        height: 40px;
        padding: 10px;
        border-radius: 15px;
        transform: translate(-50%, -50%);
        cursor: pointer;
    }
    [type="radio"] {
        opacity: 0;
    }
    [type="radio"]:checked ~ label {
        background: #bddaa2;
        color: rgb(0, 0, 0);
    }
</style>
