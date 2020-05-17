import React from "react";

import Box from "@material-ui/core/Box";

export interface IEmojiProps {
  label: string;
  symbol: string;
}

export const Emoji = ({ label, symbol }: IEmojiProps) => (
  <Box
    fontSize="large"
    className="emoji"
    role="img"
    aria-label={label ? label : ""}
    aria-hidden={label ? "false" : "true"}
  >
    {symbol}
  </Box>
);

export default Emoji;
