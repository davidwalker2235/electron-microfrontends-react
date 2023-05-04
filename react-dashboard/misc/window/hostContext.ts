import { ipcRenderer } from 'electron';

const hostContext = {
  open_path(path: string) {
    ipcRenderer.invoke('open-path', path);
  },
  async cpu_data() {
    return await ipcRenderer.invoke('cpu-data');
  },
  async get_disk_space() {
    return await ipcRenderer.invoke('get-disk-space');
  },
};

export default hostContext;
