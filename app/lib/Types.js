/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 07/01/18 © **/

import type {TFeed} from "./daos/DaoFeed";

export type TIcon = {
  name: string,
  type: string,
  color?: string
};

export type TFeedAction = {
  icon: TIcon,
  actionIsValid: (TFeed) => boolean,
  action: (Object, TFeed) => Promise
};

export type TDataPoint = {
  id: string;
  title: string;
  subtitle?: string;
  icon?: Object;
}

export type TSectionListDataPointSections = {
  title: string,
  data: Array<TDataPoint>
};