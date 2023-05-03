import nodeDiskInfo from "node-disk-info";

export const getDiskSpace = async () => {
  const nodeDiskInfo = require('node-disk-info');

  try {
    const disks = await nodeDiskInfo.getDiskInfo();
    console.log(disks)
    debugger;
    return disks;
  } catch (e) {
    console.error(e);
  }
}