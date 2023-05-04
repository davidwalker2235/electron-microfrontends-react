import nodeDiskInfo from "node-disk-info";

export const getDiskSpace = async () => {
  const nodeDiskInfo = require('node-disk-info');

  try {
    return await nodeDiskInfo.getDiskInfo();
  } catch (e) {
    console.error(e);
  }
}