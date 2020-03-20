'use strict'

/**
 * Represents the game logic.
 *
 * @class GameLogic
 */
class GameLogic {
  /**
   * Creates an instance of GameLogic.
   *
   * @param {number} numberOfBodyParts Number of body parts on the man getting hanged.
   * @param {number} guessDecrement The decrement for each wrong guess.
   * @memberof GameLogic
   */
  constructor (numberOfBodyParts, guessDecrement) {
    this._numberOfBodyParts = numberOfBodyParts
    this._guessDecrement = guessDecrement
    this._guessesLeft = numberOfBodyParts
    this._wrongGuesses = 0
  }

  /**
   * Sets the guesses left to its initial value.
   *
   * @memberof GameLogic
   */
  resetGusses () {
    this._guessesLeft = this._numberOfBodyParts
    this._wrongGuesses = 0
  }

  /**
   * Controlls if the passed letter is included in the passed word.
   *
   * @param {string} letter A letter.
   * @param {string} word A word.
   * @returns {boolean} True Or False.
   * @memberof GameLogic
   */
  checkLetterInWord (letter, word) {
    return word.includes(letter)
  }

  /**
   * Checks if the hidden word is equal to the correct word.
   *
   * @param {string} word A word.
   * @param {string} hiddenWord A word.
   * @returns {boolean} True Or False.
   * @memberof GameLogic
   */
  checkWordComplete (word, hiddenWord) {
    let wordComplete = false
    // Remove comment to make the game work
    if (word === hiddenWord) {
      wordComplete = true
    }
    return wordComplete
  }

  /**
   * Return the allowed number of guesses.
   *
   * @returns {number} The number of allowed guesses.
   * @memberof GameLogic
   */
  getAllowedGuesses () {
    return this._allowedGuesses
  }

  /**
   * Returns the number of guesses left.
   *
   * @returns {number} The number of guesses left.
   * @memberof GameLogic
   */
  getGuessesLeft () {
    return this._guessesLeft
  }

  /**
   * Removes 1 from the number of allowed gusses.
   *
   * @memberof GameLogic
   */
  removeGuess () {
    this._guessesLeft -= this._guessDecrement
    this._wrongGuesses++
  }

  /**
   * Checks if there are guesses left.
   *
   * @returns {boolean} True Or False.
   * @memberof GameLogic
   */
  checkGameOver () {
    return this._guessesLeft === 0
  }

  addNumberOfGuesses () {

  }

  /**
   * Gets the number of used guesses.
   *
   * @returns {number} The number of used guesses.
   * @memberof GameLogic
   */
  getNumberOfGuesses () {
    return this._wrongGuesses
  }
}

module.exports = GameLogic
