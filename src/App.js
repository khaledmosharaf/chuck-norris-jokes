import { useState } from 'react'
import './App.css'

function App() {
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('')
  const [jokeData, setJokeData] = useState({})
  const [isPendingCategories, setIsPendingCategories] = useState(false)
  const [isPendingJokes, setIsPendingJokes] = useState(false)
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(-1)
  const [isHiddenButton, setIsHiddenButton] = useState('refresh-button-hidden')

  const fetchCategories = () => {
    setIsPendingCategories(true)
    fetch('https://api.chucknorris.io/jokes/categories')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data)
        setIsPendingCategories(false)
      })
  }

  const fetchJokes = (category, index) => {
    setActiveCategoryIndex(index)
    setCategory(category)
    setIsPendingJokes(true)
    fetch(`https://api.chucknorris.io/jokes/random?category=${category}`)
      .then((res) => res.json())
      .then((data) => {
        setJokeData(data)
        setIsPendingJokes(false)
      })

    setIsHiddenButton('refresh-button-not-hidden')
  }

  console.log(categories)

  return (
    <div className='container'>
      <h1>Chuck Norris Joke Generator</h1>
      <div className='categories'>
        <button onClick={fetchCategories} className='btn btn-categories'>
          {categories.length !== 0 ? 'Categories' : 'Click for Categories'}
        </button>
        {isPendingCategories && <p>Getting Joke Categories...</p>}
        <ul>
          {categories.map((category, index) => (
            <button
              onClick={() => fetchJokes(category, index)}
              className={
                index === activeCategoryIndex
                  ? `btn btn-active-category`
                  : `btn`
              }
              key={Math.random()}
            >
              {category.toUpperCase()}
            </button>
          ))}
        </ul>
      </div>
      <div className='joke-display'>
        {isPendingJokes ? (
          <p>Fetching Jokes...</p>
        ) : (
          jokeData.value && (
            <>
              <p>{`"${jokeData.value}"`}</p>
              <button
                className={`btn btn-refresh ${isHiddenButton}`}
                onClick={() => fetchJokes(category)}
              >
                Refresh Joke
              </button>
            </>
          )
        )}
      </div>
    </div>
  )
}

export default App
