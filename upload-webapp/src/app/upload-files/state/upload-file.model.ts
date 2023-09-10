<<<<<<< HEAD
export interface UploadFile {
  id: string;
  fileName: string;
  file: any;
  status: boolean;
  data: any;
}

export function createUploadFile(params: Partial<UploadFile>) {
  return {
    id: params.data.name,
    fileName: params.data.name,
  } as UploadFile;
}
=======
export interface UploadFile {
  id: string;
  fileName: string;
  file: any;
  status: boolean;
  data: any;
}

export function createUploadFile(params: Partial<UploadFile>) {
  return {
    id: params.data.name,
    fileName: params.data.name,
  } as UploadFile;
}
>>>>>>> 2cfd18384cffe46cb45fed2b848bf6c2824d438d
