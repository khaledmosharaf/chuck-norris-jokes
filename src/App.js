import { useState } from 'react'
import './App.css'

function App() {
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('')
  const [categoryAfterRefresh, setCategoryAfterRefresh] = useState('')
  const [jokeData, setJokeData] = useState({})
  const [isPendingCategories, setIsPendingCategories] = useState(false)
  const [isPendingJokes, setIsPendingJokes] = useState(false)
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
    setCategoryAfterRefresh(category)
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
        <div className='btn-container'>
          <button onClick={fetchCategories} className='btn btn-categories'>
            {categories.length !== 0 ? 'Categories' : 'Click for Categories'}
          </button>
        </div>
        {isPendingCategories && <p>Getting Joke Categories...</p>}
        <ul>
          {categories.map((category, index) => (
            <button
              onClick={() => fetchJokes(category, index)}
              className={
                category === categoryAfterRefresh
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
              <div className='btn-container'>
                <button
                  className={`btn btn-refresh ${isHiddenButton}`}
                  onClick={() => fetchJokes(category)}
                >
                  Refresh Joke
                </button>
              </div>
            </>
          )
        )}
      </div>
    </div>
  )
}

export default App
