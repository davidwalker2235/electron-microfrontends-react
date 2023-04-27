import { contextBridge } from 'electron';
import titlebarContext from './titlebarContext';
import hostContext from "./hostContext";

contextBridge.exposeInMainWorld('electron_window', {
  titlebar: titlebarContext,
  host: hostContext
});
