import React from 'react'
import { render, screen } from '@testing-library/react';
import Pokemon from '../Pokemon'

describe('When user first sees the pokemon page', () => {
    test('should see their own name', () => {
        render(<Pokemon />)
    })
    test('should see a random pokemon', () => {

    })
})