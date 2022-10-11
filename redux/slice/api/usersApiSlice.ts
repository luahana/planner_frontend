import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { apiSlice } from './apiSlice'
import { User } from '../../../lib/user'

const usersAdapter = createEntityAdapter({})

const initialState = usersAdapter.getInitialState()

type UsersResponse = User[]
