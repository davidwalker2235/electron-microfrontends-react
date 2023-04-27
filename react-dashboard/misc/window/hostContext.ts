import { ipcRenderer } from 'electron';

const hostContext = {
  open_path(path: string) {
    ipcRenderer.invoke('open-path', path);
  },
};

export default hostContext;
