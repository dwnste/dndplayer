import {LATEST_RELEASE} from '../consts/api';

export type ReleaseType = {
  url: string;
  tag_name: string;
  body: string;
  published_at: string;
  name: string;
  assets: AssetType[];
};

type AssetType = {
  url: string;
  name: string;
  content_type: string;
  browser_download_url: string;
};

const getJson = (url: string): Promise<any> =>
  fetch(url).then(res => res.json());

const getLatestVersion = (): Promise<ReleaseType> => getJson(LATEST_RELEASE);

export {getLatestVersion};
