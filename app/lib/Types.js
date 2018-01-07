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