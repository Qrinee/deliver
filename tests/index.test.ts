import { getRestaurantsByMeal, getAvailableDishByRestaurant, generateRandomID } from '../src/utils/index'
import { SelectMeal } from '../src/components/StepComponent'
import { dishes } from '../data/dishes.json'
import { render, screen, fireEvent } from '@testing-library/react'


describe('Test getRestaurantsByMeal function', () => {
  it('breakfast', () => {
    expect(getRestaurantsByMeal(dishes, 'breakfast')).toStrictEqual(['Mc Donalds', 'Vege Deli', 'Olive Garden'])
  })
})

describe('Test getRestaurantsByMeal function', () => {
  it('lunch', () => {
    expect(getRestaurantsByMeal(dishes, 'lunch')).toStrictEqual(['Mc Donalds', 'Taco Bell', 'Vege Deli', 'Pizzeria', 'Panda Express', 'Olive Garden'])
  })
})

describe('Test getRestaurantsByMeal function', () => {
  it('dinner', () => {
    expect(getRestaurantsByMeal(dishes, 'dinner')).toStrictEqual([
      'Mc Donalds',
      'Taco Bell',
      'BBQ Hut',
      'Vege Deli',
      'Pizzeria',
      'Panda Express',
      'Olive Garden',
    ])
  })
})

describe('Test getAvailableDishByRestaurant function', () => {
  it('Mc Donalds', () => {
    expect(getAvailableDishByRestaurant(dishes, 'breakfast', 'Mc Donalds')).toStrictEqual(['Egg Muffin'])
  })
})


describe('Test getAvailableDishByRestaurant function', () => {
  it('Taco Bell', () => {
    expect(getAvailableDishByRestaurant(dishes, 'lunch', 'Taco Bell')).toStrictEqual(['Burrito', 'Tacos', 'Quesadilla'])
  })
})

describe('Test getAvailableDishByRestaurant function', () => {
  it('Olive Garden', () => {
    expect(getAvailableDishByRestaurant(dishes, 'dinner', 'Olive Garden')).toStrictEqual(['Garlic Bread', 'Ravioli', 'Rigatoni Spaghetti', 'Fettucine Pasta'])
  })
})

describe('Test generateRandomID function', () => {
  it('is string', () => {
    expect(typeof generateRandomID()).toBe('string')
  })
})

describe('Test generateRandomID function', () => {
  it('random ID', () => {
    expect(generateRandomID()).toHaveLength(8)
  })
})
