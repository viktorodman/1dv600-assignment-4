'use strict'

const Game = require('./Game')
const GameIO = require('./GameIO')
const GameSettings = require('./GameSettings')

/**
 * A TerminalHangman Game.
 *
 * @class TerminalHangman
 */
class TerminalHangman {
  /**
   * Creates an instance of TerminalHangman.
   *
   * @memberof TerminalHangman
   * @param {boolean} test True if the game should be started in test mode.
   * @param {boolean} testSettings True if the game should be started in test settings mode.
   */
  constructor (test, testSettings) {
    this._test = test
    this._testSettings = testSettings
    this._exitEvent = 'exitToMenu'
    this._menuItems = ['Play Game', 'Change Settings', 'Quit Game']

    this._gameIO = new GameIO()
    this._guessDecrement = 1
    this._gameMode = 'Normal'
    this._gameSettings = new GameSettings(this._gameMode, this._guessDecrement, this._exitEvent, this._test)
  }

  /**
   * Starts the main menu.
   *
   * @memberof TerminalHangman
   */
  async startMenu () {
    if (this._test) {
      if (this._testSettings) {
        this.showSettings()
      } else {
        this.startTestSession()
      }
    } else {
      const menuChoice = await this._gameIO.promptList('Game Menu', this._menuItems)

      switch (menuChoice) {
        case 'Play Game': this.startGame()
          break
        case 'Change Settings': this.showSettings()
          break
        case 'Quit Game': this.quitGame()
          break
      }
    }
  }

  /**
   * Start a new game.
   *
   * @memberof TerminalHangman
   */
  startGame () {
    const game = new Game(this._exitEvent, this._guessDecrement, this._gameMode, false)

    game.on(this._exitEvent, () => {
      this.startMenu()
      game.removeAllListeners(this._exitEvent)
    })

    game.setUpGame()
  }

  /**
   * Starts a test version of the hangman game.
   *
   * @memberof TerminalHangman
   */
  startTestSession () {
    const game = new Game(this._exitEvent, this._guessDecrement, this._gameMode, true)

    game.on(this._exitEvent, () => {
      process.exit(0)
    })

    game.setUpGame()
  }

  /**
   * Shows the game settings.
   *
   * @memberof TerminalHangman
   */
  showSettings () {
    this._gameSettings.on(this._exitEvent, (gameData) => {
      this._guessDecrement = gameData.difficulty
      this._gameMode = gameData.mode
      this.startMenu()
      this._gameSettings.removeAllListeners(this._exitEvent)
    })

    this._gameSettings.displaySettings()
  }

  /**
   * Prompts the user with a confirmation for quiting the game.
   *
   * @memberof TerminalHangman
   */
  async quitGame () {
    const exitConfirmation = await this._gameIO.promptConfirmation('Are you sure you want to quit?')

    if (exitConfirmation) {
      process.exit(0)
    } else {
      this.startMenu()
    }
  }
}

module.exports = TerminalHangman
