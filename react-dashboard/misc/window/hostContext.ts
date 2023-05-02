import { ipcRenderer } from 'electron';

const hostContext = {
  open_path(path: string) {
    ipcRenderer.invoke('open-path', path);
  },
  async cpu_data() {
    return await ipcRenderer.invoke('cpu-data');
  },
};

export default hostContext;
