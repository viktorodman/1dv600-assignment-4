'use strict'

const EvenEmitter = require('events')
const GameIO = require('./GameIO')

/**
 * Represents the Game Settings.
 *
 * @class GameSettings
 */
class GameSettings extends EvenEmitter {
  /**
   * Creates an instance of GameSettings.
   *
   * @memberof GameSettings
   * @param {string} currentMode The current game mode.
   * @param {number} currentDifficulty The current difficulty.
   * @param {string} exitEvent Event to exit to the menu.
   * @param {boolean} test True if in test mode.
   */
  constructor (currentMode, currentDifficulty, exitEvent, test) {
    super()
    this._io = new GameIO()
    this._test = test
    this._settingOptions = ['Change Game Mode', 'Change Difficulty', 'Go Back']
    this._gameModes = ['Normal', 'Invisible']
    this._difficulties = ['Easy', 'Normal', 'Hard']
    this._mode = currentMode
    this._difficulty = currentDifficulty
    this._exitEvent = exitEvent
  }

  /**
   * Displays the different options and ask user for input.
   *
   * @memberof GameSettings
   */
  async displaySettings () {
    if (this._test) {
      console.log(`
      Current Game Mode: ${this._mode}
      Current Difficulty: ${this._difficulty}
      `)
    }
    const settingChoice = await this._io.promptList('Settings', this._settingOptions)
    switch (settingChoice) {
      case this._settingOptions[0] : this.changeGameModes()
        break
      case this._settingOptions[1] : this.changeDifficulty()
        break
      case this._settingOptions[2]: this.exitToMenu()
        break
    }
  }

  /**
   * Prompts a list with game modes.
   *
   * @memberof GameSettings
   */
  async changeGameModes () {
    console.log('Invisible mode hides the underscores.')
    const gameMode = await this._io.promptList('Game Mode', this._gameModes)

    this._mode = await gameMode
    this.displaySettings()
  }

  /**
   * Prompts a list with game modes.
   *
   * @memberof GameSettings
   */
  async changeDifficulty () {
    if (!this._test) {
      console.log(`
      Easy: 8 Wrong Guesses
      Normal: 4 Wrong Guesses
      Hard: 2 Wrong Guesses 
      `)
    }

    const gameMode = await this._io.promptList('Game Mode', this._difficulties)

    switch (gameMode) {
      case this._difficulties[0]: this._difficulty = 1
        break
      case this._difficulties[1]: this._difficulty = 2
        break
      case this._difficulties[2]: this._difficulty = 4
        break
    }

    this.displaySettings()
  }

  /**
   * Exits to the main menu.
   *
   * @memberof GameSettings
   */
  exitToMenu () {
    this.emit(this._exitEvent, { mode: this._mode, difficulty: this._difficulty })
  }
}

module.exports = GameSettings
