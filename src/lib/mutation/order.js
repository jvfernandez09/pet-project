import gql from 'graphql-tag'


const INVENTORY_INTEGRATE = gql`
  mutation INVENTORY_INTEGRATE {
    inventoryIntegrate(input: $input)
    @rest(
      type: "Inventory Integrate",
      path: "/InventoryReganIntegration/Api/Location/Post",
      method: "POST",
      endpoint: "v1"
    ) {
      data
    }
  }
`


export default {
  INVENTORY_INTEGRATE
}
