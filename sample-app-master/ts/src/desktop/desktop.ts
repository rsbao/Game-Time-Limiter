import { AppWindow } from "../AppWindow";
import { windowNames } from "../consts";
import {
    OWGamesEvents
} from "@overwolf/overwolf-api-ts";

// The desktop window is the window displayed while League is not running.
// In our case, our desktop window has no logic - it only displays static data.
// Therefore, only the generic AppWindow class is called.
//new AppWindow(windowNames.desktop);

class desktopwin extends AppWindow{
    private static _instance: desktopwin;
    private _timeplaying: HTMLElement;
    private _allottedtime: HTMLElement;
}