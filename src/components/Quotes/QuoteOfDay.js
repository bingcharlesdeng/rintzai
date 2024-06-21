import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchQuoteOfDay } from './quoteService';
import './quoteOfDay.css';

const QuoteOfDay = ({ customization }) => {
  const [quote, setQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadQuoteOfDay = async () => {
      setIsLoading(true);
      try {
        const dailyQuote = await fetchQuoteOfDay();
        setQuote(dailyQuote);
      } catch (error) {
        console.error('Error fetching quote of the day:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuoteOfDay();
  }, []);

  const quoteVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.5 } }
  };

  return (
    <div className="quote-of-day-container" style={{ backgroundColor: customization.backgroundColor }}>
      <h2 className="quote-of-day-title">Quote of the Day</h2>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={quoteVariants}
            className="quote-loading"
          >
            <div className="quote-loader"></div>
          </motion.div>
        ) : quote ? (
          <motion.div
            key="quote"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={quoteVariants}
            className="quote-content"
            style={{ color: customization.color, fontFamily: customization.font }}
          >
            <p className="quote-text">"{quote.text}"</p>
            <p className="quote-author">- {quote.author}</p>
          </motion.div>
        ) : (
          <motion.div
            key="error"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={quoteVariants}
            className="quote-error"
          >
            <p>Oops! Couldn't fetch the quote of the day. Please try again later.</p>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="quote-inspiration">
        <p>Let this quote inspire your day!</p>
        <button className="share-button" onClick={() => navigator.share({ text: quote?.text, title: 'Quote of the Day' })}>
          Share Inspiration
        </button>
      </div>
    </div>
  );
};

export default QuoteOfDay;