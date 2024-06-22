import React, { useState, useEffect } from 'react';
import Navbar from '../Routes/Navbar';
import QuoteOfDay from './QuoteOfDay';
import QuoteDisplay from './QuoteDisplay';
import QuoteCustomization from './QuoteCustomization';
import QuoteCategories from './QuoteCategories';
import UserQuoteSubmission from './UserQuoteSubmission';
import UserQuotesList from './UserQuotesList';
import { fetchQuoteOfDay, fetchQuotes, submitUserQuote, fetchUserQuotes, favoriteQuote, fetchFavoriteQuotes, searchQuotes } from './quoteService';
import { useUserContext } from '../User/UserContext';
import './quotes.css';

const Quotes = () => {
  const [quoteOfDay, setQuoteOfDay] = useState(null);
  const [currentQuote, setCurrentQuote] = useState(null);
  const [category, setCategory] = useState('all');
  const [userQuotes, setUserQuotes] = useState([]);
  const [favoriteQuotes, setFavoriteQuotes] = useState([]);
  const [customization, setCustomization] = useState({
    font: 'Arial',
    color: '#000000',
    backgroundColor: '#ffffff'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useUserContext();

  console.log('Quotes component rendered');

  useEffect(() => {
    const loadQuotes = async () => {
      console.log('Loading quotes...');
      try {
        const dailyQuote = await fetchQuoteOfDay();
        console.log('Daily quote fetched:', dailyQuote);
        setQuoteOfDay(dailyQuote);
        setCurrentQuote(dailyQuote);

        const userSubmittedQuotes = await fetchUserQuotes();
        console.log('User submitted quotes fetched:', userSubmittedQuotes);
        setUserQuotes(userSubmittedQuotes);

        if (user) {
          const userFavorites = await fetchFavoriteQuotes(user.uid);
          console.log('User favorites fetched:', userFavorites);
          setFavoriteQuotes(userFavorites);
        }
      } catch (error) {
        console.error('Error loading quotes:', error);
      }
    };

    loadQuotes();
  }, [user]);

  useEffect(() => {
    const loadQuotesByCategory = async () => {
      console.log('Loading quotes by category:', category);
      try {
        const quotes = await fetchQuotes(category);
        console.log('Quotes fetched:', quotes);
        if (quotes.length > 0) {
          const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
          console.log('Random quote selected:', randomQuote);
          setCurrentQuote(randomQuote);
        }
      } catch (error) {
        console.error('Error loading quotes by category:', error);
      }
    };

    if (category !== 'all') {
      loadQuotesByCategory();
    }
  }, [category]);

  const handleRandomQuote = async () => {
    console.log('Fetching random quote...');
    try {
      const quotes = await fetchQuotes(category);
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      console.log('Random quote fetched:', randomQuote);
      setCurrentQuote(randomQuote);
    } catch (error) {
      console.error('Error fetching random quote:', error);
    }
  };

  const handleSubmitQuote = async (newQuote) => {
    console.log('Submitting new quote:', newQuote);
    try {
      await submitUserQuote(newQuote);
      const updatedUserQuotes = await fetchUserQuotes();
      console.log('Updated user quotes:', updatedUserQuotes);
      setUserQuotes(updatedUserQuotes);
    } catch (error) {
      console.error('Error submitting quote:', error);
    }
  };

  const handleFavoriteQuote = async (quote) => {
    console.log('Favoriting quote:', quote);
    if (user) {
      try {
        await favoriteQuote(user.uid, quote.id);
        const updatedFavorites = await fetchFavoriteQuotes(user.uid);
        console.log('Updated favorites:', updatedFavorites);
        setFavoriteQuotes(updatedFavorites);
      } catch (error) {
        console.error('Error favoriting quote:', error);
      }
    } else {
      console.log('User not logged in, cannot favorite quote');
    }
  };

  const handleCustomizationChange = (key, value) => {
    console.log('Customization changed:', key, value);
    setCustomization(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log('Searching quotes with term:', searchTerm);
    if (searchTerm.trim()) {
      try {
        const searchResults = await searchQuotes(searchTerm);
        console.log('Search results:', searchResults);
        if (searchResults.length > 0) {
          setCurrentQuote(searchResults[0]);
        } else {
          console.log('No quotes found for search term');
        }
      } catch (error) {
        console.error('Error searching quotes:', error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="quotes-container" style={{ fontFamily: customization.font }}>
        <h1 className="quotes-title">Daily Inspiration</h1>
        
        <div className="quote-of-the-day-section">
          <h2>Quote of the Day</h2>
          <QuoteOfDay quote={quoteOfDay} customization={customization} />
        </div>

        <div className="quote-interaction-section">
          <div className="quote-categories-search">
            <QuoteCategories selectedCategory={category} onSelectCategory={setCategory} />
            <form onSubmit={handleSearch} className="quote-search-form">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search quotes..."
                className="quote-search-input"
              />
              <button type="submit" className="quote-search-button">Search</button>
            </form>
          </div>

          <div className="quote-display-section">
            {currentQuote && (
              <QuoteDisplay
                quote={currentQuote}
                onCopy={() => {
                  navigator.clipboard.writeText(currentQuote.text);
                  console.log('Quote copied to clipboard');
                }}
                onShare={() => {
                  console.log('Share functionality not implemented');
                  /* Implement share functionality */
                }}
                onFavorite={() => handleFavoriteQuote(currentQuote)}
                customization={customization}
              />
            )}
            <button onClick={handleRandomQuote} className="random-quote-button">Get Random Quote</button>
          </div>

          <QuoteCustomization customization={customization} onCustomizationChange={handleCustomizationChange} />
        </div>

        <div className="user-quotes-section">
          <h2>Community Quotes</h2>
          <UserQuoteSubmission onQuoteSubmit={handleSubmitQuote} />
          <UserQuotesList quotes={userQuotes} />
        </div>

        <div className="favorite-quotes-section">
          <h2>My Favorite Quotes</h2>
          <div className="favorite-quotes-list">
            {favoriteQuotes.map(quote => (
              <QuoteDisplay
                key={quote.id}
                quote={quote}
                onCopy={() => {
                  navigator.clipboard.writeText(quote.text);
                  console.log('Favorite quote copied to clipboard');
                }}
                onShare={() => {
                  console.log('Share functionality not implemented for favorite quote');
                  /* Implement share functionality */
                }}
                onFavorite={() => handleFavoriteQuote(quote)}
                customization={customization}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Quotes;