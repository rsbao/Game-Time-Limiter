import { AppWindow } from "../AppWindow";
import {
  OWGamesEvents,
  OWHotkeys
} from "@overwolf/overwolf-api-ts";
import { interestingFeatures, hotkeys, windowNames, leagueClassId } from "../consts";
import WindowState = overwolf.windows.WindowStateEx;

// The window displayed in-game while a League game is running.
// It listens to all info events and to the game events listed in the consts.ts file
// and writes them to the relevant log using <pre> tags.
// The window also sets up Ctrl+F as the minimize/restore hotkey.
// Like the background window, it also implements the Singleton design pattern.
class InGame extends AppWindow {
  private static _instance: InGame;
  private _leagueGameEventsListener: OWGamesEvents;
  private _eventsLog: HTMLElement;
  private _infoLog: HTMLElement;

  private constructor() {
    super(windowNames.inGame);

    this._eventsLog = document.getElementById('eventsLog');
    this._infoLog = document.getElementById('infoLog');

    const gamesplayed = document.createElement("gamesplayed");
    // 3. Add the text content
    gamesplayed.textContent = "1";
    // 4. Append the p element to the div element
    this._eventsLog?.appendChild(gamesplayed);

    const gamesallotted = document.createElement("gamesallotted");
    // 3. Add the text content
    gamesallotted.textContent = "4";
    // 4. Append the p element to the div element
    this._infoLog?.appendChild(gamesallotted);


    this.setToggleHotkeyBehavior();
    this.setToggleHotkeyText();

  /*  this._leagueGameEventsListener = new OWGamesEvents({
      onInfoUpdates: this.onInfoUpdates.bind(this),
      onNewEvents: this.onNewEvents.bind(this)
    },
      interestingFeatures);*/
  }

  public static instance() {
    if (!this._instance) {
      this._instance = new InGame();
    }

    return this._instance;
  }

  public run() {
    this._leagueGameEventsListener.start();
  }

  /*private onInfoUpdates(info) {
    this.logLine(this._infoLog, info, false);
  }*/

  // Special events will be highlighted in the event log
 /* private onNewEvents(e) {
    const shouldHighlight = e.events.some(event => {
      switch (event.name) {
        
        case 'death':

        case 'matchEnd':
        
          return true;
      }

      return false
    });
    this.logLine(this._eventsLog, e, shouldHighlight);
  }*/

  // Displays the toggle minimize/restore hotkey in the window header
  private async setToggleHotkeyText() {
    const hotkeyText = await OWHotkeys.getHotkeyText(hotkeys.toggle, leagueClassId);
    const hotkeyElem = document.getElementById('hotkey');
    hotkeyElem.textContent = hotkeyText;
  }

  // Sets toggleInGameWindow as the behavior for the Ctrl+F hotkey
  private async setToggleHotkeyBehavior() {
    const toggleInGameWindow = async (hotkeyResult: overwolf.settings.hotkeys.OnPressedEvent): Promise<void> => {
      console.log(`pressed hotkey for ${hotkeyResult.name}`);
      const inGameState = await this.getWindowState();

      if (inGameState.window_state === WindowState.NORMAL ||
        inGameState.window_state === WindowState.MAXIMIZED) {
        this.currWindow.minimize();
      } else if (inGameState.window_state === WindowState.MINIMIZED ||
        inGameState.window_state === WindowState.CLOSED) {
        this.currWindow.restore();
      }
    }

    OWHotkeys.onHotkeyDown(hotkeys.toggle, toggleInGameWindow);
  }

  // Appends a new line to the specified log
 /* private logLine(log: HTMLElement, data, highlight) {
    console.log(`${log.id}:`);
    console.log(data);
    const line = document.createElement('pre');
    line.textContent = JSON.stringify(data);

    if (highlight) {
      line.className = 'highlight';
    }

    const shouldAutoScroll = (log.scrollTop + log.offsetHeight) > (log.scrollHeight - 10);

    log.appendChild(line);

    if (shouldAutoScroll) {
      log.scrollTop = log.scrollHeight;
    }
  }*/
}

InGame.instance().run();
