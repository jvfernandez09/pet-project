import React, { useState } from 'react'
import MaterialTable from 'material-table';
import { compose, graphql, withApollo } from 'react-apollo'
import { tableIcons } from '../../../src/component/material-table'
import INVENTORY_INTEGRATE from '../../../src/lib/mutation/order'

const OrderContainer = (props) => {
  const [state, setState] = useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Location Type', field: 'locationTypeId' },
      { title: 'Active', field: 'active' }
    ],
    data: [],
  });

  function add(newData){
    const {  inventoryIntegrate } = props

    inventoryIntegrate({
      variables: {
        input: {
          newData
        }
      }
    }).then((response) => {
      setState(prevState => {
        const data = [...prevState.data];
        data.push(newData);
        return { ...prevState, data };
      })
    })
    .catch((e) => console.log(e.networkError))

  }

  return (
    <MaterialTable
      title="Sales Order"
      columns={state.columns}
      data={state.data}
      icons={tableIcons()}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              add(newData)
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}

export default compose(
  withApollo,
  graphql(INVENTORY_INTEGRATE.INVENTORY_INTEGRATE, { name: 'inventoryIntegrate'})
)(OrderContainer)
