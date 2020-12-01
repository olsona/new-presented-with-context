import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Paper, Button } from '@material-ui/core';

import { WishlistT } from '../shared/interfaces/wishlist.interface'

const NewWishlistItem: React.FC<{ wishlist: WishlistT }> = (props) => {
  const wishlistFormSchema = Yup.object().shape({
    item: Yup.string().required()
  })

  const addNewItemToWishlist = async (values: { item: string }) => {
    const url = `/api/v1/wishlists/${props.wishlist.id}/wishlist_items`
    const body = values
    const addResponse = await axios.post(url, body)
    console.log("Add response", addResponse)
  }

  const formDisplay = () => {
    return (
      <Formik
        initialValues={{ item: "" }}
        onSubmit={(values) => {
          addNewItemToWishlist(values);
        }}
        validationSchema={wishlistFormSchema}
      >
        {({ values, errors, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <input
              type='text'
              name='item'
              onChange={handleChange}
              value={values.item}
            />
            <p>{errors.item}</p>
            <button type='submit'>
              Submit wishlist item!
            </button>
          </Form>
        )}
      </Formik>
    )
  }

  return (
    <>
      <Grid container alignContent="center" spacing={3}>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={6}>
          <Paper>{formDisplay()}</Paper>
        </Grid>
        <Grid item xs={3}>
        </Grid>
      </Grid>
      <Grid container alignContent="center" spacing={3}>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color="secondary" component={RouterLink} to="/">
            Back to homepage
          </Button>
        </Grid>
        <Grid item xs={3}>
        </Grid>
      </Grid>
    </>
  )
}

export default NewWishlistItem