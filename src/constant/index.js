export const CURRENT_DIRECTIONS = {
  up: "up",
  down: "down",
  left: "left",
  right: "right",
};
export const PRESS_KEYS = {
  38: CURRENT_DIRECTIONS.up,
  37: CURRENT_DIRECTIONS.left,
  39: CURRENT_DIRECTIONS.right,
  40: CURRENT_DIRECTIONS.down,
};

const LEFT_LIMIT = -8;
const RIGHT_LIMIT = 16 * 11 + 8;
const TOP_LIMIT = -8 + 32;
const BOTTOM_LIMIT = 16 * 7;

export const LIMIT_VALUES = {
  left: LEFT_LIMIT,
  right: RIGHT_LIMIT,
  top: TOP_LIMIT,
  bottom: BOTTOM_LIMIT,
};
