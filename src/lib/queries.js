import gql from "graphql-tag";

export const GET_LAST_COMPLETE_ORDER = gql`
query LastCompleteOrder {
    orders_aggregate(where: { order_complete: { _eq: true } }) {
        aggregate {
            max {
                id
            }
        }
    }
}
`;

export const GET_PRODUCTS = gql`
query GetProducts ($_in: [String!] = ["drink", "retail", "food", "dessert"]) {
    products(where: {category: {_in: $_in}}, order_by: {category: asc}) {
        id
        name
        price
        category
      }
    }
`;

export const INSERT_ORDER = gql`
mutation AddToCurrentOrder($product_id: Int = 1, $order_id: Int = 1, $product_price: numeric = "") {
    insert_order_product_one(object: {product_id: $product_id, order_id: $order_id, product_price: $product_price}) {
        product_id
        order_id
        product_price
    }
}
`;

export const GET_CURRENT_ORDER = gql`
query GetOpenOrder {
    order_product(where: {order: {order_complete: {_eq: false}}}) {
        product_id
        product_price
        id
        product {
            name
        }
    }
}
`;

export const GET_CURRENT_ORDER_INFO = gql`
query GetOpenOrderInfo {
    order_product_aggregate(where: {order: {order_complete: {_eq: false}}}) {
        aggregate {
            sum {
                product_price
            }
            count
        }
    }
}
`;

export const REMOVE_PROD_FROM_ORDER = gql`
mutation RemoveProductFromOrder($id: Int!) {
    delete_order_product_by_pk(id: $id) {
        id
    }
}
`;

export const COMPLETE_ORDER = gql`
mutation MyMutation($_eq: Int, $order_total: numeric) {
    update_orders(where: {id: {_eq: $_eq}}, _set: {order_complete: true, order_total: $order_total}) {
      affected_rows
      returning {
        id
        order_complete
      }
    }
  }
`;

export const NEW_ORDER = gql`
mutation MyMutation($id: Int) {
    insert_orders_one(object: {id: $id}) {
      id
    }
  }
`;

// query to do!!!
// get previous orders

export const GET_PREVIOUS_ORDERS = gql`
query PreviosOrders($_eq: Int) {
    order_product_aggregate(where: {order_id: {_eq: $_eq}}) {
      aggregate {
        sum {
          product_price
        }
      }
      nodes {
        product {
          name
        }
        product_price
      }
    }
  }
`;  